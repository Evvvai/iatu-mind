import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesResolver } from './faculties.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  providers: [FacultiesResolver, FacultiesService],
  exports: [FacultiesService],
})
export class FacultiesModule {}
