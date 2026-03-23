import { NLPParameterExtractor } from './NLPParameterExtractor.js';

const runExtraction = async () => {
  const extractor = new NLPParameterExtractor();
  const prompt = "I want to go to London for 7 days";
  
  try {
    await extractor.process(prompt);
  } catch (error: any) {
    console.error('❌ Extraction Failed:', error.message);
    process.exit(1);
  }
};

runExtraction();
