import { Controller, Get } from '@nestjs/common';
import { WinnerService } from './winner.service';

@Controller('winners')
export class WinnerController {
    constructor(private winnerService: WinnerService) {}
    @Get('populate')
    populate() {
        return this.winnerService.updateWinners();
    }

    @Get()
    getWinners() {
        return this.winnerService.getAllWinners();
    }
}
