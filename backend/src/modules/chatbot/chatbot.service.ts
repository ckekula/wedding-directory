import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const pathToJson = '../../assets/knowledge-base.json';

interface KnowledgeBaseEntry {
  title: string;
  category: string;
  content: string;
}

@Injectable()
export class ChatbotService {
  private knowledgeBase: KnowledgeBaseEntry[];

  constructor() {
    const filePath = path.join(__dirname, pathToJson);
    this.knowledgeBase = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  getResponse(query: string): string {
    const advice = this.knowledgeBase.find(entry =>
      entry.category === 'getting-engaged-advice' &&
      query.toLowerCase().includes(entry.title.toLowerCase())
    );

    return advice ? advice.content : 'Sorry, I couldn\'t find any advice on that topic.';
  }
}
