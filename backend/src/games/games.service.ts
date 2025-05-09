import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../schemas/games.schema';
import { Model } from 'mongoose';
import { Question } from '../schemas/questions.schema';

const GAME_ID_LENGTH = 6;

const generateGameId = (): number => {
  return Math.floor(Math.random() * Math.pow(10, GAME_ID_LENGTH));
};

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private GameModel: Model<Game>) {}

  async createGame(questions: Question[]): Promise<Game> {
    const gameId = generateGameId();
    const newGame = new this.GameModel({ gameId, questions, players: [] });

    return await newGame.save();
  }
}
