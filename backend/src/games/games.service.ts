import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, Player } from '../schemas/games.schema';
import { Model } from 'mongoose';
import { Question } from '../schemas/questions.schema';
import {
  gameNotFound,
  playerNameTaken,
  playerTokenDoestNotExist,
} from './errors';

const GAME_ID_LENGTH = 6;
const PLAYER_TOKEN_LENGTH = 10;
const MAX_POINTS = 100;

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
      players: [{ name: hostName, score: 0, token, isHost: true }],
    });
    await newGame.save();

    return { gameId, token };
  }

  async getGame(gameId: number): Promise<Game> {
    const game: Game | null = await this.GameModel.findOne({ gameId });
    if (!game) return gameNotFound(gameId);

    return game;
  }

  async startGame(gameId: number) {
    await this.GameModel.updateOne({ gameId }, { roundStart: Date.now() });
  }

  async updateGameToNextState(gameId: number) {
    const { round, state, questions } = await this.getGame(gameId);

    if (state == 'QUESTION') {
      await this.GameModel.updateOne(
        { gameId },
        {
          state: 'ROUND_SCORES',
        },
      );
    } else if (state == 'ROUND_SCORES') {
      const newRound = round + 1;

      if (newRound < questions.length) {
        await this.GameModel.updateOne(
          { gameId },
          {
            state: 'QUESTION',
            round: newRound,
            roundStart: Date.now(),
            answeredInRound: 0,
          },
        );
      } else {
        await this.GameModel.updateOne(
          { gameId },
          {
            state: 'FINISHED',
          },
        );
      }
    }
  }

  async handleAnswer(
    gameId: number,
    token: number,
    elapsed: number,
    question: Question,
    answer: number,
  ) {
    const { players, answeredInRound } = await this.getGame(gameId);
    const weight = 1 - elapsed;
    const rawPoints = answer === question.answer ? MAX_POINTS : 0;

    const updatedPlayers = players.map((player: Player) => {
      if (player.token === token) player.score += Math.floor(rawPoints * weight);
      return player;
    });

    const newAnsweredInRound = answeredInRound + 1;
    await this.GameModel.updateOne(
      { gameId },
      { players: updatedPlayers, answeredInRound: newAnsweredInRound },
    );

    return newAnsweredInRound === players.length;
  }

  async getGameState(gameId: number, token: number) {
    const { questions, round, state, players, roundStart } =
      await this.getGame(gameId);

    const player = players.find((player) => player.token === token);

    if (!player) return playerTokenDoestNotExist(gameId, token);
    const playerScore = player.score;

    const leaderboard = players
      .map((player: Player) => ({ score: player.score, name: player.name }))
      .sort((playerA, playerB) => playerB.score - playerA.score);

    return {
      question: questions[round],
      state,
      playerScore,
      playerName: player.name,
      roundStart,
      isHost: player.isHost,
      leaderboard,
    };
  }
  async joinGame(gameId: number, playerName: string) {
    const { players }: Game = await this.getGame(gameId);

    if (players.some((player) => player.name === playerName))
      return playerNameTaken(gameId, playerName);

    const token = generateId(PLAYER_TOKEN_LENGTH);
    const newPlayers = [...players, { name: playerName, score: 0, token }];
    await this.GameModel.updateOne({ gameId }, { players: newPlayers });

    return { token };
  }

  async deleteGame(gameId: number) {
    await this.GameModel.deleteOne({ gameId });
  }
}
