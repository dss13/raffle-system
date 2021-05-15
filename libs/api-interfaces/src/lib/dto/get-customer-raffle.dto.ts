import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class GetCustomerRaffleDto {
    @IsNotEmpty()
    customerId: Schema.Types.ObjectId;
}