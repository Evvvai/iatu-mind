import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGroupDisciplines {
  @Field((type) => Int, { nullable: false })
  groupId: number;

  @Field((type) => Int, { nullable: false })
  periodId: number;

  @Field((type) => Int, { nullable: false })
  disciplineId: number;

  @Field((type) => Int, { nullable: false })
  finalTaskId: number;

  @Field((type) => Boolean, { nullable: false })
  isCourse: boolean;
}
