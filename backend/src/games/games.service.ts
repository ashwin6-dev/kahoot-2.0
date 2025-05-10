import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, Player } from '../schemas/games.schema';
import { Model } from 'mongoose';
import { Question } from '../schemas/questions.schema';
import { gameNotFound, playerNameTaken, playerTokenDoestNotExist } from './errors';

const GAME_ID_LENGTH = 6;
const PLAYER_TOKEN_LENGTH = 10;

const generateId = (length): number => {
  return Math.floor(Math.random() * Math.pow(10, length));
};

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private GameModel: Model<Game>) {}

  async createGame(
    questions: Question[],
    hostName: string,
  ): Promise<{ gameId: number; token: number }> {
    const gameId = generateId(GAME_ID_LENGTH);
    const token = generateId(PLAYER_TOKEN_LENGTH);

    const newGame = new this.GameModel({
      gameId,
      questions,
      players: [],
      host: { name: hostName, score: 0, token },
    });
    await newGame.save();

    return { gameId, token };
  }

  async getGame(gameId: number): Promise<Game | null> {
    return this.GameModel.findOne({ gameId });
  }

  async getPlayerInfo(gameId: number, token: number): Promise<Player> {
    const game: Game | null = await this.getGame(gameId);

    if (!game) {
      return gameNotFound(gameId);
    }

    if (game.host?.token === token) {
      return game.host;
    }

    const foundPlayer: Player | undefined = game.players.find(
      (player) => player.token === token,
    );

    if (!foundPlayer) {
      return playerTokenDoestNotExist(gameId, token);
    }

    return foundPlayer;
  }

  async joinGame(gameId: number, playerName: string) {
    const game: Game | null = await this.getGame(gameId);
    if (!game) return gameNotFound(gameId);

    if (
      game.players.some((player) => player.name === playerName) ||
      game.host.name === playerName
    )
      return playerNameTaken(gameId, playerName);

    const token = generateId(PLAYER_TOKEN_LENGTH);
    const newPlayers = [...game.players, { name: playerName, score: 0, token }];
    await this.GameModel.updateOne({ gameId }, { players: newPlayers });

    return { token };
  }
}
