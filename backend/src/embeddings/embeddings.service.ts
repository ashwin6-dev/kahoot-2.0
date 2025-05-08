import { Injectable } from '@nestjs/common';
import axios from "axios";

const EMBED_ENDPOINT = 'http://localhost:5000/embed';

interface EmbedResponse {
  text: string;
  embedding: number[];
}

@Injectable()
export class EmbeddingsService {
  async embedText(
    text: string,
    useAdapter: boolean = false,
  ): Promise<number[]> {
    const response = await axios.post(EMBED_ENDPOINT, { text, useAdapter });
    const { embedding } = response.data as EmbedResponse;
    return embedding;
  }
}
