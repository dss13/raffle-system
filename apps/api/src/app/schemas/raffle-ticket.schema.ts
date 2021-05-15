import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from './customer.schema';

export type RaffleTicketDocument = RaffleTicket & mongoose.Document;

@Schema()
export class RaffleTicket {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
  customer: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  used: boolean;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  createdAt: Date;
}

export const RaffleTicketSchema = SchemaFactory.createForClass(RaffleTicket);
