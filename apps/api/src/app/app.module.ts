import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customer/customer.module';
import { EventModule } from './modules/event/event.module';
import { RaffleticketModule } from './modules/raffleticket/raffleticket.module';

@Module({
  imports: [CustomerModule, EventModule, RaffleticketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
