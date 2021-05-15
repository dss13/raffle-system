import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from './customer.schema';
import { Event } from './event.schema';
import { RaffleTicket } from './raffle-ticket.schema';

export type ParticipantDocument = Participant & mongoose.Document;

@Schema()
export class Participant {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  event: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RaffleTicket' })
  raffle: mongoose.Schema.Types.ObjectId;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  createdAt: Date;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
