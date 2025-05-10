import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Question } from './questions.schema';

@Schema({ _id: false })
export class Player {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  score: number;

  @Prop({ required: true })
  token: number;
}

const PlayerSchema = SchemaFactory.createForClass(Player);

@Schema()
export class Game {
  _id: ObjectId;

  @Prop({ required: true })
  gameId: number;

  @Prop({ type: [Types.ObjectId], ref: 'Question', required: true })
  questions: Question[];

  @Prop({ type: PlayerSchema, required: true })
  host: Player;

  @Prop({ type: [PlayerSchema], required: true })
  players: Player[];
}

export const GameSchema = SchemaFactory.createForClass(Game);