import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateScheduleTicketInput {
  @Field({ nullable: false })
  text: string;

  @Field((type) => Int, { nullable: false })
  groupId: number;

  @Field((type) => Date, { nullable: false })
  dateAdd: string;
}
