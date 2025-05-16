import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, Player } from '../../schemas/games.schema';
import { Model } from 'mongoose';
import { playerTokenDoestNotExist } from '../errors';
import { GameManagerService } from './game-manager.service';

@Injectable()
export class GameStateService {
  constructor(
    @InjectModel(Game.name) private GameModel: Model<Game>,
    private gameManagerService: GameManagerService,
  ) {}

  async updateGameToNextState(gameId: number) {
    const { round, state, questions } =
      await this.gameManagerService.getGame(gameId);

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

  async getGameState(gameId: number, token: number) {
    const { questions, round, state, players, roundStart } =
      await this.gameManagerService.getGame(gameId);

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

  async startGame(gameId: number) {
    await this.GameModel.updateOne({ gameId }, { roundStart: Date.now() });
  }
}
