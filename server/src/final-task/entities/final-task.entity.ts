import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GroupDiscipline } from 'src/groups-disciplines/entities/group-discipline.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'final_task' })
export class FinalTask {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false })
  name: string;

  @OneToMany(
    () => GroupDiscipline,
    (groupDiscipline) => groupDiscipline.finalTask,
  )
  // @Field((type) => [GroupDiscipline])
  groupsDisciplines?: GroupDiscipline[];
}
