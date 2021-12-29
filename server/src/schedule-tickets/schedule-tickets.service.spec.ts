import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTicketsService } from './schedule-tickets.service';

describe('ScheduleTicketsService', () => {
  let service: ScheduleTicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleTicketsService],
    }).compile();

    service = module.get<ScheduleTicketsService>(ScheduleTicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
