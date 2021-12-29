import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Period } from 'src/periods/entities/period.entity';
import { FinalTask } from 'src/final-task/entities/final-task.entity';
import { DisciplineLecturers } from 'src/discipline-lecturers/entities/discipline-lecturers.entity';
import { DisciplineTask } from 'src/discipline-tasks/entities/discipline-task.entity';

@ObjectType()
@Index('FK_group_id_groups_disciplines', ['groupId'], {})
@Index('FK_groups_disciplines_buf_disciplines', ['disciplineId'], {})
@Index('FK_period_id_groups_disciplines', ['periodId'], {})
@Index('FK_final_task_id_groups_disciplines', ['finalTaskId'], {})
@Entity('groups_disciplines')
export class GroupDiscipline {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field((type) => Int)
  id: number;

  @Column('int', { name: 'groupId', nullable: false })
  @Field((type) => Int)
  groupId: number;

  @Column('int', { name: 'disciplineId', nullable: false })
  @Field((type) => Int)
  disciplineId: number;

  @Column('int', { name: 'periodId', nullable: false })
  @Field((type) => Int)
  periodId: number;

  @Column('int', { name: 'finalTaskId', nullable: false })
  @Field((type) => Int)
  finalTaskId: number;

  @Column('boolean', { name: 'isCourse', nullable: false })
  @Field((type) => Int)
  isCourse: boolean;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Relationships

  @ManyToOne(() => FinalTask, (finalTask) => finalTask.groupsDisciplines, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'finalTaskId', referencedColumnName: 'id' }])
  // @Field((type) => FinalTask)
  finalTask: FinalTask;

  @ManyToOne(() => Group, (groups) => groups.groupsDisciplines, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'groupId', referencedColumnName: 'id' }])
  // @Field((type) => Group)
  group: Group;

  @ManyToOne(() => Discipline, (disciplines) => disciplines.groupsDisciplines, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'disciplineId', referencedColumnName: 'id' }])
  // @Field((type) => Discipline)
  discipline: Discipline;

  @ManyToOne(() => Period, (periods) => periods.groupsDisciplines, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'periodId', referencedColumnName: 'id' }])
  // @Field((type) => Period)
  period: Period;

  @OneToMany(
    () => DisciplineLecturers,
    (disciplineLecturers) => disciplineLecturers.groupDisciplines,
  )
  // @Field((type) => [DisciplineLecturers])
  disciplineLecturer: DisciplineLecturers[];

  @OneToMany(
    () => DisciplineTask,
    (disciplineTasks) => disciplineTasks.groupDiscipline,
  )
  disciplineTask: DisciplineTask[];
}
