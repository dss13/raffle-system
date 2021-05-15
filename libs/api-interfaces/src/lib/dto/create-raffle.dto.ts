import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateRaffleDto {
    @IsNotEmpty()
    customerId: Schema.Types.ObjectId;
}