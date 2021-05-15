import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    name: string;
    @IsString()
    reward: string;
    @IsNotEmpty()
    endsAt: Date;
}