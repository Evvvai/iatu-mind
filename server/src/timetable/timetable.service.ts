import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ScheduleTicketsService } from '../schedule-tickets/schedule-tickets.service';

@Injectable()
export class TimetableService {
  constructor(
    @InjectConnection('iatu')
    private connection: Connection,
    private scheduleTicketsService: ScheduleTicketsService,
  ) {}

  async timetableDay(group: string, day: string) {
    const schedule = await this.connection.query(
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
        FROM timetable AS t
        WHERE class = '${group}' AND
        t.date <= (SELECT DATE_ADD(DATE('${day}') , INTERVAL + 6 - WEEKDAY('${day}') DAY)) AND
        t.date >= (SELECT DATE_ADD(DATE('${day}' ) , INTERVAL -WEEKDAY('${day}') DAY));
      `,
    );

    return schedule;
  }

  async timetableWeek(group: string, day: string) {
    const schedule = await this.connection.query(
      `
       (
        SELECT  d.d date,
                t.timeStart,
                t.timeStop,
                t.discipline,
                t.cabinet,
                t.teacher,
                t.type,
                t.subgroup
            
        FROM (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 0 DAY) d) d
        LEFT JOIN 
        (
        SELECT  (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 0 DAY)) d,
                t.timeStart, 
                t.timeStop, 
                t.discipline, 
                t.cabinet, 
                t.teacher, 
                t.type, 
                t.subgroup 
                
        FROM timetable AS t
        WHERE class = '${group}' AND
        t.date = (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 0 DAY))
        ) t ON t.d = d.d
      )
      UNION 
      (
        SELECT  d.d date,
                t.timeStart,
                t.timeStop,
                t.discipline,
                t.cabinet,
                t.teacher,
                t.type,
                t.subgroup
            
        FROM (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 1 DAY) d) d
        LEFT JOIN 
        (
        SELECT  (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 1 DAY)) d,
                t.timeStart, 
                t.timeStop, 
                t.discipline, 
                t.cabinet, 
                t.teacher, 
                t.type, 
                t.subgroup 
                
        FROM timetable AS t
        WHERE class = '${group}' AND
        t.date = (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 1  DAY))
        ) t ON t.d = d.d
      )
      UNION 
      (
        SELECT  d.d date,
                t.timeStart,
                t.timeStop,
                t.discipline,
                t.cabinet,
                t.teacher,
                t.type,
                t.subgroup
            
        FROM (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 2 DAY) d) d
        LEFT JOIN 
        (
        SELECT  (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 2 DAY)) d,
                t.timeStart, 
                t.timeStop, 
                t.discipline, 
                t.cabinet, 
                t.teacher, 
                t.type, 
                t.subgroup 
                
        FROM timetable AS t
        WHERE class = '${group}' AND
        t.date = (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 2 DAY))
        ) t ON t.d = d.d
      )
      UNION 
      (
        SELECT  d.d date,
                t.timeStart,
                t.timeStop,
                t.discipline,
                t.cabinet,
                t.teacher,
                t.type,
                t.subgroup
            
        FROM (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 3 DAY) d) d
        LEFT JOIN 
        (
        SELECT  (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 3 DAY)) d,
                t.timeStart, 
                t.timeStop, 
                t.discipline, 
                t.cabinet, 
                t.teacher, 
                t.type, 
                t.subgroup 
                
        FROM timetable AS t
        WHERE class = '${group}' AND
        t.date = (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 3 DAY))
        ) t ON t.d = d.d
      )
      UNION 
      (
        SELECT  d.d date,
                t.timeStart,
                t.timeStop,
                t.discipline,
                t.cabinet,
                t.teacher,
                t.type,
                t.subgroup
                
        FROM (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 4 DAY) d) d
        LEFT JOIN 
        (
        SELECT  (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 4 DAY)) d,
                t.timeStart, 
                t.timeStop, 
                t.discipline, 
                t.cabinet, 
                t.teacher, 
                t.type, 
                t.subgroup 
                
        FROM timetable AS t
        WHERE class = '${group}' AND
        t.date = (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 4 DAY))
        ) t ON t.d = d.d
      )
      UNION 
      (
        SELECT  d.d date,
                t.timeStart,
                t.timeStop,
                t.discipline,
                t.cabinet,
                t.teacher,
                t.type,
                t.subgroup
            
        FROM (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 5 DAY) d) d
        LEFT JOIN 
        (
        SELECT  (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 5 DAY)) d,
                t.timeStart, 
                t.timeStop, 
                t.discipline, 
                t.cabinet, 
                t.teacher, 
                t.type, 
                t.subgroup 
                
        FROM timetable AS t
        WHERE class = '${group}' AND
        t.date = (SELECT DATE_ADD(DATE('${day}') , INTERVAL - WEEKDAY('${day}') + 5 DAY))
        ) t ON t.d = d.d
      )
      `,
    );

    // Cringe
    // const groupId = await this.connection.query(
    //   `
    //   SELECT go.ID
    //   FROM groups_original go
    //   WHERE go.Naimenovanie = '${group}';
    //   `,
    // );

    // const tickets = await this.scheduleTicketsService.findBetween({
    //   dateFirst: schedule[0].date,
    //   dateLast: schedule[schedule.length - 1].date,
    //   groupId: +groupId[0].ID,
    // });

    // const scheduleTickets = schedule.map((val, key) => {
    //   val.tickets = tickets.filter((x) => {
    //     if (
    //       new Date(x.dateAdd).toDateString() ==
    //       new Date(val.date).toDateString()
    //     ) {
    //       return x;
    //     }
    //   });

    //   return val;
    // });

    // console.log(scheduleTickets);

    return schedule;
  }

  async nextPair(group: string) {
    const schedule = await this.connection.query(
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
            
      FROM timetable AS t
      WHERE t.class = '${group}'
      AND
      t.date = 	(SELECT t.date
                FROM timetable AS t
                WHERE t.class = '${group}' AND
                UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStart), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                LIMIT 1)
      AND
      t.timeStart = (SELECT t.timeStart
                    FROM timetable AS t
                    WHERE t.class = '${group}' AND
                    UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStart), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                    LIMIT 1);
      `,
    );

    return schedule;
  }

  async nowPair(group: string) {
    const schedule = await this.connection.query(
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
              
      FROM timetable AS t
      WHERE t.class = '${group}'
      AND
      t.date = 	(SELECT t.date
                  FROM timetable AS t
                  WHERE t.class = '${group}' AND
                  UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStop), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                  LIMIT 1)
      AND
      t.timeStop = (SELECT t.timeStop
                    FROM timetable AS t
                    WHERE t.class = '${group}' AND
                    UNIX_TIMESTAMP(STR_TO_DATE(CONCAT(t.date, ' ', t.timeStop), '%Y-%m-%d %H:%i:%s')) > (SELECT UNIX_TIMESTAMP(NOW()))
                    LIMIT 1);
      `,
    );

    return schedule;
  }
}
