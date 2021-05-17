import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { ParticipantModule } from '../participant/participant.module';
import { RaffleticketModule } from '../raffleticket/raffleticket.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [
    EventModule,
    ParticipantModule,
    RaffleticketModule
  ],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}
