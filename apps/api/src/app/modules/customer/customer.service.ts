import { CreateCustomerDto } from '@grofers/dto';
import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
    constructor(private customerRepository: CustomerRepository) {}

    async createCustomer(createCustomerDto: CreateCustomerDto) {
        return this.customerRepository.createCustomer(createCustomerDto);
    }

    async findAll() {
        return this.customerRepository.findAll();
    }
}
