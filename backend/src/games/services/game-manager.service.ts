import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../../schemas/games.schema';
import { Model } from 'mongoose';
import { Question } from '../../schemas/questions.schema';
import {
  GameNotFoundException,
} from '../errors';
import { generateId, GAME_ID_LENGTH, PLAYER_TOKEN_LENGTH } from './common';

@Injectable()
export class GameManagerService {
  constructor(@InjectModel(Game.name) private GameModel: Model<Game>) {}

  async createGame(
    questions: Question[],
    hostName: string,
  ): Promise<{ gameId: number; token: number }> {
    const gameId = generateId(GAME_ID_LENGTH);
    const token = generateId(PLAYER_TOKEN_LENGTH);

    await this.GameModel.create({
      gameId,
      questions,
      players: [{ name: hostName, score: 0, token, isHost: true }],
    });

    return { gameId, token };
  }

  async getGame(gameId: number): Promise<Game> {
    const game: Game | null = await this.GameModel.findOne({ gameId });
    if (!game) throw new GameNotFoundException(gameId);

    return game;
  }

  async deleteGame(gameId: number) {
    await this.GameModel.deleteOne({ gameId });
  }
}
