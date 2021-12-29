import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DefaultGroupDisciplinesInput {
  @Field((type) => Int, { nullable: true })
  groupId: number;

  @Field((type) => Int, { nullable: true })
  periodId: number;

  @Field((type) => Int, { nullable: true })
  disciplineId: number;

  @Field((type) => Int, { nullable: true })
  userId: number;
}
