import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '../entities/task-status.enum';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@InputType()
export class CreateTaskCompleteInput {
  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  disciplineTaskId: number;
}
