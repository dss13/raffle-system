import { CreateEventDto, GetCustomerRaffleDto } from '@grofers/dto';
import { Injectable } from '@nestjs/common';
import { ParticipantService } from '../participant/participant.service';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
    constructor(private eventRepository: EventRepository) {}
    async create(createEventDto: CreateEventDto) {
        return await this.eventRepository.createEvent(createEventDto);
    }

    async findEventsInLastWeek() {
        return this.eventRepository.findEventsInLastWeek();
    }

    async findUpcomingEvents() {
        return await this.eventRepository.findUpcomingEvents();
    }

    async findById(id) {
        return await this.eventRepository.findById(id);
    }

    async findAllEndedWithNoWinner() {
        return await this.eventRepository.findAllEndedWithNoWinner();
    }

    async setWinner(eventId, customerId) {
        console.log(eventId, customerId)
        return await this.eventRepository.setWinner(eventId, customerId);
    }

    async getUpcomingForCustomer(mapParticipations: any[]) {
        mapParticipations = mapParticipations.map(item => item._id);
        console.log(mapParticipations)
        return await this.eventRepository.findEventsNotIn(mapParticipations);
    }
}
