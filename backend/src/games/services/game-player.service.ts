import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../../schemas/games.schema';
import { Model } from 'mongoose';
import { generateId, PLAYER_TOKEN_LENGTH } from './common';
import { playerNameTaken } from '../errors';
import { GameManagerService } from './game-manager.service';

@Injectable()
export class GamePlayerService {
  constructor(
    @InjectModel(Game.name) private GameModel: Model<Game>,
    private gameManagerService: GameManagerService,
  ) {}

  async joinGame(gameId: number, playerName: string) {
    const { players }: Game = await this.gameManagerService.getGame(gameId);

    if (players.some((player) => player.name === playerName))
      return playerNameTaken(gameId, playerName) as { error: string };

    const token = generateId(PLAYER_TOKEN_LENGTH);
    const newPlayers = [...players, { name: playerName, score: 0, token }];
    await this.GameModel.updateOne({ gameId }, { players: newPlayers });

    return { token };
  }
}
