import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../../schemas/event.schema';
import { CreateEventDto } from '@grofers/dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

export class EventRepository {
    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

    async createEvent(createEventDto: CreateEventDto) {
        try {
            const event = new this.eventModel(createEventDto);
            const createdEvent = await event.save();
            return createdEvent;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<Event[]> {
        return this.eventModel.find().exec();
    }

    async findEventsInLastWeek(): Promise<Event[]> {
        const endDate = new Date();
        const sevenDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
        const startDate = new Date(sevenDaysAgo.toDateString());
        return await this.eventModel.find({
            endsAt: {
                $gte: startDate,
                $lt:  endDate
            }
        }).exec();
    }

    async findUpcomingEvents(): Promise<Event[]> {
        const date = new Date();
        return await this.eventModel.find({
            endsAt: {
                $gte: date
            }
        })
    }
}