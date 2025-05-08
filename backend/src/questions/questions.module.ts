import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './questions.schema';
import { QuestionsService } from './questions.service';
import { EmbeddingsModule } from '../embeddings/embeddings.module';
import { EmbeddingsService } from '../embeddings/embeddings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
    EmbeddingsModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, EmbeddingsService],
})
export class QuestionsModule {}
