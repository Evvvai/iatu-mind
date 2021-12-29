import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { RoleLecturer } from '../entities/role-lecturer.enum';

registerEnumType(RoleLecturer, {
  name: 'RoleLecturer',
});

@InputType()
export class DeleteDisciplineLecturerInput {
  @Field(() => Int, { nullable: false })
  lecturerId: number;

  @Field(() => Int, { nullable: false })
  groupDisciplineId: number;

  @Field(() => RoleLecturer, { nullable: false })
  role: RoleLecturer;
}
