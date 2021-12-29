import { Test, TestingModule } from '@nestjs/testing';
import { GroupsDisciplinesService } from './groups-disciplines.service';

describe('GroupsDisciplinesService', () => {
  let service: GroupsDisciplinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsDisciplinesService],
    }).compile();

    service = module.get<GroupsDisciplinesService>(GroupsDisciplinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
