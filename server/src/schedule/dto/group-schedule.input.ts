import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GroupScheduleInput {
  @Field({ nullable: false })
  group: string;
}
