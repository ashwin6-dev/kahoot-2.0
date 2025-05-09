import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import {Question} from "../schemas/questions.schema";

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  async createGame(@Body('questions') questions: Question[]) {
    const { gameId } = await this.gamesService.createGame(questions);
    return { gameId };
  }

  @Get(':id')
  getGameState(@Param('id', ParseIntPipe) id: number) {}

  @Get(':id/players/:name')
  getPlayerInfo(
    @Param('id', ParseIntPipe) gameId: number,
    @Param('name') playerName: string,
  ) {}

  @Delete(':id')
  removeGame(@Param('id') id: string) {}
}
