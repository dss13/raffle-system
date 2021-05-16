import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type EventDocument = Event & mongoose.Document;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  reward: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  endsAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  winner: mongoose.Schema.Types.ObjectId;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  createdAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
