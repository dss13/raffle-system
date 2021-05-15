import { CreateRaffleRequest } from '@grofers/api-interfaces';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('raffleticket')
export class RaffleticketController {
    @Post("create")
    create(@Body() req: CreateRaffleRequest) {
        return ({
            "id": "1234"
        })
    }
}
