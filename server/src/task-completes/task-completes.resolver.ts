import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskCompletesService } from './task-completes.service';
import { TaskComplete } from './entities/task-complete.entity';
import { CreateTaskCompleteInput } from './dto/create-task-complete.input';
import { UpdateTaskCompleteInput } from './dto/update-task-complete.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => TaskComplete)
export class TaskCompletesResolver {
  constructor(private readonly taskCompletesService: TaskCompletesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TaskComplete)
  createTaskComplete(
    @Args('createTaskCompleteInput')
    createTaskCompleteInput: CreateTaskCompleteInput,
  ) {
    return this.taskCompletesService.create(createTaskCompleteInput);
  }

  @Query(() => [TaskComplete], { name: 'taskCompletes' })
  findAll() {
    return this.taskCompletesService.findAll();
  }

  @Query(() => TaskComplete, { name: 'taskComplete' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskCompletesService.findOne(id, 1);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TaskComplete)
  updateTaskComplete(
    @Args('updateTaskCompleteInput')
    updateTaskCompleteInput: UpdateTaskCompleteInput,
  ) {
    return this.taskCompletesService.update(updateTaskCompleteInput);
  }

  @Mutation(() => TaskComplete)
  removeTaskComplete(@Args('id', { type: () => Int }) id: number) {
    return this.taskCompletesService.remove(id);
  }
}
