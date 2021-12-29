import { Args, Query, Resolver } from '@nestjs/graphql';
import { DisciplinesService } from './disciplines.service';
import { DisciplineInput } from './dto/discipline.input';
import { FindAvailableDisciplineInput } from './dto/find-available-discipline.input';
import { Discipline } from './entities/discipline.entity';

@Resolver()
export class DisciplinesResolver {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Query(() => [Discipline], { name: 'disciplinesAvailable' })
  disciplinesAvailable(
    @Args('disciplineInput') input: FindAvailableDisciplineInput,
  ): Promise<Discipline[]> {
    return this.disciplinesService.findAvailable(input);
  }

  @Query(() => [Discipline], { name: 'disciplines' })
  disciplinesAll(@Args('input') input: DisciplineInput): Promise<Discipline[]> {
    return this.disciplinesService.findAll(input);
  }
}
