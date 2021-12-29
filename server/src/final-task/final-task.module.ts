import { Module } from '@nestjs/common';
import { FinalTaskService } from './final-task.service';
import { FinalTaskResolver } from './final-task.resolver';
import { FinalTask } from './entities/final-task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FinalTask])],
  providers: [FinalTaskResolver, FinalTaskService],
  exports: [FinalTaskService],
})
export class FinalTaskModule {}
