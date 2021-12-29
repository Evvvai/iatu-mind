import { Test, TestingModule } from '@nestjs/testing';
import { TaskCompletesResolver } from './task-completes.resolver';
import { TaskCompletesService } from './task-completes.service';

describe('TaskCompletesResolver', () => {
  let resolver: TaskCompletesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCompletesResolver, TaskCompletesService],
    }).compile();

    resolver = module.get<TaskCompletesResolver>(TaskCompletesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
