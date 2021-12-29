import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLecturerInput {
  @Field({ nullable: false })
  shortName: string;

  @Field({ nullable: false })
  fullName: string;
}
