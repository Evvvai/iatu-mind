import { Test, TestingModule } from '@nestjs/testing';
import { TaskCompletesService } from './task-completes.service';

describe('TaskCompletesService', () => {
  let service: TaskCompletesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCompletesService],
    }).compile();

    service = module.get<TaskCompletesService>(TaskCompletesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
