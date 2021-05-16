import { CreateRaffleDto, GetCustomerRaffleDto } from '@grofers/dto';
import { Injectable } from '@nestjs/common';
import { RaffleTicketRepository } from './raffleticket.repository';

@Injectable()
export class RaffleticketService {
    constructor(private raffleTicketRepository: RaffleTicketRepository) {}

    async createRaffleTicket(createRaffleTicketDto: CreateRaffleDto) {
        return await this.raffleTicketRepository.createRaffleTicket(createRaffleTicketDto);
    }

    async getRaffleForCustomer(getCustomerRaffleDto: GetCustomerRaffleDto) {
        return await this.raffleTicketRepository.findAllByCustomerId(getCustomerRaffleDto);
    }

    async findRaffle(payload) {
        return await this.raffleTicketRepository.findRaffle(payload);
    }

    async setUsed(id) {
        return await this.raffleTicketRepository.setUsed(id);
    }
}
