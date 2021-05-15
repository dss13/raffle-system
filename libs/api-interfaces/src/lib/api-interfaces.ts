import { IsString } from 'class-validator';
export interface Message {
  message: string;
}

export class CreatePariticipantRequest {
  @IsString()
  eventId: string;
  @IsString()
  customerId: string;
  @IsString()
  raffleId: string;
}

export class CreateRaffleRequest {
  @IsString()
  customerId: string;
}