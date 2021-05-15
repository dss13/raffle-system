import { BadGatewayException, BadRequestException, Body, Controller, Post } from '@nestjs/common';

@Controller('raffleticket')
export class RaffleticketController {
    @Post("create")
    create(@Body() req) {
        if (!req.id) {
            throw new BadRequestException("This method expects an id...");
        }

        return ({
            "id": "1234"
        })
    }
}
