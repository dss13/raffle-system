import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipateGuard } from '../../guards/participate.guard';
import { Customer, CustomerSchema } from '../../schemas/customer.schema';
import { Event, EventSchema } from '../../schemas/event.schema';
import { Participant, ParticipantSchema } from '../../schemas/participant.schema';
import { RaffleTicket, RaffleTicketSchema } from '../../schemas/raffle-ticket.schema';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    ParticipateGuard,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Event.name, schema: EventSchema },
      { name: Participant.name, schema: ParticipantSchema },
      { name: RaffleTicket.name, schema: RaffleTicketSchema },
    ])
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
