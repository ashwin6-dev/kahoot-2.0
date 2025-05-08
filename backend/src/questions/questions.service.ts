import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './questions.schema';
import { Model } from 'mongoose';
import { EmbeddingsService } from '../embeddings/embeddings.service';

export interface QuestionData {
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

  async fetchQuestions(
    description: string,
    limit: number,
    page: number,
  ): Promise<QuestionData[]> {
    const queryVector = await this.embeddingsService.embedText(
      description,
      true,
    );

    return await this.QuestionModel.aggregate([
      {
        $vectorSearch: {
          index: 'vector_index', // indicate the index we goin to use for our search
          path: 'vector', // indicate the field the vectors are stored
          queryVector: queryVector,
          numCandidates: 100, // number of chunks to consider for the comparison
          limit: limit, // the number of returned results on score order from high to low
        },
      }
    ]);
  }
}
