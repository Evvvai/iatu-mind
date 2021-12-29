import { CreateFacultyInput } from './create-faculty.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFacultyInput extends PartialType(CreateFacultyInput) {
  @Field()
  name!: string;
}
