import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineLecturersResolver } from './discipline-lecturers.resolver';
import { DisciplineLecturersService } from './discipline-lecturers.service';

describe('DisciplineLecturersResolver', () => {
  let resolver: DisciplineLecturersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineLecturersResolver, DisciplineLecturersService],
    }).compile();

    resolver = module.get<DisciplineLecturersResolver>(
      DisciplineLecturersResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
