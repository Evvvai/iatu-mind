import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { DisciplineLecturersService } from 'src/discipline-lecturers/discipline-lecturers.service';
import { DisciplineLecturers } from 'src/discipline-lecturers/entities/discipline-lecturers.entity';
import { FinalTask } from 'src/final-task/entities/final-task.entity';
import { FinalTaskService } from 'src/final-task/final-task.service';
import { Role } from 'src/users/entities/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Discipline } from '../disciplines/entities/discipline.entity';
import { CreateGroupDisciplines } from './dto/create-group-disciplines.input';
import { DefaultGroupDisciplinesInput } from './dto/default-disciplines.input';
import { GroupDiscipline } from './entities/group-discipline.entity';
import { GroupsDisciplinesService } from './groups-disciplines.service';
import { DisciplineTask } from '../discipline-tasks/entities/discipline-task.entity';
import { DisciplineTasksService } from 'src/discipline-tasks/discipline-tasks.service';

@Resolver((of) => GroupDiscipline)
export class GroupsDisciplinesResolver {
  constructor(
    private readonly groupsDisciplinesService: GroupsDisciplinesService,
    private readonly finalTaskService: FinalTaskService,
    private readonly disciplineLecturersService: DisciplineLecturersService,
    private readonly disciplineTasksService: DisciplineTasksService,
  ) {}

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => GroupDiscipline, { name: 'createGroupDiscipline' })
  create(
    @Args('input') input: CreateGroupDisciplines,
  ): Promise<GroupDiscipline> {
    return this.groupsDisciplinesService.create(input);
  }

  @Query(() => [GroupDiscipline], { name: 'getExistDisciplines' })
  getExist(
    @Args('input') input: DefaultGroupDisciplinesInput,
  ): Promise<GroupDiscipline[]> {
    return this.groupsDisciplinesService.getExist(input);
  }

  @Query(() => GroupDiscipline, { name: 'getExtendDiscipline' })
  getExtend(
    @Args('input') input: DefaultGroupDisciplinesInput,
  ): Promise<GroupDiscipline> {
    return this.groupsDisciplinesService.getExtend(input);
  }

  // Resolve
  @ResolveField((returns) => Discipline)
  discipline(@Parent() groupDiscipline: GroupDiscipline): Promise<Discipline> {
    return this.groupsDisciplinesService.getOneDiscipline(
      groupDiscipline.disciplineId,
    );
  }

  @ResolveField((returns) => FinalTask)
  finalTask(@Parent() groupDiscipline: GroupDiscipline): Promise<FinalTask> {
    return this.finalTaskService.getOneFinalTask(groupDiscipline.id);
  }

  @ResolveField((returns) => [DisciplineLecturers])
  disciplineLecturer(
    @Parent() groupDiscipline: GroupDiscipline,
  ): Promise<DisciplineLecturers[]> {
    return this.disciplineLecturersService.getDisciplineLecturers(
      groupDiscipline.id,
    );
  }

  @ResolveField((returns) => [DisciplineTask])
  disciplineTasks(
    @Parent() groupDiscipline: GroupDiscipline,
  ): Promise<DisciplineTask[]> {
    return this.disciplineTasksService.findAll(groupDiscipline.id);
  }
}
