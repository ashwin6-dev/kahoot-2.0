import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../schemas/games.schema';
import { Model } from 'mongoose';
import { Question } from '../schemas/questions.schema';
import { gameNotFound, playerNameTaken } from './errors';

const GAME_ID_LENGTH = 6;

const generateGameId = (): number => {
  return Math.floor(Math.random() * Math.pow(10, GAME_ID_LENGTH));
};

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private GameModel: Model<Game>) {}

  async createGame(questions: Question[], hostName: string): Promise<Game> {
    const gameId = generateGameId();
    const newGame = new this.GameModel({
      gameId,
      questions,
      players: [],
      host: { name: hostName, score: 0 },
    });

    return await newGame.save();
  }

  async getGame(gameId: number): Promise<Game | null> {
    return this.GameModel.findOne({ gameId });
  }

  async joinGame(gameId: number, playerName: string) {
    const game: Game | null = await this.getGame(gameId);
    if (!game) return gameNotFound(gameId);

    if (
      game.players.some((player) => player.name === playerName) ||
      game.host.name === playerName
    )
      return playerNameTaken(gameId, playerName);

    const newPlayers = [...game.players, { name: playerName, score: 0 }]
    await this.GameModel.updateOne({ gameId }, { players: newPlayers });
  }
}
