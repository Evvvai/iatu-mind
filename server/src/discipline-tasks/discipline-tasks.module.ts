import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCompletesModule } from 'src/task-completes/task-completes.module';
import { DisciplineTasksResolver } from './discipline-tasks.resolver';
import { DisciplineTasksService } from './discipline-tasks.service';
import { DisciplineTask } from './entities/discipline-task.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DisciplineTask]),
    TaskCompletesModule,
    UsersModule,
  ],
  providers: [DisciplineTasksResolver, DisciplineTasksService],
  exports: [DisciplineTasksService],
})
export class DisciplineTasksModule {}
