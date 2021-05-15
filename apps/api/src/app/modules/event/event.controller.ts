import { CreatePariticipantRequest } from '@grofers/api-interfaces';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ParticipateGuard } from '../../guards/participate.guard';

@Controller('event')
export class EventController {
    @Get('next')
    getNextEvent() {
        return ({
            "name": "May marathon",
            "time": new Date().toISOString(),
            "reward": "Macbook Air M1 chip"
        });
    }

    @Get('winners')
    getWinners() {
        return ([{
            "name": "Sumugan",
            "event": "May marathon"
        }])
    }

    @Post('participate')
    @UseGuards(ParticipateGuard)
    createParticipant(@Body() req: CreatePariticipantRequest) {
        return ({
            "message": "Participation confirmed"
        })
    }
}
