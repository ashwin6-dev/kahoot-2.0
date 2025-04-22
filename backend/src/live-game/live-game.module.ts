import { Module } from '@nestjs/common';
import { LiveGameGateway } from './live-game.gateway';

@Module({
  providers: [LiveGameGateway]
})
export class LiveGameModule {}
