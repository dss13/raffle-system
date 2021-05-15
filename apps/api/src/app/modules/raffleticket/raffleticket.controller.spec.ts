import { Test, TestingModule } from '@nestjs/testing';
import { RaffleticketController } from './raffleticket.controller';

describe('RaffleticketController', () => {
  let controller: RaffleticketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaffleticketController],
    }).compile();

    controller = module.get<RaffleticketController>(RaffleticketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
