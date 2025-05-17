import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, Player } from '../../schemas/games.schema';
import { Model } from 'mongoose';
import { GameManagerService } from './game-manager.service';
import { Question } from '../../schemas/questions.schema';
import { MAX_POINTS } from './common';

@Injectable()
export class ScoringService {
  constructor(
    @InjectModel(Game.name) private GameModel: Model<Game>,
    private gameManagerService: GameManagerService,
  ) {}

  async handleAnswer(
    gameId: number,
    token: number,
    elapsed: number,
    question: Question,
    answer: number,
  ) {
    const { players, answeredInRound } =
      await this.gameManagerService.getGame(gameId);
    const weight = 1 - elapsed;
    const rawPoints = answer === question.answer ? MAX_POINTS : 0;

    const updatedPlayers = players.map((player: Player) => {
      if (player.token === token)
        player.score += Math.floor(rawPoints * weight);
      return player;
    });

    const newAnsweredInRound = answeredInRound + 1;
    await this.GameModel.updateOne(
      { gameId },
      { players: updatedPlayers, answeredInRound: newAnsweredInRound },
    );

    return newAnsweredInRound === players.length;
  }
}
