import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineTasksService } from './discipline-tasks.service';

describe('DisciplineTasksService', () => {
  let service: DisciplineTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineTasksService],
    }).compile();

    service = module.get<DisciplineTasksService>(DisciplineTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
