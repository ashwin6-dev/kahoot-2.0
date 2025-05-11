import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from '../schemas/questions.schema';

const QUESTION_LIMIT = 20;

const OptionalParseIntPipe = new ParseIntPipe({ optional: true });

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(
    @Body('question') question: string,
    @Body('options') options: string[],
    @Body('answer') answer: number,
    @Body('tags') tags: string[],
  ) {
    await this.questionService.addQuestion({ question, options, answer, tags });
  }

  @Get('search')
  async searchQuestion(
    @Query('query') query: string,
    @Query('limit', OptionalParseIntPipe) limit: number = QUESTION_LIMIT,
    @Query('page', OptionalParseIntPipe) page: number = 0,
  ): Promise<Question[]> {
    return await this.questionService.fetchQuestions(query, limit, page);
  }
}
