import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { DisciplineTask } from 'src/discipline-tasks/entities/discipline-task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@ObjectType({ description: 'Taks completes status' })
@Index('FK_task_completes_discipline_task', ['disciplineTaskId'], {})
@Index('FK_task_completes_user', ['userId'], {})
@Entity({ name: 'task_completes' })
export class TaskComplete {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int, { description: 'Unique indentificator', nullable: true })
  id: number;

  @Column({ type: 'enum', name: 'status', enum: TaskStatus })
  @Field(() => TaskStatus, { description: 'Status complete', nullable: true })
  status: TaskStatus;

  @Column({ type: 'int', nullable: false, name: 'userId' })
  @Field(() => Int, { description: 'User id', nullable: true })
  userId: number;

  @Column({ type: 'int', nullable: false, name: 'disciplineTaskId' })
  @Field(() => Int, { description: 'Discipline task id', nullable: true })
  disciplineTaskId: number;

  @Field(() => Date, { description: 'Date updated', nullable: true })
  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  @ManyToOne(() => User, (user) => user.taskComplete, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(
    () => DisciplineTask,
    (disciplineTask) => disciplineTask.taskComplete,
    {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn([{ name: 'disciplineTaskId', referencedColumnName: 'id' }])
  disciplineTask: DisciplineTask;
}
