import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'faculties' })
export class Faculty {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @OneToMany(() => Group, (groups) => groups.faculty)
  @Field((type) => [Group], { nullable: true })
  groups?: Group[];
}
