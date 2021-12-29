import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DisciplineTasksService } from './discipline-tasks.service';
import { DisciplineTask } from './entities/discipline-task.entity';
import { CreateDisciplineTaskInput } from './dto/create-discipline-task.input';
import { UpdateDisciplineTaskInput } from './dto/update-discipline-task.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../users/entities/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TaskComplete } from '../task-completes/entities/task-complete.entity';
import { TaskCompletesService } from '../task-completes/task-completes.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => DisciplineTask)
export class DisciplineTasksResolver {
  constructor(
    private readonly disciplineTasksService: DisciplineTasksService,
    private readonly taskCompleteService: TaskCompletesService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [DisciplineTask], { name: 'disciplineTasks' })
  findAll(
    @Args('groupDisciplineId', { type: () => Int }) groupDisciplineId: number,
  ): Promise<DisciplineTask[]> {
    return this.disciplineTasksService.findAll(groupDisciplineId);
  }

  @Query(() => DisciplineTask, { name: 'disciplineTask' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.disciplineTasksService.findOne(id);
  }

  @Mutation(() => DisciplineTask)
  updateDisciplineTask(
    @Args('updateDisciplineTaskInput')
    updateDisciplineTaskInput: UpdateDisciplineTaskInput,
  ) {
    return this.disciplineTasksService.update(
      updateDisciplineTaskInput.id,
      updateDisciplineTaskInput,
    );
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => DisciplineTask, { name: 'createDisciplineTask' })
  createDisciplineTask(
    @Args('input')
    input: CreateDisciplineTaskInput,
  ): Promise<DisciplineTask> {
    return this.disciplineTasksService.create(input);
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => DisciplineTask, { name: 'removeDisciplineTask' })
  removeDisciplineTask(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DisciplineTask> {
    return this.disciplineTasksService.remove(id);
  }

  // Resolve
  @ResolveField((returns) => TaskComplete)
  taskStatus(
    @Args('userId', { type: () => Int }) userId: number,
    @Parent() disciplineTask: DisciplineTask,
  ): Promise<TaskComplete> {
    console.log('userId', userId);

    return this.taskCompleteService.findOne(disciplineTask.id, userId);
  }

  @ResolveField((returns) => User)
  author(@Parent() disciplineTask: DisciplineTask): Promise<User> {
    return this.usersService.findUserById(disciplineTask.authorId);
  }
}
