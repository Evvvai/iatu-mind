import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { RoleLecturer } from '../entities/role-lecturer.enum';

registerEnumType(RoleLecturer, {
  name: 'RoleLecturer',
});

@InputType()
export class CreateDisciplineLecturerInput {
  @Field((type) => Int, { nullable: false })
  lecturerId: number;

  @Field((type) => Int, { nullable: false })
  groupDisciplineId: number;

  @Field((type) => RoleLecturer, { nullable: false })
  role: RoleLecturer;
}
