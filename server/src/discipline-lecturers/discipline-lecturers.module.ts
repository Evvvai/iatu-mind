import { Module } from '@nestjs/common';
import { DisciplineLecturersService } from './discipline-lecturers.service';
import { DisciplineLecturersResolver } from './discipline-lecturers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineLecturers } from './entities/discipline-lecturers.entity';
import { LecturersModule } from 'src/lecturers/lecturers.module';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineLecturers]), LecturersModule],
  providers: [DisciplineLecturersResolver, DisciplineLecturersService],
  exports: [DisciplineLecturersService],
})
export class DisciplineLecturersModule {}
