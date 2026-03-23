import { LearningsManager } from './LearningsManager.js';

const [,, category, title, content] = process.argv;

if (!category || !title || !content) {
  console.log('Usage: npx tsx scripts/report_learning.ts "Category" "Title" "Content"');
  process.exit(1);
}

const manager = new LearningsManager();

manager.addLearning(category, title, content)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Failed to update learnings:', err.message);
    process.exit(1);
  });
