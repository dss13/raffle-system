import { CreateParticipantDto } from '@grofers/dto';
import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { RaffleticketService } from '../raffleticket/raffleticket.service';
import { ParticipantRepository } from './participant.repository';

@Injectable()
export class ParticipantService {
    constructor(private participantRepository: ParticipantRepository, private eventService: EventService, private raffleTicketService: RaffleticketService) {}

    create(createParticipantDto: CreateParticipantDto) {
        return this.participantRepository.createParticipant(createParticipantDto);
    }

    async validateParticipation(createParticipantDto: CreateParticipantDto) {
        const event = await this.eventService.findById(createParticipantDto.eventId);
        if (event === null) {
            throw new NotAcceptableException("Event does not exist.");
        }
        const participant = await this.findByEventAndCustomer({
            customer: createParticipantDto.customerId,
            event: createParticipantDto.eventId
        });

        if (participant.length !== 0) {
            throw new ConflictException('Customer already registered to the event.');
        }

        const findCustomerWithRaffle = await this.raffleTicketService.findRaffle({
            customer: createParticipantDto.customerId,
            _id: createParticipantDto.raffleId
        });

        if (findCustomerWithRaffle.length === 0) {
            throw new NotAcceptableException("Customer does not hold said raffle ticket.");
        }

        const participantWithRaffle = await this.findByRaffleTicket(createParticipantDto.raffleId);

        if (participantWithRaffle.length !== 0) {
            throw new ConflictException('Raffle ticket already used.');
        }

        return true;
    }

    async findByRaffleTicket(raffleId) {
        return await this.participantRepository.findByRaffleTicket(raffleId);
    }

    async findByEventAndCustomer(payload) {
        return await this.participantRepository.findByEventAndCustomer(payload);
    }

    async findByEvent(payload) {
        const randomLimit = parseInt((Math.random() * 1000 * 1000) + "");
        return await this.participantRepository.findByEvent(payload, randomLimit);
    }
}
