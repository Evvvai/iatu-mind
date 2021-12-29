import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ScheduleTicketInput {
  @Field((type) => Int, { nullable: false })
  groupId: number;

  @Field((type) => Date, { nullable: false })
  dateAdd: Date;
}
