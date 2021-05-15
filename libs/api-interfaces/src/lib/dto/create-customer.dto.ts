import { IsEmail, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    from: number;

    @IsOptional()
    @IsPositive()
    limit: number;
}