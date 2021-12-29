import { CreateDisciplineTaskInput } from './create-discipline-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDisciplineTaskInput extends PartialType(
  CreateDisciplineTaskInput,
) {
  @Field(() => Int)
  id: number;
}
