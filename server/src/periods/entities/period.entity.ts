import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupDiscipline } from 'src/groups-disciplines/entities/group-discipline.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'periods' })
export class Period {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ type: 'year' })
  @Field((type) => Int)
  year: number;

  @Column({ type: 'tinyint' })
  @Field((type) => Int)
  half: number;

  @OneToMany(
    () => GroupDiscipline,
    (groupsDisciplines) => groupsDisciplines.period,
  )
  @Field((type) => [GroupDiscipline], { nullable: true })
  groupsDisciplines?: GroupDiscipline[];
}
