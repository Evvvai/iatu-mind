import { ObjectType, Field, Int, DateScalarMode } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('FK_group_id_schedule_ticket', ['groupId'], {})
@ObjectType()
@Entity({ name: 'schedule_tickets' })
export class ScheduleTicket {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ type: 'text', nullable: false })
  @Field({ nullable: false })
  text: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  dateAdd: string;

  @Column({ type: 'int', nullable: false })
  @Field((type) => Int, { nullable: false })
  groupId: number;

  @ManyToOne(() => Group, (group) => group.tickets)
  @Field((type) => Group, { nullable: false })
  group: Group;
}
