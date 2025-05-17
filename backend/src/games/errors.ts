import { NotFoundException, BadRequestException } from '@nestjs/common';

export class GameNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Game with ID "${id}" not found`);
  }
}

export class PlayerNameTakenException extends BadRequestException {
  constructor(id: number, player: string) {
    super(`Player name ${player} is taken in game with ID "${id}"`);
  }
}

export class PlayerTokenDoesNotExistException extends BadRequestException {
  constructor(id: number, token: number) {
    super(`Provided token ${token} is not in game with ID "${id}"`);
  }
}