import { Module } from '@nestjs/common';
import { TaskCompletesService } from './task-completes.service';
import { TaskCompletesResolver } from './task-completes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskComplete } from './entities/task-complete.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskComplete])],
  providers: [TaskCompletesResolver, TaskCompletesService],
  exports: [TaskCompletesService],
})
export class TaskCompletesModule {}
