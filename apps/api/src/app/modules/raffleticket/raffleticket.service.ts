import { CreateRaffleDto, GetCustomerRaffleDto } from '@grofers/dto';
import { Injectable } from '@nestjs/common';
import { RaffleTicketRepository } from './raffleticket.repository';

@Injectable()
export class RaffleticketService {
    constructor(private raffleTicketRepository: RaffleTicketRepository) {}

    createRaffleTicket(createRaffleTicketDto: CreateRaffleDto) {
        console.log(createRaffleTicketDto);
        return this.raffleTicketRepository.createRaffleTicket(createRaffleTicketDto);
    }

    getRaffleForCustomer(getCustomerRaffleDto: GetCustomerRaffleDto) {
        return this.raffleTicketRepository.findAllByCustomerId(getCustomerRaffleDto);
    }
}
