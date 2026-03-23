import { LogisticsOptimizer } from './LogisticsOptimizer.js';

const runOptimization = async () => {
  const optimizer = new LogisticsOptimizer();
  
  try {
    await optimizer.optimize();
  } catch (error: any) {
    console.error('❌ Optimization Failed:', error.message);
    process.exit(1);
  }
};

runOptimization();
