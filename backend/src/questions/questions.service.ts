import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './questions.schema';
import { Model } from 'mongoose';
import { EmbeddingsService } from '../embeddings/embeddings.service';

interface QuestionData {
  question: string;
  options: string[];
  answer: number;
  tags: string[];
}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private QuestionModel: Model<Question>,
    private embeddingsService: EmbeddingsService,
  ) {}

  async addQuestion(questionData: QuestionData): Promise<Question> {
    const { question } = questionData;
    const vector = await this.embeddingsService.embedText(question);
    const createdQuestion = new this.QuestionModel({ ...questionData, vector });

    return createdQuestion.save();
  }
}
