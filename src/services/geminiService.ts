import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in the environment variables. Please add it to your .env file.");
}
const genAI = new GoogleGenerativeAI(apiKey);

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
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
      if (error instanceof Error && error.message.includes('503')) {
        throw new Error("The AI model is currently overloaded. Please try again in a few moments.");
      }
      throw new Error("I apologize, but I'm having trouble processing your request right now. Please try again later.");
    }
  }

  async generateResponseWithHistory(
    message: string, 
    chatHistory: Array<{text: string, sender: 'user' | 'bot'}>,
    context?: string
  ): Promise<string> {
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
      if (error instanceof Error && error.message.includes('503')) {
        throw new Error("The AI model is currently overloaded. Please try again in a few moments.");
      }
      throw new Error("I apologize, but I'm having trouble processing your request right now. Please try again later.");
    }
  }

  // Specialized methods for different page contexts
  async generateLibraryResponse(message: string, chatHistory: Array<{text: string, sender: 'user' | 'bot'}>): Promise<string> {
    const context = "You are an AI assistant helping with image creation and library management. Focus on helping users create, organize, and manage their image library. Provide creative suggestions for image generation, help with categorization, and offer design advice.";
    return this.generateResponseWithHistory(message, chatHistory, context);
  }

  async generateFloorPlanResponse(message: string, chatHistory: Array<{text: string, sender: 'user' | 'bot'}>, language: 'en' | 'th' = 'en'): Promise<string> {
    const baseContext = "You are an AI assistant specializing in floor plan design and space planning. Help users with room layouts, furniture placement, space optimization, and architectural design suggestions. Provide practical advice for residential and commercial spaces.";
    const languageInstruction = language === 'th'
      ? "Please respond in Thai language (ภาษาไทย). Use Thai characters and provide culturally appropriate suggestions for Thai users."
      : "Please respond in English language.";
    const context = `${baseContext}\n\n${languageInstruction}`;
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