import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLecturerInput } from './dto/create-lecturer.input';
import { Lecturers } from './entities/lecturers.entity';
import { LecturersService } from './lecturers.service';

@Resolver()
export class LecturersResolver {
  constructor(private readonly lecturersService: LecturersService) {}

  // Query
  @Query((returns) => Lecturers, { name: 'lecturer' })
  @Resolver()
  getOne(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.lecturersService.getOneLecturer(id);
  }

  @Query((returns) => [Lecturers], { name: 'lecturers' })
  @Resolver()
  getAll() {
    return this.lecturersService.getAllLecturers();
  }

  // Mutation
  @Mutation((returns) => Lecturers, { name: 'createLecturer' })
  @Resolver()
  createLecturer(
    @Args('input') input: CreateLecturerInput,
  ): Promise<Lecturers> {
    return this.lecturersService.createLecturer(input);
  }
}
