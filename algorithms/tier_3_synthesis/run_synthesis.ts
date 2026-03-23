import { LogisticsSynthesisEngine } from './LogisticsSynthesisEngine.js';

const runSynthesis = async () => {
  const engine = new LogisticsSynthesisEngine();
  
  try {
    await engine.synthesize();
  } catch (error: any) {
    console.error('❌ Synthesis Failed:', error.message);
    process.exit(1);
  }
};

runSynthesis();
