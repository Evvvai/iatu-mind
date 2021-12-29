import { Test, TestingModule } from '@nestjs/testing';
import { GroupsDisciplinesResolver } from './groups-disciplines.resolver';
import { GroupsDisciplinesService } from './groups-disciplines.service';

describe('GroupsDisciplinesResolver', () => {
  let resolver: GroupsDisciplinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsDisciplinesResolver, GroupsDisciplinesService],
    }).compile();

    resolver = module.get<GroupsDisciplinesResolver>(GroupsDisciplinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
