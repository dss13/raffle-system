import { Module } from '@nestjs/common';
import { RaffleticketController } from './raffleticket.controller';
import { RaffleticketService } from './raffleticket.service';

@Module({
  controllers: [RaffleticketController],
  providers: [RaffleticketService]
})
export class RaffleticketModule {}
