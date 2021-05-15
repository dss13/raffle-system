import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';

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
    createParticipant(@Body() req) {
        if (!req.event || !req.customer || !req.raffle) {
            throw new BadRequestException("This method expects event, customer and raffle in the request body");
        }

        return ({
            "message": "Participation confirmed"
        })
    }
}
