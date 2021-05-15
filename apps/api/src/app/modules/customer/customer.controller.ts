import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
    @Get()
    findAll() {
        return ({
            "name": "Anna"
        })
    }
}
