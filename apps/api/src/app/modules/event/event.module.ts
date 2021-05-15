import { Module } from '@nestjs/common';
import { ParticipateGuard } from '../../guards/participate.guard';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [ParticipateGuard],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
