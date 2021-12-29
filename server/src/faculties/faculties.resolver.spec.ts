import { Test, TestingModule } from '@nestjs/testing';
import { FacultiesResolver } from './faculties.resolver';
import { FacultiesService } from './faculties.service';

describe('FacultiesResolver', () => {
  let resolver: FacultiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacultiesResolver, FacultiesService],
    }).compile();

    resolver = module.get<FacultiesResolver>(FacultiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
