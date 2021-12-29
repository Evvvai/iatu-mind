import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupDiscipline } from 'src/groups-disciplines/entities/group-discipline.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'disciplines' })
export class Discipline {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ type: 'tinytext' })
  @Field()
  name: string;

  @Column({ type: 'text' })
  @Field()
  description: string;

  @Column({ type: 'tinyint', nullable: false, default: false })
  @Field()
  actually: boolean;

  @OneToMany(
    () => GroupDiscipline,
    (groupsDisciplines) => groupsDisciplines.discipline,
  )
  @Field((type) => [GroupDiscipline], { nullable: true })
  groupsDisciplines?: GroupDiscipline[];
}
