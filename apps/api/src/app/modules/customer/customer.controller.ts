import { CreateCustomerDto } from '@grofers/dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}
    @Get('all')
    findAll() {
        return this.customerService.findAll();
    }

    @Post('create')
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }
}
