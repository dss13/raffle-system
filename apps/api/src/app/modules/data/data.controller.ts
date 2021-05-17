import { GetCustomerRaffleDto } from '@grofers/dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private dataService: DataService) {}
    @Post('participations')
    getParticipations(@Body() getCustomerRaffleDto: GetCustomerRaffleDto) {
        return this.dataService.getParticipations(getCustomerRaffleDto);
    }

    @Post('events/upcoming')
    getUpcomingEvents(@Body() getCustomerRaffleDto: GetCustomerRaffleDto) {
        console.log(getCustomerRaffleDto);
        return this.dataService.getUpcomingEvents(getCustomerRaffleDto);
    }
}
