import { CreatePariticipantRequest } from '@grofers/api-interfaces';
import { CreateEventDto } from '@grofers/dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ParticipateGuard } from '../../guards/participate.guard';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) {}
    @Get('upcoming')
    getNextEvent() {
        return this.eventService.findUpcomingEvents();
    }

    @Post('create')
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @Get('winners')
    getWinners() {
        return ([{
            'name': 'Sumugan',
            'event': 'May marathon'
        }])
    }

    @Post('participate')
    @UseGuards(ParticipateGuard)
    createParticipant(@Body() req: CreatePariticipantRequest) {
        return ({
            'message': 'Participation confirmed'
        })
    }

    @Get('past')
    pastEvents() {
        return this.eventService.findEventsInLastWeek();
    }
}
