import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';

@Controller('games')
export class GamesController {
  @Post()
  createGame(@Body("questions") questions: number[]) {}

  @Get(":id")
  getGameState(@Param('id', ParseIntPipe) id: number) {}

  @Get(":id/players/:name")
  getPlayerInfo(
    @Param("id", ParseIntPipe) gameId: number,
    @Param("name") playerName: string,
  ) {}

  @Delete(":id")
  removeGame(@Param("id") id: string) {}
}