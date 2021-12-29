import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DisciplineLecturers } from 'src/discipline-lecturers/entities/discipline-lecturers.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('lecturers')
export class Lecturers {
  @PrimaryGeneratedColumn({ name: 'id' })
  @Field((type) => Int)
  id: number;

  @Column({ type: 'varchar', name: 'shortName', nullable: false })
  @Field()
  shortName: string;

  @Column({ type: 'tinytext', name: 'fullName' })
  @Field()
  fullName: string;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Relationships

  @OneToMany(
    () => DisciplineLecturers,
    (disciplineLecturers) => disciplineLecturers.lecturers,
  )
  // @Field((type) => [DisciplineLecturers])
  disciplineLecturers?: DisciplineLecturers[];
}
