import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTicketsResolver } from './schedule-tickets.resolver';
import { ScheduleTicketsService } from './schedule-tickets.service';

describe('ScheduleTicketsResolver', () => {
  let resolver: ScheduleTicketsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleTicketsResolver, ScheduleTicketsService],
    }).compile();

    resolver = module.get<ScheduleTicketsResolver>(ScheduleTicketsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
