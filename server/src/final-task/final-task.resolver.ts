import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FinalTask } from './entities/final-task.entity';
import { FinalTaskService } from './final-task.service';

@Resolver((of) => FinalTask)
export class FinalTaskResolver {
  constructor(private readonly finalTaskService: FinalTaskService) {}

  @Query(() => [FinalTask], { name: 'finalTasks' })
  findAll() {
    return this.finalTaskService.findAll();
  }
}
