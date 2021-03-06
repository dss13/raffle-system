import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipateGuard } from '../../guards/participate.guard';
import { Customer, CustomerSchema } from '../../schemas/customer.schema';
import { Event, EventSchema } from '../../schemas/event.schema';
import { Participant, ParticipantSchema } from '../../schemas/participant.schema';
import { RaffleTicket, RaffleTicketSchema } from '../../schemas/raffle-ticket.schema';
import { ParticipantModule } from '../participant/participant.module';
import { RaffleticketModule } from '../raffleticket/raffleticket.module';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
  imports: [
    ParticipateGuard,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Event.name, schema: EventSchema },
      { name: Participant.name, schema: ParticipantSchema },
      { name: RaffleTicket.name, schema: RaffleTicketSchema },
    ]),
    RaffleticketModule
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [EventService]
})
export class EventModule {}
