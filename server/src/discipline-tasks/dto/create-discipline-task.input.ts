import { InputType, Int, Field } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateDisciplineTaskInput {
  @Field(() => Int, { description: 'Group discipline Id' })
  groupDisciplineId: number;

  @MinLength(4)
  @MaxLength(32)
  @Field({ description: 'Title' })
  title: string;

  @MinLength(4)
  @MaxLength(64)
  @Field({ description: 'Description' })
  description: string;

  @Field(() => Int, { description: 'Author' })
  authorId: number;

  @Field(() => Int, { description: 'Index' })
  index: number;
}
