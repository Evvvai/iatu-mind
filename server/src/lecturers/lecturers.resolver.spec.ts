import { Test, TestingModule } from '@nestjs/testing';
import { LecturersResolver } from './lecturers.resolver';
import { LecturersService } from './lecturers.service';

describe('LecturersResolver', () => {
  let resolver: LecturersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LecturersResolver, LecturersService],
    }).compile();

    resolver = module.get<LecturersResolver>(LecturersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
