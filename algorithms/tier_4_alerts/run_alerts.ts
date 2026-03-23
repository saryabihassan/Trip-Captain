import { ProactiveAlertEngine } from './ProactiveAlertEngine.js';

const runAlerts = async () => {
  const engine = new ProactiveAlertEngine();
  
  try {
    await engine.scanForAlerts();
  } catch (error: any) {
    console.error('❌ Alert Generation Failed:', error.message);
    process.exit(1);
  }
};

runAlerts();
