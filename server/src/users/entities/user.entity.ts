import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TaskComplete } from 'src/task-completes/entities/task-complete.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { DisciplineTask } from '../../discipline-tasks/entities/discipline-task.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field({ nullable: false })
  firstName: string;

  @Column({ type: 'varchar' })
  @Field({ nullable: false })
  lastName: string;

  @Column({ type: 'varchar' })
  @Field({ nullable: false })
  email: string;

  @Column({ type: 'varchar', unique: true })
  @Field({ nullable: false })
  login: string;

  @Column({ type: 'mediumtext' })
  @Field({ nullable: false })
  password: string;

  @CreateDateColumn({
    name: 'dateReg',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field({ nullable: false })
  dateReg: Date;

  @CreateDateColumn({
    name: 'lastLogin',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field({ nullable: false })
  lastLogin: Date;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  @Field({ nullable: false })
  role: Role;

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  @OneToMany(() => TaskComplete, (taskComplete) => taskComplete.user)
  taskComplete: TaskComplete[];

  @OneToMany(() => DisciplineTask, (tasksCreated) => tasksCreated.user)
  tasksCreated: DisciplineTask[];
}
