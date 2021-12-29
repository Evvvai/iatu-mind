import { forwardRef, Module } from '@nestjs/common';
import { GroupsDisciplinesService } from './groups-disciplines.service';
import { GroupsDisciplinesResolver } from './groups-disciplines.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupDiscipline } from './entities/group-discipline.entity';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { FinalTaskModule } from 'src/final-task/final-task.module';
import { DisciplineLecturersModule } from 'src/discipline-lecturers/discipline-lecturers.module';
import { DisciplineTasksModule } from 'src/discipline-tasks/discipline-tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupDiscipline]),
    forwardRef(() => DisciplinesModule),
    FinalTaskModule,
    DisciplineLecturersModule,
    DisciplineTasksModule,
  ],
  providers: [GroupsDisciplinesResolver, GroupsDisciplinesService],
  exports: [GroupsDisciplinesService],
})
export class GroupsDisciplinesModule {}
