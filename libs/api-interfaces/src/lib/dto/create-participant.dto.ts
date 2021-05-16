import { IsNotEmpty } from "class-validator";
import { Schema } from 'mongoose';
export class CreateParticipantDto {
    @IsNotEmpty()
    eventId: Schema.Types.ObjectId;

    @IsNotEmpty()
    customerId: Schema.Types.ObjectId;

    @IsNotEmpty()
    raffleId: Schema.Types.ObjectId;
}