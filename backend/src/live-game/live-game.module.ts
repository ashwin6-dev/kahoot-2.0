import { Module } from '@nestjs/common';
import { LiveGameGateway } from './live-game.gateway';
import { Game, GameSchema } from '../schemas/games.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GameManagerService } from '../games/services/game-manager.service';
import { GamePlayerService } from '../games/services/game-player.service';
import { GameStateService } from '../games/services/game-state.service';
import { ScoringService } from '../games/services/scoring.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
    ]),
  ],
  providers: [LiveGameGateway, GameManagerService, GamePlayerService, GameStateService, ScoringService]
})
export class LiveGameModule {}
