import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  Query
} from '@nestjs/common';
import { GamesService } from './games.service';
import {Question} from "../schemas/questions.schema";
import { gameNotFound } from './errors';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  async createGame(
    @Body('questions') questions: Question[],
    @Body('hostName') hostName: string,
  ) {
    const { gameId, token } = await this.gamesService.createGame(questions, hostName);
    return { gameId, token };
  }

  @Get('join/:id')
  async joinGame(
    @Param('id', ParseIntPipe) id: number,
    @Query('playerName') playerName: string
  ) {
    return await this.gamesService.joinGame(id, playerName);
  }

  @Get(':id')
  async getGameState(@Param('id', ParseIntPipe) id: number) {
    return await this.gamesService.getGame(id);
  }
}
