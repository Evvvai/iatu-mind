import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GroupDayScheduleInput {
  @Field({ nullable: false })
  group: string;

  @Field({ nullable: false })
  day: string;
}
