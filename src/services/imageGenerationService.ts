import OpenAI from 'openai';

class ImageGenerationService {
  private openai: OpenAI | null = null;
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    
    if (this.apiKey && this.apiKey !== 'your_openai_api_key_here') {
      this.openai = new OpenAI({
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.openai || !this.apiKey || this.apiKey === 'your_openai_api_key_here') {
      throw new Error("Please configure your OpenAI API key in the .env file. Get your API key from https://platform.openai.com/api-keys");
    }

    try {
      console.log('Generating image with prompt:', prompt);
      
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: this.enhancePrompt(prompt),
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      });

      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw new Error('No image URL returned from OpenAI');
      }

      return imageUrl;
    } catch (error: any) {
      console.error('Image generation error:', error);
      
      if (error.code === 'insufficient_quota') {
        throw new Error('OpenAI API quota exceeded. Please check your billing settings.');
      } else if (error.code === 'invalid_api_key') {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else if (error.message?.includes('content_policy_violation')) {
        throw new Error('The prompt violates OpenAI content policy. Please try a different description.');
      }
      
      throw new Error(`Failed to generate image: ${error.message || 'Unknown error'}`);
    }
  }

  private enhancePrompt(prompt: string): string {
    // Enhance the prompt for better results
    const enhancedPrompt = `${prompt}, high quality, professional, detailed, clean design`;
    
    // Ensure prompt is not too long (DALL-E has a limit)
    return enhancedPrompt.length > 1000 ? prompt : enhancedPrompt;
  }

  // Alternative: Generate placeholder image for development/fallback
  generatePlaceholderImage(prompt: string): string {
    const hash = this.simpleHash(prompt);
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD', 'FFB6C1', '87CEEB'];
    const color = colors[hash % colors.length];
    
    const encodedPrompt = encodeURIComponent(prompt.substring(0, 50));
    return `https://via.placeholder.com/1024x1024/${color}/FFFFFF?text=${encodedPrompt}`;
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

export const imageGenerationService = new ImageGenerationService();