export interface ResponseQualityMetrics {
  length: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  hasRepetition: boolean;
  hasGarbledText: boolean;
  clarity: 'high' | 'medium' | 'low';
  overallScore: number; // 0-100
}

export class ResponseQualityAnalyzer {
  
  // Analyze response quality
  static analyzeResponse(text: string): ResponseQualityMetrics {
    if (!text || typeof text !== 'string') {
      return this.getDefaultMetrics();
    }

    const cleanText = text.trim();
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    const metrics: ResponseQualityMetrics = {
      length: cleanText.length,
      sentenceCount: sentences.length,
      avgWordsPerSentence: sentences.length > 0 ? words.length / sentences.length : 0,
      hasRepetition: this.detectRepetition(cleanText),
      hasGarbledText: this.detectGarbledText(cleanText),
      clarity: this.assessClarity(cleanText),
      overallScore: 0
    };

    // Calculate overall score
    metrics.overallScore = this.calculateScore(metrics, cleanText);
    
    return metrics;
  }

  // Enhanced text cleaning with quality improvements
  static enhanceResponse(text: string): string {
    if (!text || typeof text !== 'string') {
      return "I apologize, but I need to provide a clearer response. Could you please rephrase your question?";
    }

    let enhanced = text
      // Remove undefined/null literals
      .replace(/\bundefined\b|\bnull\b/gi, '')
      // Fix encoding issues
      .replace(/â€™/g, "'")
      .replace(/â€œ|â€\u009d/g, '"')
      .replace(/â€"/g, '—')
      // Fix spacing issues
      .replace(/\s+/g, ' ')
      // Remove excessive punctuation
      .replace(/([.!?]){2,}/g, '$1')
      // Fix character repetition (but preserve intentional emphasis)
      .replace(/(.)\1{4,}/g, '$1$1')
      // Ensure proper capitalization after periods
      .replace(/\.\s*([a-z])/g, (match, letter) => `. ${letter.toUpperCase()}`)
      // Remove incomplete words at the end
      .replace(/\s+[a-z]{1,2}$/i, '')
      // Clean up any HTML that might have leaked through
      .replace(/<[^>]*>/g, '')
      .trim();

    // Ensure response doesn't end mid-sentence
    if (enhanced && !enhanced.match(/[.!?]$/)) {
      // If it looks like it was cut off, add appropriate ending
      const lastWord = enhanced.split(' ').pop();
      if (lastWord && lastWord.length < 3) {
        enhanced = enhanced.replace(/\s+\w{1,2}$/, '.');
      } else {
        enhanced += '.';
      }
    }

    // Validate minimum quality
    const metrics = this.analyzeResponse(enhanced);
    if (metrics.overallScore < 30) {
      return "I need to provide a more complete response. Please let me rephrase that for you.";
    }

    return enhanced;
  }

  // Detect text repetition issues
  private static detectRepetition(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    const wordCount = new Map<string, number>();
    
    for (const word of words) {
      if (word.length > 3) { // Only check meaningful words
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    }
    
    // Check if any word appears more than 3 times in a short text
    for (const [word, count] of wordCount) {
      if (count > 3 && words.length < 50) {
        return true;
      }
      if (count > 5) {
        return true;
      }
    }
    
    return false;
  }

  // Detect garbled or corrupted text
  private static detectGarbledText(text: string): boolean {
    // Check for unusual character patterns
    const garbledPatterns = [
      /[^\w\s.!?,'"-]/g, // Non-standard characters
      /\b[bcdfghjklmnpqrstvwxyz]{4,}\b/gi, // Too many consonants
      /(.)\1{3,}/g, // Character repetition
      /\b\w{1,2}\s+\w{1,2}\s+\w{1,2}\b/g, // Too many short words in sequence
    ];
    
    return garbledPatterns.some(pattern => pattern.test(text));
  }

  // Assess overall clarity
  private static assessClarity(text: string): 'high' | 'medium' | 'low' {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgLength = sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) / sentences.length;
    
    // Check for clear structure
    if (avgLength > 30) return 'low'; // Too long
    if (avgLength < 3) return 'low';  // Too short
    if (this.detectGarbledText(text)) return 'low';
    if (avgLength > 20) return 'medium';
    
    return 'high';
  }

  // Calculate overall quality score
  private static calculateScore(metrics: ResponseQualityMetrics, text: string): number {
    let score = 100;
    
    // Penalize for length issues
    if (metrics.length < 10) score -= 30;
    if (metrics.length > 500) score -= 20;
    
    // Penalize for sentence structure issues
    if (metrics.sentenceCount === 0) score -= 40;
    if (metrics.avgWordsPerSentence > 30) score -= 20;
    if (metrics.avgWordsPerSentence < 3) score -= 20;
    
    // Penalize for quality issues
    if (metrics.hasRepetition) score -= 25;
    if (metrics.hasGarbledText) score -= 30;
    
    // Clarity penalties
    if (metrics.clarity === 'low') score -= 25;
    if (metrics.clarity === 'medium') score -= 10;
    
    // Check for completeness
    if (!text.match(/[.!?]$/)) score -= 15;
    
    return Math.max(0, Math.min(100, score));
  }

  private static getDefaultMetrics(): ResponseQualityMetrics {
    return {
      length: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      hasRepetition: false,
      hasGarbledText: true,
      clarity: 'low',
      overallScore: 0
    };
  }
}

// Utility function for easy integration
export function enhanceAIResponse(response: string): string {
  return ResponseQualityAnalyzer.enhanceResponse(response);
}

// Utility function to check if response needs improvement
export function isResponseHighQuality(response: string): boolean {
  const metrics = ResponseQualityAnalyzer.analyzeResponse(response);
  return metrics.overallScore >= 70;
}
