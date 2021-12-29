import { Test, TestingModule } from '@nestjs/testing';
import { FinalTaskResolver } from './final-task.resolver';
import { FinalTaskService } from './final-task.service';

describe('FinalTaskResolver', () => {
  let resolver: FinalTaskResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinalTaskResolver, FinalTaskService],
    }).compile();

    resolver = module.get<FinalTaskResolver>(FinalTaskResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
