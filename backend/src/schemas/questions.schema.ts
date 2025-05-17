import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Question {
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
