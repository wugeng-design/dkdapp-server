import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SectDocument = Sect & Document;

@Schema({ timestamps: true })
export class Sect {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  dynasty: string;

  @Prop({ required: true })
  practice: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ key: String, value: String }], default: [] })
  info: Array<{ key: string; value: string }>;

  @Prop({ type: [String], default: [] })
  representatives: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const SectSchema = SchemaFactory.createForClass(Sect);