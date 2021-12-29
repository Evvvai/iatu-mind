import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupDiscipline } from 'src/groups-disciplines/entities/group-discipline.entity';
import { TaskComplete } from 'src/task-completes/entities/task-complete.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Index('FK_discipline_tasks_group_discipline', ['groupDisciplineId'], {})
@Index('FK_discipline_tasks_user', ['authorId'], {})
@Entity({ name: 'discipline_tasks' })
export class DisciplineTask {
  @Field(() => Int, { description: 'Discipline Id' })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field(() => Int, { description: 'Position in task list' })
  @Column({ name: 'index', default: 0 })
  index: number;

  @Field(() => Int, { description: 'Group Discipline Id' })
  @Column({ type: 'int', name: 'groupDisciplineId', nullable: false })
  groupDisciplineId: number;

  @Field({ description: 'Task title' })
  @Column({ name: 'title' })
  title: string;

  @Field({ description: 'Description task' })
  @Column({ name: 'description' })
  description: string;

  @Field({ description: 'Full description task in HTML', nullable: true })
  @Column({ name: 'fullDescription', type: 'tinytext', nullable: true })
  fullDescription: string;

  @Field({ description: 'Time when task end', nullable: true })
  @Column({ type: 'timestamp', precision: 6, nullable: true })
  endTime: Date;

  @Field({ description: 'Date added' })
  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Field({ description: 'Date updated' })
  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Field(() => Int, { description: 'Author task' })
  @Column({ name: 'authorId', type: 'int' })
  authorId: number;

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  @ManyToOne(
    () => GroupDiscipline,
    (groupDiscipline) => groupDiscipline.disciplineTask,
    {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn({
    name: 'groupDisciplineId',
    referencedColumnName: 'id',
  })
  groupDiscipline: GroupDiscipline;

  @ManyToOne(() => User, (user) => user.tasksCreated, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({
    name: 'authorId',
    referencedColumnName: 'id',
  })
  user: User;

  @OneToMany(() => TaskComplete, (taskComplete) => taskComplete.disciplineTask)
  taskComplete: TaskComplete[];
}
