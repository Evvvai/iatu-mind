import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Faculty } from 'src/faculties/entities/faculty.entity';
import { GroupDiscipline } from 'src/groups-disciplines/entities/group-discipline.entity';
import { ScheduleTicket } from 'src/schedule-tickets/entities/schedule-ticket';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  facultyId?: number;

  @ManyToOne(() => Faculty, (facultyId) => facultyId.groups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @Field((type) => Faculty)
  faculty: Faculty;

  @OneToMany(() => ScheduleTicket, (tickets) => tickets.group)
  @Field((type) => [ScheduleTicket], { nullable: false })
  tickets: ScheduleTicket[];

  @OneToMany(
    () => GroupDiscipline,
    (groupsDisciplines) => groupsDisciplines.group,
  )
  @Field((type) => [GroupDiscipline], { nullable: true })
  groupsDisciplines?: GroupDiscipline[];
}
