import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { GameManagerService } from './services/game-manager.service';
import { GamePlayerService } from './services/game-player.service';
import { Question } from '../schemas/questions.schema';

@Controller('games')
export class GamesController {
  constructor(
    private gameManagerService: GameManagerService,
    private gamePlayerService: GamePlayerService,
  ) {}

  @Post()
  async createGame(
    @Body('questions') questions: Question[],
    @Body('hostName') hostName: string,
  ) {
    const { gameId, token } = await this.gameManagerService.createGame(
      questions,
      hostName,
    );
    return { gameId, token };
  }

  @Get('join/:id')
  async joinGame(
    @Param('id', ParseIntPipe) id: number,
    @Query('playerName') playerName: string,
  ) {
    return await this.gamePlayerService.joinGame(id, playerName);
  }

  @Get(':id')
  async getGameState(@Param('id', ParseIntPipe) id: number) {
    return await this.gameManagerService.getGame(id);
  }
}
