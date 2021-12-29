import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesResolver } from './disciplines.resolver';
import { DisciplinesService } from './disciplines.service';

describe('DisciplinesResolver', () => {
  let resolver: DisciplinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplinesResolver, DisciplinesService],
    }).compile();

    resolver = module.get<DisciplinesResolver>(DisciplinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
