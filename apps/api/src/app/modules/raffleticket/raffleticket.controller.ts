import { CreateRaffleRequest } from '@grofers/api-interfaces';
import { CreateRaffleDto, GetCustomerRaffleDto } from '@grofers/dto';
import { Body, Controller, Post } from '@nestjs/common';
import { RaffleTicketRepository } from './raffleticket.repository';
import { RaffleticketService } from './raffleticket.service';

@Controller('raffleticket')
export class RaffleticketController {
    constructor(private raffleTicketService: RaffleticketService) {}

    @Post('create')
    create(@Body() req: CreateRaffleDto) {
        console.log(req);
        return this.raffleTicketService.createRaffleTicket(req);
    }

    @Post('customer')
    forCustomer(@Body() req: GetCustomerRaffleDto) {
        return this.raffleTicketService.getRaffleForCustomer(req);
    }

    @Post('unused')
    getUnused(@Body() req: GetCustomerRaffleDto) {
        return this.raffleTicketService.getUnused(req);
    }
}
