import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RaffleTicket } from '../../schemas/raffle-ticket.schema';
import { CreateRaffleDto, GetCustomerRaffleDto } from '@grofers/dto';
import { InternalServerErrorException } from '@nestjs/common';

export class RaffleTicketRepository {
    constructor(@InjectModel(RaffleTicket.name) private readonly raffleTicketModel: Model<RaffleTicket>) {}

    async createRaffleTicket(createRaffleTicketDto: CreateRaffleDto) {
        try {
            const ticket = new this.raffleTicketModel({ customer: createRaffleTicketDto.customerId, name: new Date().getTime() });
            const createdTicket = await ticket.save();
            return createdTicket;
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAllByCustomerId({ customerId }: GetCustomerRaffleDto): Promise<RaffleTicket[]> {
        try {
            const tickets = await this.raffleTicketModel.find({ customer: customerId }).exec();
            return tickets;
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }
}