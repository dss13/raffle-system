import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { ParticipantModule } from '../participant/participant.module';
import { WinnerController } from './winner.controller';
import { WinnerService } from './winner.service';

@Module({
    imports: [
        EventModule,
        ParticipantModule
    ],
    controllers: [WinnerController],
    providers: [WinnerService]
})
export class WinnerModule {}
