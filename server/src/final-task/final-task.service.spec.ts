import { Test, TestingModule } from '@nestjs/testing';
import { FinalTaskService } from './final-task.service';

describe('FinalTaskService', () => {
  let service: FinalTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinalTaskService],
    }).compile();

    service = module.get<FinalTaskService>(FinalTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
