import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Lecturers } from 'src/lecturers/entities/lecturers.entity';
import { LecturersService } from 'src/lecturers/lecturers.service';
import { Role } from 'src/users/entities/role.enum';
import { DisciplineLecturersService } from './discipline-lecturers.service';
import { CreateDisciplineLecturerInput } from './dto/create-discipline-lecturer.input';
import { DeleteDisciplineLecturerInput } from './dto/delete-discipline-lecturer.input';
import { DisciplineLecturers } from './entities/discipline-lecturers.entity';

@Resolver(() => DisciplineLecturers)
export class DisciplineLecturersResolver {
  constructor(
    private readonly disciplineLecturersService: DisciplineLecturersService,
    private readonly lecturersService: LecturersService,
  ) {}

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation((returns) => DisciplineLecturers, {
    name: 'createDisciplineLecturer',
  })
  createDisciplineLecturer(
    @Args('input') input: CreateDisciplineLecturerInput,
  ): Promise<DisciplineLecturers> {
    return this.disciplineLecturersService.createDisciplineLecturer(input);
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation((returns) => DisciplineLecturers, {
    name: 'removeDisciplineLecturer',
  })
  removeDisciplineLecturer(
    @Args('input') input: DeleteDisciplineLecturerInput,
  ): Promise<DisciplineLecturers> {
    return this.disciplineLecturersService.removeDisciplineLecturer(input);
  }

  // Resolve
  @ResolveField((returns) => Lecturers, { name: 'lecturer' })
  lecturer(@Parent() disciplineLecturers: DisciplineLecturers) {
    return this.lecturersService.getOneLecturer(disciplineLecturers.lecturerId);
  }
}
