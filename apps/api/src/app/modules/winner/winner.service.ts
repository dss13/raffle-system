import { Injectable } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class WinnerService {
    constructor(private eventService: EventService, private participantService: ParticipantService) {}

    async updateWinners() {
        const events = await this.eventService.findAllEndedWithNoWinner();

        events.forEach(async event => {
            const participants = await this.participantService.findByEvent(event._id);
            if (participants.length === 0) return;
            const n = participants.length;
            console.log(participants);
            const random = parseInt((Math.random() * n) + "");
            console.log(participants[random].customer);
            await this.eventService.setWinner(event._id, participants[random].customer);
        });

        return this.eventService.findEventsInLastWeek();
    }

    async getAllWinners() {
        const events = await this.eventService.findEventsInLastWeek();

        const res = await events.map((event: any) => ({
            winner: event.winner.name,
            name: event.name,
            reward: event.reward,
            end: event.endsAt
        }));
        return res;
    }
}
