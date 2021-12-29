import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'date', name: 'date' })
  @Field()
  date: Date;

  @Column({ type: 'varchar', name: 'class' })
  @Field()
  class: string;

  @Column({ type: 'time', name: 'timeStart' })
  @Field()
  timeStart: string;

  @Column({ type: 'time', name: 'timeStop' })
  @Field()
  timeStop: string;

  @Column({ type: 'tinyint', name: 'discipline' })
  @Field()
  discipline: string;

  @Column({ type: 'varchar', name: 'type' })
  @Field()
  type: string;

  @Column({ type: 'varchar', name: 'teacher' })
  @Field()
  teacher: string;

  @Column({ type: 'varchar', name: 'cabinet' })
  @Field()
  cabinet: string;

  @Column({ type: 'int', name: 'subgroup' })
  @Field()
  subgroup: number;
}
