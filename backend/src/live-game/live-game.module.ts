import { Module } from '@nestjs/common';
import { LiveGameGateway } from './live-game.gateway';
import { Game, GameSchema } from '../schemas/games.schema';
import { GamesService } from '../games/games.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
    ]),
  ],
  providers: [LiveGameGateway, GamesService]
})
export class LiveGameModule {}
