import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateResponse(message: string, context?: string): Promise<string> {
    try {
      // Add context if provided (for different pages)
      let prompt = message;
      if (context) {
        prompt = `Context: ${context}\n\nUser message: ${message}`;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    }
  }

  async generateResponseWithHistory(
    message: string, 
    chatHistory: Array<{text: string, sender: 'user' | 'bot'}>,
    context?: string
  ): Promise<string> {
    if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
      return "Please configure your Gemini API key in the .env file. Get your API key from https://aistudio.google.com/app/apikey";
    }
    
    try {
      // Build conversation history for context
      const historyText = chatHistory
        .slice(-10) // Last 10 messages for context
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
        .join('\n');

      let prompt = `Previous conversation:\n${historyText}\n\nUser: ${message}`;
      
      if (context) {
        prompt = `Context: ${context}\n\n${prompt}`;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    }
  }

  // Specialized methods for different page contexts
  async generateLibraryResponse(message: string, chatHistory: Array<{text: string, sender: 'user' | 'bot'}>): Promise<string> {
    const context = "You are an AI assistant helping with image creation and library management. Focus on helping users create, organize, and manage their image library. Provide creative suggestions for image generation, help with categorization, and offer design advice.";
    return this.generateResponseWithHistory(message, chatHistory, context);
  }

  async generateFloorPlanResponse(message: string, chatHistory: Array<{text: string, sender: 'user' | 'bot'}>): Promise<string> {
    const context = "You are an AI assistant specializing in floor plan design and space planning. Help users with room layouts, furniture placement, space optimization, and architectural design suggestions. Provide practical advice for residential and commercial spaces.";
    return this.generateResponseWithHistory(message, chatHistory, context);
  }

  async generate3DRenderResponse(message: string, chatHistory: Array<{text: string, sender: 'user' | 'bot'}>): Promise<string> {
    const context = "You are an AI assistant expert in 3D visualization and rendering. Help users with 3D modeling, material selection, lighting setup, camera angles, and rendering techniques. Provide technical advice for creating realistic 3D visualizations.";
    return this.generateResponseWithHistory(message, chatHistory, context);
  }

  async generateChatResponse(message: string, chatHistory: Array<{text: string, sender: 'user' | 'bot'}>): Promise<string> {
    const context = "You are SuperGPT, a helpful AI assistant for SuperChair, a furniture company. Wilson Chen is the boss/CEO of SuperChair. You can help with general questions, business advice, furniture recommendations, and various tasks. Be friendly, professional, and helpful.";
    return this.generateResponseWithHistory(message, chatHistory, context);
  }
}

export const geminiService = new GeminiService();