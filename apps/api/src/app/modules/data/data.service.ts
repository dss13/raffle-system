import { GetCustomerRaffleDto } from '@grofers/dto';
import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class DataService {
    constructor(private participantService: ParticipantService, private eventService: EventService) {}

    getParticipations(getCustomerRaffleDto: GetCustomerRaffleDto) {
        return this.participantService.findCustomerParticipations(getCustomerRaffleDto);
    }

    async getUpcomingEvents(getCustomerRaffleDto: GetCustomerRaffleDto) {
        const participations = await this.getParticipations(getCustomerRaffleDto);
        const mapParticipations = participations.map(participation => participation.event)
        console.log(mapParticipations)
        return this.eventService.getUpcomingForCustomer(mapParticipations);
    }
}
