import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './questions.schema';
import { Model } from 'mongoose';
import axios from "axios";

const EMBED_ENDPOINT = 'http://localhost:5000/embed';

interface EmbedResponse {
  text: string;
  embedding: number[];
}

interface QuestionData {
  question: string;
  options: string[];
  answer: number;
  tags: string[];
}

const embedText = async (
  text: string,
  useAdapter: boolean = false,
): Promise<number[]> => {
  const response = await axios.post(EMBED_ENDPOINT, { text, useAdapter });
  const { embedding } = response.data as EmbedResponse;
  return embedding;
};

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private QuestionModel: Model<Question>,
  ) {}

  async addQuestion(questionData: QuestionData): Promise<Question> {
    const { question } = questionData;
    const vector = await embedText(question);
    const createdQuestion = new this.QuestionModel({ ...questionData, vector });

    return createdQuestion.save();
  }
}
