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

  @Prop({ required: true, default: false })
  isHost: boolean;
}

const PlayerSchema = SchemaFactory.createForClass(Player);

@Schema()
export class Game {
  _id: ObjectId;

  @Prop({ required: true })
  gameId: number;

  @Prop({ type: [Types.ObjectId], ref: 'Question', required: true })
  questions: Question[];

  @Prop({ type: [PlayerSchema], required: true })
  players: Player[];

  @Prop({ required: true, default: 0 })
  round: number;

  @Prop({ required: true, default: Date.now() })
  roundStart: number;

  @Prop({ required: true, default: 0 })
  answeredInRound: number;

  @Prop({
    required: true,
    default: 'QUESTION',
    enum: ['QUESTION', 'ROUND_SCORES', 'FINISHED'],
  })
  state: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);