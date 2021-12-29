import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Group } from './groups/entities/group.entity';
import { GroupsModule } from './groups/groups.module';
import { TYPEORM_MAIN, TYPEORM_ADDITIONAL, NODE_ENV } from '@environments';
import { CacheService, LoggingInterceptor } from './config';
import { FacultiesModule } from './faculties/faculties.module';
import { Faculty } from './faculties/entities/faculty.entity';
import { TimetableModule } from './timetable/timetable.module';
import { PeriodsModule } from './periods/periods.module';
import { Period } from './periods/entities/period.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { Discipline } from './disciplines/entities/discipline.entity';
import { GroupsDisciplinesModule } from './groups-disciplines/groups-disciplines.module';
import { GroupDiscipline } from './groups-disciplines/entities/group-discipline.entity';
import { ScheduleTicketsModule } from './schedule-tickets/schedule-tickets.module';
import { ScheduleTicket } from './schedule-tickets/entities/schedule-ticket';
import { FinalTaskModule } from './final-task/final-task.module';
import { FinalTask } from './final-task/entities/final-task.entity';
import { LecturersModule } from './lecturers/lecturers.module';
import { Lecturers } from './lecturers/entities/lecturers.entity';
import { DisciplineLecturers } from './discipline-lecturers/entities/discipline-lecturers.entity';
import { DisciplineLecturersModule } from './discipline-lecturers/discipline-lecturers.module';
import { TaskCompletesModule } from './task-completes/task-completes.module';
import { TaskComplete } from './task-completes/entities/task-complete.entity';
import { DisciplineTask } from './discipline-tasks/entities/discipline-task.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogsModule } from './logs/logs.module';
import { Log } from './logs/entities/log.entity';
import { DisciplineTasksModule } from './discipline-tasks/discipline-tasks.module';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/entities/schedule.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    TypeOrmModule.forRoot({
      ...TYPEORM_MAIN,
      synchronize: NODE_ENV === 'production' ? false : true,
      entities: [
        Group,
        Faculty,
        Period,
        User,
        Discipline,
        GroupDiscipline,
        ScheduleTicket,
        FinalTask,
        DisciplineLecturers,
        Lecturers,
        DisciplineTask,
        TaskComplete,
        Schedule,
        Log,
      ],
    }),
    TypeOrmModule.forRoot({
      ...TYPEORM_ADDITIONAL,
      name: 'iatu',
      synchronize: false,
    }),
    GroupsModule,
    FacultiesModule,
    TimetableModule,
    PeriodsModule,
    UsersModule,
    AuthModule,
    DisciplinesModule,
    GroupsDisciplinesModule,
    ScheduleTicketsModule,
    FinalTaskModule,
    DisciplineLecturersModule,
    LecturersModule,
    DisciplineTasksModule,
    TaskCompletesModule,
    LogsModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
