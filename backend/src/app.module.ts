import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { QuestionsModule } from './questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmbeddingsService } from './embeddings/embeddings.service';
import { EmbeddingsModule } from './embeddings/embeddings.module';
import * as dotenv from 'dotenv';
import { LiveGameModule } from './live-game/live-game.module';
dotenv.config();

const uri: string = process.env.MONGODB_URI || '';

@Module({
  imports: [
    GamesModule,
    QuestionsModule,
    MongooseModule.forRoot(uri),
    EmbeddingsModule,
    LiveGameModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmbeddingsService],
})
export class AppModule {}
