import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FigureDocument = Figure & Document;

@Schema({ timestamps: true })
export class Figure {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  era: string;

  @Prop({ default: 0 })
  eraOrder: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ type: [String], default: [] })
  coreThoughts: string[];

  @Prop({ type: [String], default: [] })
  works: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const FigureSchema = SchemaFactory.createForClass(Figure);