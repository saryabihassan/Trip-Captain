import pkg from 'fs-extra';
const { readFile, writeFile } = pkg;
import * as path from 'path';

export class LearningsManager {
  private static LEARNINGS_FILE = path.resolve(process.cwd(), 'LEARNINGS.md');

  /**
   * Appends a new learning to the appropriate section in LEARNINGS.md.
   */
  public async addLearning(category: string, title: string, content: string): Promise<void> {
    const data = await readFile(LearningsManager.LEARNINGS_FILE, 'utf-8');
    const lines = data.split('\n');

    const sectionHeader = `## ${category}`;
    const sectionIndex = lines.findIndex(line => line.trim() === sectionHeader);

    if (sectionIndex === -1) {
      // Create section if not found
      lines.push(`\n${sectionHeader}`);
      lines.push(`- **${title}:** ${content}`);
    } else {
      // Check for duplicate title
      const existingTitle = lines.find(line => line.includes(`**${title}:**`));
      if (!existingTitle) {
        // Insert under section header
        lines.splice(sectionIndex + 1, 0, `- **${title}:** ${content}`);
      } else {
        console.log(`Learning with title "${title}" already exists in section "${category}". Skipping.`);
        return;
      }
    }

    await writeFile(LearningsManager.LEARNINGS_FILE, lines.join('\n').trim() + '\n');
    console.log(`✅ Learning "${title}" added to "${category}" section.`);
  }

  /**
   * Automates a learning based on an error log or success pattern.
   */
  public async autoAnalyze(context: string, error?: any): Promise<void> {
    if (error) {
      const errorMsg = error.message || String(error);
      if (errorMsg.includes('Schema Validation Failed')) {
        await this.addLearning(
          'Core Mandates & Architecture',
          'Strict Schema Enforcement',
          `Automated validation correctly blocked an invalid state update during "${context}". Ensure any new fields are added to "database_schema.json" first.`
        );
      }
    }
  }
}
