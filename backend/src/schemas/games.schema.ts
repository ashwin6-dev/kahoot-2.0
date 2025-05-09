import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Question } from './questions.schema';

interface Player {
  name: string;
  score: number;
}

@Schema()
export class Game {
  _id: ObjectId;

  @Prop({ required: true })
  gameId: number;

  @Prop({ required: true })
  questions: Question[];

  @Prop({ required: true })
  players: Player[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
