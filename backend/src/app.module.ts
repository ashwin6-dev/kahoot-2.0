import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { QuestionModule } from './question/question.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [GamesModule, QuestionModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
