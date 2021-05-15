import { CreateEventDto } from '@grofers/dto';
import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
    constructor(private eventRepository: EventRepository) {}
    create(createEventDto: CreateEventDto) {
        return this.eventRepository.createEvent(createEventDto);
    }

    findEventsInLastWeek() {
        return this.eventRepository.findEventsInLastWeek();
    }

    findUpcomingEvents() {
        return this.eventRepository.findUpcomingEvents();
    }
}
