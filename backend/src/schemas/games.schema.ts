import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Question } from './questions.schema';

@Schema({ _id: false })
class PlayerSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  score: number;
}

const Player = SchemaFactory.createForClass(PlayerSchema);

@Schema()
export class Game {
  _id: ObjectId;

  @Prop({ required: true })
  gameId: number;

  @Prop({ type: [Types.ObjectId], ref: 'Question', required: true })
  questions: Question[];

  @Prop({ type: Player, required: true })
  host: PlayerSchema;

  @Prop({ type: [Player], required: true })
  players: PlayerSchema[];
}

export const GameSchema = SchemaFactory.createForClass(Game);