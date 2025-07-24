import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Volume2, 
  Languages, 
  Settings, 
  User, 
  UserCheck, 
  Mic, 
  Globe,
  ArrowRight,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VoiceLanguageModalProps {
  open: boolean;
  onClose: () => void;
  chatPath: string;
  title: string;
}

const voices = [
  {
    id: "sarah",
    name: "Sarah",
    gender: "Female",
    accent: "American",
    description: "Warm, professional, and encouraging",
    preview: "Hi! I'm Sarah, your friendly English learning assistant.",
  },
  {
    id: "david",
    name: "David", 
    gender: "Male",
    accent: "British",
    description: "Clear, articulate, and supportive",
    preview: "Hello there! I'm David, ready to help you master English.",
  },
  {
    id: "emma",
    name: "Emma",
    gender: "Female", 
    accent: "Australian",
    description: "Energetic, friendly, and motivating",
    preview: "G'day! I'm Emma, let's make learning English fun together!",
  },
  {
    id: "james",
    name: "James",
    gender: "Male",
    accent: "Canadian", 
    description: "Patient, calm, and detailed",
    preview: "Hey! I'm James, your patient English practice partner.",
  },
];

const languages = [
  { code: "en-US", name: "English (American)", flag: "🇺🇸" },
  { code: "en-GB", name: "English (British)", flag: "🇬🇧" },
  { code: "en-AU", name: "English (Australian)", flag: "🇦🇺" },
  { code: "en-CA", name: "English (Canadian)", flag: "🇨🇦" },
  { code: "en-IN", name: "English (Indian)", flag: "🇮🇳" },
];

const proficiencyLevels = [
  { id: "beginner", name: "Beginner", description: "Just starting with English" },
  { id: "elementary", name: "Elementary", description: "Basic vocabulary and phrases" },
  { id: "intermediate", name: "Intermediate", description: "Can have simple conversations" },
  { id: "advanced", name: "Advanced", description: "Fluent with some challenges" },
  { id: "expert", name: "Expert", description: "Near-native proficiency" },
];

export default function VoiceLanguageModal({ open, onClose, chatPath, title }: VoiceLanguageModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState("sarah");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [proficiency, setProficiency] = useState("intermediate");
  const [speechSpeed, setSpeechSpeed] = useState([1.0]);
  const [realTimeCorrection, setRealTimeCorrection] = useState(true);
  const [pronunciationFeedback, setPronunciationFeedback] = useState(true);

  const handleStartPractice = () => {
    // Store user preferences in localStorage
    const preferences = {
      voice: selectedVoice,
      language: selectedLanguage,
      proficiency,
      speechSpeed: speechSpeed[0],
      realTimeCorrection,
      pronunciationFeedback,
    };
    
    localStorage.setItem('aangilam_preferences', JSON.stringify(preferences));
    
    // Navigate to the chat
    navigate(chatPath);
    onClose();
  };

  const selectedVoiceData = voices.find(v => v.id === selectedVoice);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 bg-clip-text text-transparent">
            Customize Your Learning Experience
          </DialogTitle>
          <DialogDescription className="text-lg">
            Configure your AI tutor for {title.toLowerCase()} to match your learning preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mb-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= stepNum 
                    ? 'bg-gradient-to-r from-nova-500 to-electric-500 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-0.5 transition-all ${
                    step > stepNum ? 'bg-gradient-to-r from-nova-500 to-electric-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Voice Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Volume2 className="w-5 h-5 text-nova-500" />
                <h3 className="text-xl font-semibold">Choose Your AI Tutor Voice</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {voices.map((voice) => (
                  <Card 
                    key={voice.id} 
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedVoice === voice.id 
                        ? 'border-nova-500 bg-nova-500/5 shadow-lg shadow-nova-500/20' 
                        : 'hover:border-nova-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-nova-500 to-electric-500 rounded-full flex items-center justify-center">
                            {voice.gender === "Female" ? <UserCheck className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{voice.name}</CardTitle>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">{voice.gender}</Badge>
                              <Badge variant="outline" className="text-xs">{voice.accent}</Badge>
                            </div>
                          </div>
                        </div>
                        <RadioGroup value={selectedVoice} onValueChange={setSelectedVoice}>
                          <RadioGroupItem value={voice.id} />
                        </RadioGroup>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">{voice.description}</p>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm italic">"{voice.preview}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Language & Proficiency */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Languages className="w-5 h-5 text-electric-500" />
                <h3 className="text-xl font-semibold">Language & Learning Level</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-base font-medium">English Variant</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Your English Level</Label>
                  <RadioGroup value={proficiency} onValueChange={setProficiency} className="space-y-3">
                    {proficiencyLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-3">
                        <RadioGroupItem value={level.id} />
                        <div className="flex-1">
                          <Label className="font-medium cursor-pointer">{level.name}</Label>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Advanced Settings */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-cyber-500" />
                <h3 className="text-xl font-semibold">Learning Preferences</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Speech Speed</Label>
                  <div className="px-3">
                    <Slider
                      value={speechSpeed}
                      onValueChange={setSpeechSpeed}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Slow (0.5x)</span>
                      <span>Normal ({speechSpeed[0]}x)</span>
                      <span>Fast (2x)</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium">Real-time Grammar Correction</Label>
                      <p className="text-sm text-muted-foreground">Get instant feedback on grammar mistakes</p>
                    </div>
                    <Switch checked={realTimeCorrection} onCheckedChange={setRealTimeCorrection} />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium">Pronunciation Feedback</Label>
                      <p className="text-sm text-muted-foreground">Receive detailed pronunciation guidance</p>
                    </div>
                    <Switch checked={pronunciationFeedback} onCheckedChange={setPronunciationFeedback} />
                  </div>
                </div>

                {/* Selected Configuration Summary */}
                <Card className="bg-gradient-to-r from-nova-50/50 via-electric-50/50 to-cyber-50/50 border-nova-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Your Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">AI Tutor:</span>
                      <span>{selectedVoiceData?.name} ({selectedVoiceData?.accent} {selectedVoiceData?.gender})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Language:</span>
                      <span>{languages.find(l => l.code === selectedLanguage)?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Level:</span>
                      <span className="capitalize">{proficiency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Speech Speed:</span>
                      <span>{speechSpeed[0]}x</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="flex items-center space-x-2"
            >
              <span>{step > 1 ? 'Previous' : 'Cancel'}</span>
            </Button>

            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleStartPractice}
                className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white flex items-center space-x-2"
              >
                <Mic className="w-4 h-4" />
                <span>Start Practice Session</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
