import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../../schemas/customer.schema';
import { CreateCustomerDto } from '@grofers/dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

export class CustomerRepository {
    constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) {}

    async createCustomer(createCustomerDto: CreateCustomerDto) {
        const customerWithEmail = await this.findByEmail(createCustomerDto.email);
        if (customerWithEmail.length === 0) {
            try {
                const customer = new this.customerModel(createCustomerDto);
                const createdCustomer = await customer.save();
                return createdCustomer;
            } catch (error) {
                throw new InternalServerErrorException(error);
            }
        } else {
            throw new ConflictException('Email already in use');
        }
    }

    async findAll(): Promise<Customer[]> {
        return this.customerModel.find().exec();
    }

    async findByEmail(email: string) {
        try {
            console.log(email)
            const customer = await this.customerModel.find({ email }).exec();
            return customer;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}