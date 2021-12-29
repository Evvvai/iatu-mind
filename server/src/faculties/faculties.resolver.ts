import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FacultiesService } from './faculties.service';
import { Faculty } from './entities/faculty.entity';

@Resolver(() => Faculty)
export class FacultiesResolver {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Query(() => [Faculty], { name: 'faculties' })
  findAll() {
    return this.facultiesService.findAll();
  }

  @Query(() => Faculty, { name: 'faculty' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.facultiesService.findOne(id);
  }
}
