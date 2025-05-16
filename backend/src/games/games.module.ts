import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from '../schemas/games.schema';
import { GameManagerService } from './services/game-manager.service';
import { GamePlayerService } from './services/game-player.service';
import { GameStateService } from './services/game-state.service';
import { ScoringService } from './services/scoring.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [GamesController],
  providers: [GameManagerService, GamePlayerService, GameStateService, ScoringService],
})
export class GamesModule {}
