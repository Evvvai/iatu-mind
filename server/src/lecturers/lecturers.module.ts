import { Module } from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { LecturersResolver } from './lecturers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturers } from './entities/lecturers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecturers])],
  providers: [LecturersResolver, LecturersService],
  exports: [LecturersService],
})
export class LecturersModule {}
