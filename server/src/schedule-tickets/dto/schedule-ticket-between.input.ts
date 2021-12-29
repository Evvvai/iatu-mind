import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ScheduleTicketBetweenInput {
  @Field((type) => Int, { nullable: false })
  groupId: number;

  @Field((type) => Date, { nullable: false })
  dateFirst: Date;

  @Field((type) => Date, { nullable: false })
  dateLast: Date;
}
