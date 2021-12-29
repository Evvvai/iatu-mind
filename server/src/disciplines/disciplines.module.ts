import { forwardRef, Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesResolver } from './disciplines.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './entities/discipline.entity';
import { GroupsDisciplinesModule } from '../groups-disciplines/groups-disciplines.module';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline]), GroupsDisciplinesModule],
  providers: [DisciplinesResolver, DisciplinesService],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
