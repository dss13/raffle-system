import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Participant } from "../../schemas/participant.schema";
import { CreateParticipantDto, GetCustomerRaffleDto } from '@grofers/dto';
import { InternalServerErrorException } from "@nestjs/common";

export class ParticipantRepository {
    constructor(@InjectModel(Participant.name) private readonly participantModel: Model<Participant>) {}

    async createParticipant(createParticipantDto: CreateParticipantDto) {
        try {
            const participant = new this.participantModel({
                customer: createParticipantDto.customerId,
                event: createParticipantDto.eventId,
                raffle: createParticipantDto.raffleId
            });

            return await participant.save();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByRaffleTicket(raffle): Promise<Participant[]> {
        try {
            return await this.participantModel.find({ raffle }).exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByEventAndCustomer(payload): Promise<Participant[]> {
        try {
            return await this.participantModel.find(payload).exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }

    }

    async findByEvent(eventId, limit): Promise<Participant[]> {
        try {
            return await this.participantModel.find({
                event: eventId
            }).limit(limit)
            .exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByCustomer(getCustomerRaffleDto: GetCustomerRaffleDto) {
        try {
            return await this.participantModel.find({customer: getCustomerRaffleDto.customerId}).populate('event').populate('raffle').exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }
}