import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field({ nullable: true })
  name?: string;
}
