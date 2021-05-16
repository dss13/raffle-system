import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../../schemas/customer.schema';
import { Event, EventSchema } from '../../schemas/event.schema';
import { Participant, ParticipantSchema } from '../../schemas/participant.schema';
import { RaffleTicket, RaffleTicketSchema } from '../../schemas/raffle-ticket.schema';
import { RaffleticketController } from './raffleticket.controller';
import { RaffleTicketRepository } from './raffleticket.repository';
import { RaffleticketService } from './raffleticket.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Event.name, schema: EventSchema },
      { name: Participant.name, schema: ParticipantSchema },
      { name: RaffleTicket.name, schema: RaffleTicketSchema },
    ])
  ],
  controllers: [RaffleticketController],
  providers: [RaffleticketService, RaffleTicketRepository],
  exports: [RaffleticketService]
})
export class RaffleticketModule {}
