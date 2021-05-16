import { CreateParticipantDto } from '@grofers/dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ParticipateGuard } from './guards/participate.guard';
import { ParticipantService } from './participant.service';

@Controller('participant')
export class ParticipantController {
    constructor(private participantService: ParticipantService) {}
    @Post('create')
    @UseGuards(ParticipateGuard)
    create(@Body() createParticipantDto: CreateParticipantDto) {
        return this.participantService.create(createParticipantDto);
    }
}
