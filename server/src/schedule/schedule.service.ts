import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupDayScheduleInput } from './dto/group-day-schedule.input';
import { GroupScheduleInput } from './dto/group-schedule.input';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule) private periodsRepository: Repository<Schedule>,
  ) {}

  async timetableDay(input: GroupDayScheduleInput) {
    const schedule = await this.periodsRepository.query(
      `
        SELECT  DAYNAME(t.date) 'dayName', 
                t.date, 
                t.timeStart, 
                t.timeStop, 
                t.discipline, 
                t.cabinet, 
                t.teacher, 
                t.type, 
                t.subgroup 
        FROM schedule AS t
        WHERE class = '${input.group}' AND
        t.date <= (SELECT DATE_ADD(DATE('${input.day}') , INTERVAL + 6 - WEEKDAY('${input.day}') DAY)) AND
        t.date >= (SELECT DATE_ADD(DATE('${input.day}' ) , INTERVAL -WEEKDAY('${input.day}') DAY));
      `,
    );

    return schedule;
  }

  async timetableWeek(input: GroupDayScheduleInput) {
    const schedule = await this.periodsRepository.query(
      `
      WITH recursive rec (d, lv) AS (
        SELECT DATE_ADD(DATE('${input.day}') , INTERVAL - WEEKDAY('${input.day}') + 0 DAY) d, 1 lv FROM DUAL
        
          UNION ALL 
        
        SELECT DATE_ADD(DATE('${input.day}') , INTERVAL - WEEKDAY('${input.day}') + lv DAY) d, lv+1 lv 
        FROM rec 
        WHERE lv != 7
      )

      SELECT * 
      FROM rec
      LEFT JOIN 
      (
      SELECT  TIME_TO_SEC(TIMEDIFF(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStart), '%Y-%m-%d %H:%i:%s'),NOW())) timeWait,
              t.date,
              t.timeStart,
              t.timeStop,
              t.discipline,
              t.cabinet,
              t.teacher,
              t.type,
              t.subgroup
            
      FROM schedule AS t
      WHERE t.class = '${input.group}'
      ) s ON s.date = rec.d
    `,
    );

    return schedule;
  }

  async nextPair(input: GroupScheduleInput) {
    const schedule = await this.periodsRepository.query(
      `
      SELECT  TIME_TO_SEC(TIMEDIFF(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStart), '%Y-%m-%d %H:%i:%s'),NOW())) timeWait,
      t.id,
              DATE(t.date) date,
              t.timeStart,
              t.timeStop,
              t.discipline,
              t.cabinet,
              t.teacher,
              t.type,
              t.subgroup
            
      FROM schedule AS t
      WHERE t.class = '${input.group}'
      AND
      t.date = 	(SELECT t.date
                FROM schedule AS t
                WHERE t.class = '${input.group}' AND
                UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStart), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                LIMIT 1)
      AND
      t.timeStart = (SELECT t.timeStart
                    FROM schedule AS t
                    WHERE t.class = '${input.group}' AND
                    UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStart), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                    LIMIT 1);
      `,
    );

    return schedule;
  }

  async nowPair(input: GroupScheduleInput) {
    const schedule = await this.periodsRepository.query(
      `
      SELECT TIME_TO_SEC(TIMEDIFF(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStop), '%Y-%m-%d %H:%i:%s'),NOW())) timeWait,
            t.date,
            t.timeStart,
            t.timeStop,
            t.discipline,
            t.cabinet,
            t.teacher,
            t.type,
            t.subgroup
              
      FROM schedule AS t
      WHERE t.class = '${input.group}'
      AND
      t.date = 	(SELECT t.date
                  FROM schedule AS t
                  WHERE t.class = '${input.group}' AND
                  UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStop), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                  LIMIT 1)
      AND
      t.timeStop = (SELECT t.timeStop
                    FROM schedule AS t
                    WHERE t.class = '${input.group}' AND
                    UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStop), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                    LIMIT 1);
      `,
    );

    return schedule;
  }
}
