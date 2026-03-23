import { Tier1Ingestor } from './Tier1Ingestor.js';

const runIngestion = async () => {
  const ingestor = new Tier1Ingestor();
  
  try {
    await ingestor.ingest();
  } catch (error: any) {
    console.error('❌ Ingestion Failed:', error.message);
    process.exit(1);
  }
};

runIngestion();
