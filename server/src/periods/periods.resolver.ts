import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PeriodsService } from './periods.service';
import { Period } from './entities/period.entity';

@Resolver((of) => Period)
export class PeriodsResolver {
  constructor(private readonly periodsService: PeriodsService) {}

  @Query((returns) => Period, { name: 'period' })
  getOne(@Args('id', { type: () => Int }) id: number) {
    return this.periodsService.getOne(id);
  }

  @Query((returns) => [Period], { name: 'periods' })
  getAll() {
    return this.periodsService.getAll();
  }
}
