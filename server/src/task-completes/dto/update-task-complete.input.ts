import { CreateTaskCompleteInput } from './create-task-complete.input';
import {
  InputType,
  Field,
  Int,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { TaskStatus } from '../entities/task-status.enum';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@InputType()
export class UpdateTaskCompleteInput extends PartialType(
  CreateTaskCompleteInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => TaskStatus)
  status: TaskStatus;
}
