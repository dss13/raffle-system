import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../../schemas/customer.schema';
import { Event, EventSchema } from '../../schemas/event.schema';
import { Participant, ParticipantSchema } from '../../schemas/participant.schema';
import { RaffleTicket, RaffleTicketSchema } from '../../schemas/raffle-ticket.schema';
import { EventModule } from '../event/event.module';
import { RaffleticketModule } from '../raffleticket/raffleticket.module';
import { ParticipateGuard } from './guards/participate.guard';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './participant.repository';
import { ParticipantService } from './participant.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Event.name, schema: EventSchema },
      { name: Participant.name, schema: ParticipantSchema },
      { name: RaffleTicket.name, schema: RaffleTicketSchema },
    ]),
    EventModule,
    RaffleticketModule
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository, ParticipateGuard],
  exports: [ParticipantService]
})
export class ParticipantModule {}
