import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GamesService } from '../games/games.service';
import { Player } from '../schemas/games.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LiveGameGateway {
  @WebSocketServer() server: Server;

  constructor(private gameService: GamesService) {}

  @SubscribeMessage('join-game')
  async handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('token') token: number,
  ) {
    const { name }: Player = await this.gameService.getPlayerInfo(
      gameId,
      token,
    );

    const gameIdString = gameId.toString();
    client.join(gameIdString);

    client.to(gameIdString).emit('player-joined', {
      name,
    });
  }

  @SubscribeMessage('submit-answer')
  handleSubmitAnswer(
    @MessageBody('gameId') gameId: number,
    @MessageBody('playerName') playerName: string,
    @MessageBody('questionId') questionId: number,
    @MessageBody('answer') answer: number,
  ) {}

  @SubscribeMessage('start-game')
  handleStartGame(@MessageBody('gameId') gameId: number) {}

  @SubscribeMessage('next-state')
  handleNextState(@MessageBody('gameId') gameId: number) {}
}
