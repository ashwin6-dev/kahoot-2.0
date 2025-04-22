import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { LiveGameModule } from './live-game/live-game.module';

@Module({
  imports: [GamesModule, LiveGameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
