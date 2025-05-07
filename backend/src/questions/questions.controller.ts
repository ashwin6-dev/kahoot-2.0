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
import {QuestionsService} from "./questions.service";

const QUESTION_LIMIT = 20;

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

  @Get(":id")
  getQuestion(@Param('id', ParseIntPipe) id: number) {

  }

  @Put(":id")
  updateQuestion(@Param('id', ParseIntPipe) id: number) {

  }

  @Get("search")
  searchQuestion(
    @Query('query') query: string,
    @Query('limit', ParseIntPipe) limit: number = QUESTION_LIMIT,
    @Query('page', ParseIntPipe) page: number = 0,
  ) {}
}
