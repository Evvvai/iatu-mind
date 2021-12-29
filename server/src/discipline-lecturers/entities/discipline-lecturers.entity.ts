import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GroupDiscipline } from 'src/groups-disciplines/entities/group-discipline.entity';
import { Lecturers } from 'src/lecturers/entities/lecturers.entity';
import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoleLecturer } from './role-lecturer.enum';

registerEnumType(RoleLecturer, {
  name: 'RoleLecturer',
});

@ObjectType()
@Index('FK_lecturer_id_lecturers', ['lecturerId'], {})
@Index('FK_group_discipline_id_lecturers', ['groupDisciplineId'], {})
@Entity({ name: 'discipline_lecturers' })
export class DisciplineLecturers {
  @PrimaryColumn({ type: 'int', name: 'lecturerId', nullable: false })
  @Field((type) => Int)
  lecturerId;

  @PrimaryColumn({ type: 'int', name: 'groupDisciplineId', nullable: false })
  @Field((type) => Int)
  groupDisciplineId;

  @PrimaryColumn({
    type: 'enum',
    enum: RoleLecturer,
  })
  @Field(() => RoleLecturer)
  role: RoleLecturer;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Relationships

  @ManyToOne(
    () => GroupDiscipline,
    (groupDisciplines) => groupDisciplines.group,
    {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn([{ name: 'groupDisciplineId', referencedColumnName: 'id' }])
  // @Field((type) => GroupDiscipline)
  groupDisciplines: GroupDiscipline;

  @ManyToOne(() => Lecturers, (lecturers) => lecturers.disciplineLecturers, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'lecturerId', referencedColumnName: 'id' }])
  // @Field((type) => Lecturers)
  lecturers: Lecturers;
}
