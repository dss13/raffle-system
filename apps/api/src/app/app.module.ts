import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipateGuard } from './guards/participate.guard';
import { CustomerModule } from './modules/customer/customer.module';
import { EventModule } from './modules/event/event.module';
import { RaffleticketModule } from './modules/raffleticket/raffleticket.module';
import { RequestBodyValidatorPipe } from './pipes/request-body-validator.pipe';

import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantModule } from './modules/participant/participant.module';
import { WinnerModule } from './modules/winner/winner.module';
import { DataModule } from './modules/data/data.module';

@Module({
  imports: [
    CustomerModule,
    EventModule,
    RaffleticketModule,
    RequestBodyValidatorPipe,
    ParticipateGuard,
    MongooseModule.forRoot('mongodb://localhost/grofers'),
    ParticipantModule,
    WinnerModule,
    DataModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
