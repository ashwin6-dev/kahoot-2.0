import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class LiveGameGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('join-game')
  handleJoinGame(
    client: Socket,
    payload: { gameId: number; playerName: string; isHost: boolean },
  ) {}

  @SubscribeMessage('submit-answer')
  handleSubmitAnswer(
    client: Socket,
    payload: {
      gameId: number;
      playerName: string;
      questionId: number;
      answer: number;
    },
  ) {}

  @SubscribeMessage('start-game')
  handleStartGame(client: Socket, payload: { gameId: number }) {}

  @SubscribeMessage('next-state')
  handleNextState(client: Socket, payload: { gameId: number }) {}
}
