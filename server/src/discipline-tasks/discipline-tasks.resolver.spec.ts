import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineTasksResolver } from './discipline-tasks.resolver';
import { DisciplineTasksService } from './discipline-tasks.service';

describe('DisciplineTasksResolver', () => {
  let resolver: DisciplineTasksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineTasksResolver, DisciplineTasksService],
    }).compile();

    resolver = module.get<DisciplineTasksResolver>(DisciplineTasksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
