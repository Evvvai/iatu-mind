import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDisciplineInput {
  @Field((type) => Int, { nullable: false })
  groupId: number;

  @Field((type) => Int, { nullable: false })
  periodId: number;
}
