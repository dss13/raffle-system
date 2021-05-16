import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
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

    async findRaffle(payload) {
        try {
            return await this.raffleTicketModel.find(payload).exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async setUsed(id: Schema.Types.ObjectId) {
        try {
            const res = await this.raffleTicketModel.findOneAndUpdate({_id: id}, {
                used: true
            }).exec();
            return res;
        } catch(error) {
            new InternalServerErrorException(error);
        }
    }
}