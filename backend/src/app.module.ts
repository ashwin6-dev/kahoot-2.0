import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveGameModule } from './live-game/live-game.module';

@Module({
  imports: [LiveGameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
