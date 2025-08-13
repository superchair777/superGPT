import { GoogleGenerativeAI } from '@google/generative-ai';

export async function checkAvailableModels() {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
    
    console.log('🔍 Checking available Gemini models...');
    
    // List all available models
    const models = await genAI.listModels();
    
    console.log('📋 Available Models:');
    console.log('==================');
    
    models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name}`);
      console.log(`   Display Name: ${model.displayName}`);
      console.log(`   Description: ${model.description}`);
      console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
      console.log(`   Input Token Limit: ${model.inputTokenLimit || 'N/A'}`);
      console.log(`   Output Token Limit: ${model.outputTokenLimit || 'N/A'}`);
      console.log('   ---');
    });
    
    // Filter models that support generateContent
    const contentModels = models.filter(model => 
      model.supportedGenerationMethods?.includes('generateContent')
    );
    
    console.log('✅ Models that support generateContent:');
    console.log('=====================================');
    contentModels.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name} - ${model.displayName}`);
    });
    
    return { allModels: models, contentModels };
    
  } catch (error) {
    console.error('❌ Error checking models:', error);
    return { allModels: [], contentModels: [] };
  }
}

// Auto-run when imported in development
if (import.meta.env.DEV) {
  checkAvailableModels();
}