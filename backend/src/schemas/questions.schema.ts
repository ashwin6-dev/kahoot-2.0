import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Question {
  _id: ObjectId;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  options: string[];

  @Prop({ required: true })
  answer: number;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  vector: number[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
