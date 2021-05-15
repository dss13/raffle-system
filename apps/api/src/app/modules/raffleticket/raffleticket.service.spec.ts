import { Test, TestingModule } from '@nestjs/testing';
import { RaffleticketService } from './raffleticket.service';

describe('RaffleticketService', () => {
  let service: RaffleticketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaffleticketService],
    }).compile();

    service = module.get<RaffleticketService>(RaffleticketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
