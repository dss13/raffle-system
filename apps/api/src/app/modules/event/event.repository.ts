import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
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
        try {
            return this.eventModel.find().exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findEventsInLastWeek(): Promise<Event[]> {
        try {
            const endDate = new Date();
            const sevenDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
            const startDate = new Date(sevenDaysAgo.toDateString());
            return await this.eventModel.find({
                endsAt: {
                    $gte: startDate,
                    $lt:  endDate
                }
            })
            .populate('winner')
            .exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }

    }

    async findUpcomingEvents(): Promise<Event[]> {
        try {
            const date = new Date();
            return await this.eventModel.find({
                endsAt: {
                    $gte: date
                }
            })
        } catch(error) {
            throw new InternalServerErrorException(error);
        }

    }

    async findById(id: any) {
        try {
            return await this.eventModel.findById(id).exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAllEndedWithNoWinner() {
        try {
            return await this.eventModel.find({
                endsAt: {
                    $lte: new Date()
                },
                winner: {
                    $ne: null
                }
            })
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async setWinner(eventId: Schema.Types.ObjectId, customerId: Schema.Types.ObjectId) {
        console.log(eventId, customerId)
        try {
            const res = await this.eventModel.findOneAndUpdate({_id: eventId}, {
                customer: customerId
            }).exec();
            console.log(res);
            return res;
        } catch(error) {
            new InternalServerErrorException(error);
        }
    }

    async findEventsNotIn(mapParticipations: any) {
        try {
            const res = await this.eventModel.find({
                endsAt: {
                    '$gte': new Date()
                }
            }).where('_id').nin(mapParticipations).exec()
            console.log(res);
            return res
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}