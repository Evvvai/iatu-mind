import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DisciplineInput {
  @Field({ nullable: false })
  term: string;
}
