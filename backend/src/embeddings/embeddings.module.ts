import { Module } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';

@Module({
  providers: [EmbeddingsService],
})
export class EmbeddingsModule {}
