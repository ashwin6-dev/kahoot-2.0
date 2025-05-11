import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GamesService } from '../games/games.service';
import { Player } from '../schemas/games.schema';
import {Question} from "../schemas/questions.schema";


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LiveGameGateway {
  @WebSocketServer() server: Server;

  constructor(private gameService: GamesService) {}

  @SubscribeMessage('start-game')
  async startGame(@MessageBody('gameId') gameId: number) {
    await this.gameService.startGame(gameId);
    this.server.to(gameId.toString()).emit('start-game');
  }

  @SubscribeMessage('join-game')
  async handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('token') token: number,
  ) {
    const gameIdString = gameId.toString();
    client.join(gameIdString);

    client.to(gameIdString).emit('player-joined');
  }

  @SubscribeMessage('game-state')
  async handleStartGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('token') token: number,
  ) {
    const gameState = await this.gameService.getGameState(gameId, token);
    client.join(gameId.toString()); // ensure socket is always in the room
    client.emit('game-update', gameState);
  }

  @SubscribeMessage('submit-answer')
  async handleSubmitAnswer(
    @MessageBody('gameId') gameId: number,
    @MessageBody('question') question: Question,
    @MessageBody('answer') answer: number,
    @MessageBody('token') token: number,
    @MessageBody('elapsed') elapsed: number, // percentage of game round time elapsed
  ) {
    const allAnswered = await this.gameService.handleAnswer(
      gameId,
      token,
      elapsed,
      question,
      answer,
    );

    if (allAnswered) await this.handleNextState(gameId);
  }

  @SubscribeMessage('next-state')
  async handleNextState(@MessageBody('gameId') gameId: number) {
    await this.gameService.updateGameToNextState(gameId);
    this.server.to(gameId.toString()).emit('state-update');
  }

  @SubscribeMessage('end-game')
  async endGame(@MessageBody('gameId') gameId: number) {
    this.gameService.deleteGame(gameId);
    this.server.to(gameId.toString()).emit('end-game');
  }
}
