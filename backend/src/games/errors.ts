import { NotFoundException, BadRequestException } from '@nestjs/common';

export const gameNotFound = (id: number) => {
  throw new NotFoundException(`Game with ID "${id}" not found`);
}

export const playerNameTaken = (id: number, player: string) => {
  throw new BadRequestException(
    `Player name ${player} is taken in game with ID "${id}"`
  );
}

export const playerTokenDoestNotExist = (id: number, token: number) => {
  throw new BadRequestException(
      `Token ${token} is not in game with ID "${id}"`
  );
}