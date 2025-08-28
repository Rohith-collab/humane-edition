import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  Trash2,
  Delete,
  Trophy,
  Timer,
  Zap,
  Bot,
  X,
  Maximize,
  Minimize
} from "lucide-react";
import { safeFirebaseOperation } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

// Letter distributions & points (Scrabble-like)
const LETTER_BAG: [string, number][] = [
  ['a',9],['b',2],['c',2],['d',4],['e',12],['f',2],['g',3],['h',2],['i',9],['j',1],
  ['k',1],['l',4],['m',2],['n',6],['o',8],['p',2],['q',1],['r',6],['s',4],['t',6],
  ['u',4],['v',2],['w',2],['x',1],['y',2],['z',1]
];

const LETTER_POINTS: Record<string, number> = {
  a:1,b:3,c:3,d:2,e:1,f:4,g:2,h:4,i:1,j:8,k:5,l:1,m:3,n:1,o:1,p:3,q:10,r:1,
  s:1,t:1,u:1,v:4,w:4,x:8,y:4,z:10
};

const VOWELS = new Set(['a','e','i','o','u']);

interface GameState {
  status: 'idle' | 'running' | 'ended';
  timeLeft: number;
  rack: string[];
  rackCounts: Record<string, number>;
  input: string;
  score: number;
  words: string[];
  message: string;
  ai: {
    enabled: boolean;
    score: number;
    words: string[];
  };
}

interface WordBuildingBattlesProps {
  onClose: () => void;
  duration?: number;
  rackSize?: number;
  minLength?: number;
  aiEnabled?: boolean;
}

const WordBuildingBattles: React.FC<WordBuildingBattlesProps> = ({
  onClose,
  duration = 60,
  rackSize = 7,
  minLength = 3,
  aiEnabled = false
}) => {
  const { currentUser } = useAuth();
  const [dictionary, setDictionary] = useState<Set<string>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    timeLeft: duration,
    rack: [],
    rackCounts: {},
    input: '',
    score: 0,
    words: [],
    message: '',
    ai: {
      enabled: aiEnabled,
      score: 0,
      words: []
    }
  });

  // Load dictionary
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await fetch('/words-dictionary.json');
        const words: string[] = await response.json();
        setDictionary(new Set(words.map(w => w.toLowerCase())));
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        // Fallback dictionary
        setDictionary(new Set(['cat','dog','tree','read','stone','learn','game','word','play','test']));
      }
    };
    loadDictionary();
  }, []);

  // Helper functions
  const totalWeight = LETTER_BAG.reduce((sum, [,weight]) => sum + weight, 0);
  
  const pickWeightedLetter = (): string => {
    let target = Math.random() * totalWeight;
    for (const [letter, weight] of LETTER_BAG) {
      target -= weight;
      if (target <= 0) return letter;
    }
    return 'e';
  };

  const buildRack = (size: number): string[] => {
    const rack = Array.from({length: size}, () => pickWeightedLetter());
    // Ensure at least 2 vowels
    const vowelCount = rack.filter(c => VOWELS.has(c)).length;
    if (vowelCount < 2) {
      for (let i = vowelCount; i < 2; i++) {
        const idx = Math.floor(Math.random() * rack.length);
        rack[idx] = ['a','e','i','o','u'][Math.floor(Math.random() * 5)];
      }
    }
    return rack;
  };

  const countLetters = (letters: string[]): Record<string, number> => {
    return letters.reduce((counts, letter) => {
      counts[letter] = (counts[letter] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  };

  const canFormWord = (word: string, rackCounts: Record<string, number>): boolean => {
    const wordCounts = countLetters(word.split(''));
    for (const [letter, count] of Object.entries(wordCounts)) {
      if ((rackCounts[letter] || 0) < count) return false;
    }
    return true;
  };

  const calculatePoints = (word: string): number => {
    let points = 0;
    for (const letter of word) {
      points += LETTER_POINTS[letter] || 0;
    }
    // Length bonus
    if (word.length >= 7) points += 7;
    else if (word.length >= 5) points += 3;
    return points;
  };

  // Game actions
  const resetGame = useCallback(() => {
    const newRack = buildRack(rackSize);
    setGameState({
      status: 'idle',
      timeLeft: duration,
      rack: newRack,
      rackCounts: countLetters(newRack),
      input: '',
      score: 0,
      words: [],
      message: '',
      ai: {
        enabled: aiEnabled,
        score: 0,
        words: []
      }
    });
  }, [duration, rackSize, aiEnabled]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'running',
      timeLeft: duration,
      message: 'Game started! Form words from your rack.'
    }));
  }, [duration]);

  const endGame = useCallback(async () => {
    setGameState(prev => ({
      ...prev,
      status: 'ended',
      message: `Game over! Final score: ${prev.score}`
    }));

    // Save score to Firebase
    await safeFirebaseOperation(
      async () => {
        if (!db || !currentUser) return;
        
        const gameSession = {
          uid: currentUser.uid,
          mode: 'word_building_battles',
          score: gameState.score,
          aiScore: gameState.ai.enabled ? gameState.ai.score : null,
          duration,
          rack: gameState.rack.join(''),
          words: gameState.words,
          createdAt: serverTimestamp()
        };

        await addDoc(collection(db, 'game_sessions'), gameSession);

        // Update leaderboard
        const leaderboardRef = doc(db, 'leaderboard', currentUser.uid);
        await runTransaction(db, async (transaction) => {
          const leaderboardDoc = await transaction.get(leaderboardRef);
          const currentPoints = leaderboardDoc.exists() ? (leaderboardDoc.data().points || 0) : 0;
          
          transaction.set(leaderboardRef, {
            points: currentPoints + gameState.score,
            lastPlayed: serverTimestamp(),
            displayName: currentUser.displayName || currentUser.email || 'Anonymous'
          }, { merge: true });
        });
      },
      null,
      'Failed to save game score'
    );
  }, [gameState.score, gameState.ai, gameState.rack, gameState.words, duration, currentUser]);

  const submitWord = useCallback(() => {
    if (gameState.status !== 'running') {
      setGameState(prev => ({ ...prev, message: 'Game not running! Click Start.' }));
      return;
    }

    const word = gameState.input.toLowerCase().replace(/[^a-z]/g, '');
    
    if (word.length < minLength) {
      setGameState(prev => ({ ...prev, message: `Word too short! Minimum ${minLength} letters.` }));
      return;
    }

    if (!canFormWord(word, gameState.rackCounts)) {
      setGameState(prev => ({ ...prev, message: 'Word cannot be formed from your rack!' }));
      return;
    }

    if (!dictionary.has(word)) {
      setGameState(prev => ({ ...prev, message: 'Word not in dictionary!' }));
      return;
    }

    if (gameState.words.includes(word)) {
      setGameState(prev => ({ ...prev, message: 'Word already used!' }));
      return;
    }

    const points = calculatePoints(word);
    setGameState(prev => ({
      ...prev,
      words: [word, ...prev.words],
      score: prev.score + points,
      input: '',
      message: `+${points} points for "${word.toUpperCase()}"!`
    }));
  }, [gameState, dictionary, minLength]);

  const addLetter = useCallback((letter: string) => {
    setGameState(prev => ({
      ...prev,
      input: prev.input + letter
    }));
  }, []);

  const backspace = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      input: prev.input.slice(0, -1)
    }));
  }, []);

  const clearInput = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      input: ''
    }));
  }, []);

  const shuffleRack = useCallback(() => {
    const newRack = buildRack(rackSize);
    setGameState(prev => ({
      ...prev,
      rack: newRack,
      rackCounts: countLetters(newRack),
      message: 'Rack shuffled!'
    }));
  }, [rackSize]);

  // Timer effect
  useEffect(() => {
    if (gameState.status !== 'running') return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          endGame();
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.status, endGame]);

  // Initialize game on mount
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen();
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <Card className={`w-full ${isFullscreen ? 'max-w-none h-screen rounded-none' : 'max-w-4xl max-h-[90vh]'} overflow-auto bg-card/95 backdrop-blur-sm border-2 border-electric-500/50 ${isFullscreen ? 'cyberpunk-fullscreen' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className={`${isFullscreen ? 'text-3xl' : 'text-2xl'} font-bold bg-gradient-to-r from-electric-400 to-cyber-400 bg-clip-text text-transparent`}>
              Word Building Battles
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-muted-foreground hover:text-foreground"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Game Stats */}
          <div className={`grid grid-cols-3 gap-4 mt-4 ${isFullscreen ? 'scale-110' : ''}`}>
            <div className="flex items-center gap-2 p-3 bg-electric-500/10 rounded-lg border border-electric-500/20">
              <Timer className="h-5 w-5 text-electric-400" />
              <div>
                <div className="text-2xl font-bold">{formatTime(gameState.timeLeft)}</div>
                <div className="text-xs text-muted-foreground">Time Left</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-cyber-500/10 rounded-lg border border-cyber-500/20">
              <Trophy className="h-5 w-5 text-cyber-400" />
              <div>
                <div className="text-2xl font-bold">{gameState.score}</div>
                <div className="text-xs text-muted-foreground">Your Score</div>
              </div>
            </div>
            
            {gameState.ai.enabled && (
              <div className="flex items-center gap-2 p-3 bg-nova-500/10 rounded-lg border border-nova-500/20">
                <Bot className="h-5 w-5 text-nova-400" />
                <div>
                  <div className="text-2xl font-bold">{gameState.ai.score}</div>
                  <div className="text-xs text-muted-foreground">AI Score</div>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className={`space-y-6 ${isFullscreen ? 'p-8' : ''}`}>
          {/* Letter Rack */}
          <div className={`space-y-2 ${isFullscreen ? 'scale-110' : ''}`}>
            <h3 className="text-lg font-semibold">Your Rack</h3>
            <div className="flex flex-wrap gap-2">
              {gameState.rack.map((letter, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  onClick={() => addLetter(letter)}
                  disabled={gameState.status !== 'running'}
                  className={`${isFullscreen ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} font-bold bg-gradient-to-br from-electric-500/20 to-cyber-500/20 hover:from-electric-500/30 hover:to-cyber-500/30 border-electric-500/50 cyberpunk-alphabet`}
                >
                  {letter.toUpperCase()}
                  <span className={`absolute -bottom-1 -right-1 ${isFullscreen ? 'text-sm w-5 h-5' : 'text-xs w-4 h-4'} bg-electric-500 text-white rounded-full flex items-center justify-center`}>
                    {LETTER_POINTS[letter]}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={gameState.input.toUpperCase()}
                onChange={(e) => setGameState(prev => ({ ...prev, input: e.target.value.toLowerCase() }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitWord();
                  if (e.key === 'Backspace' && !gameState.input) e.preventDefault();
                }}
                placeholder="Type your word here..."
                className={`${isFullscreen ? 'text-2xl' : 'text-xl'} font-bold text-center tracking-widest bg-card/50 border-electric-500/30`}
                disabled={gameState.status !== 'running'}
              />
              <Button
                onClick={submitWord}
                disabled={gameState.status !== 'running' || !gameState.input}
                className="bg-gradient-to-r from-electric-500 to-cyber-500 hover:from-electric-600 hover:to-cyber-600"
              >
                <Zap className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={backspace}
                disabled={gameState.status !== 'running'}
                size="sm"
              >
                <Delete className="h-4 w-4 mr-2" />
                Backspace
              </Button>
              <Button
                variant="outline"
                onClick={clearInput}
                disabled={gameState.status !== 'running'}
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                variant="outline"
                onClick={shuffleRack}
                disabled={gameState.status !== 'running'}
                size="sm"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Shuffle
              </Button>
            </div>
          </div>

          {/* Message */}
          {gameState.message && (
            <div className="p-3 bg-electric-500/10 border border-electric-500/20 rounded-lg text-center">
              <p className="text-electric-400 font-semibold">{gameState.message}</p>
            </div>
          )}

          {/* Game Controls */}
          <div className="flex gap-4 justify-center">
            {gameState.status === 'idle' && (
              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-cyber-500 to-electric-500 hover:from-cyber-600 hover:to-electric-600"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Game
              </Button>
            )}
            
            {gameState.status === 'running' && (
              <Button
                onClick={endGame}
                variant="outline"
                size="lg"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Pause className="h-5 w-5 mr-2" />
                End Game
              </Button>
            )}
            
            {gameState.status === 'ended' && (
              <Button
                onClick={() => {
                  resetGame();
                  startGame();
                }}
                size="lg"
                className="bg-gradient-to-r from-nova-500 to-electric-500 hover:from-nova-600 hover:to-electric-600"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Play Again
              </Button>
            )}
          </div>

          {/* Words List */}
          {gameState.words.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Words Found ({gameState.words.length})</h3>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {gameState.words.map((word, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono text-lg">{word.toUpperCase()}</span>
                    <Badge variant="secondary" className="bg-electric-500/20 text-electric-400">
                      +{calculatePoints(word)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* End Game Overlay */}
          {gameState.status === 'ended' && (
            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-electric-500/20 to-cyber-500/20 rounded-xl border border-electric-500/30">
              <h2 className="text-3xl font-bold text-electric-400">Game Over!</h2>
              <div className="text-6xl font-bold bg-gradient-to-r from-electric-400 to-cyber-400 bg-clip-text text-transparent">
                {gameState.score}
              </div>
              <p className="text-muted-foreground">
                You found {gameState.words.length} words in {duration} seconds!
              </p>
              {gameState.ai.enabled && (
                <p className="text-sm text-muted-foreground">
                  AI Score: {gameState.ai.score} | {gameState.score > gameState.ai.score ? 'You Win!' : gameState.score < gameState.ai.score ? 'AI Wins!' : 'Tie Game!'}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WordBuildingBattles;
