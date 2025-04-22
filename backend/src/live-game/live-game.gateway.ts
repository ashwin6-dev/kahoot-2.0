import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class LiveGameGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('join-game')
  handleJoinGame(
    @MessageBody("gameId") gameId: number,
    @MessageBody("playerName") playerName: string,
    @MessageBody("isHost") isHost: boolean
  ) {}

  @SubscribeMessage('submit-answer')
  handleSubmitAnswer(
    @MessageBody("gameId") gameId: number,
    @MessageBody("playerName") playerName: string,
    @MessageBody("questionId") questionId: number,
    @MessageBody("answer") answer: number
  ) {}

  @SubscribeMessage('start-game')
  handleStartGame(@MessageBody("gameId") gameId: number) {}

  @SubscribeMessage('next-state')
  handleNextState(@MessageBody("gameId") gameId: number) {}
}
