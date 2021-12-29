import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { FacultiesModule } from '../faculties/faculties.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), FacultiesModule],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
