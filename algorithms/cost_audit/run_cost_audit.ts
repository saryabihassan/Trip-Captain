import { FinancialValidator } from './FinancialValidator.js';

const runCostAudit = async () => {
  const validator = new FinancialValidator();
  
  try {
    await validator.audit();
  } catch (error: any) {
    console.error('❌ Cost Audit Failed:', error.message);
    process.exit(1);
  }
};

runCostAudit();
