import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineLecturersService } from './discipline-lecturers.service';

describe('DisciplineLecturersService', () => {
  let service: DisciplineLecturersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineLecturersService],
    }).compile();

    service = module.get<DisciplineLecturersService>(DisciplineLecturersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
