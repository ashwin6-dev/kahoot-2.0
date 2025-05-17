import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Question } from '../schemas/questions.schema';
import { GameStateService } from '../games/services/game-state.service';
import { ScoringService } from '../games/services/scoring.service';
import { GameManagerService } from '../games/services/game-manager.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LiveGameGateway {
  @WebSocketServer() server: Server;

  constructor(
    private gameManagerService: GameManagerService,
    private gameStateService: GameStateService,
    private scoringService: ScoringService,
  ) {}

  @SubscribeMessage('start-game')
  async startGame(@MessageBody('gameId') gameId: number) {
    await this.gameStateService.startGame(gameId);
    this.server.to(gameId.toString()).emit('start-game');
  }

  @SubscribeMessage('join-game')
  handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
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
    const gameState = await this.gameStateService.getGameState(gameId, token);
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
    const allAnswered = await this.scoringService.handleAnswer(
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
    await this.gameStateService.updateGameToNextState(gameId);
    this.server.to(gameId.toString()).emit('state-update');
  }

  @SubscribeMessage('end-game')
  endGame(@MessageBody('gameId') gameId: number) {
    this.gameManagerService.deleteGame(gameId);
    this.server.to(gameId.toString()).emit('end-game');
  }
}
