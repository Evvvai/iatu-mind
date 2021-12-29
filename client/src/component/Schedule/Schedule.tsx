import './Schedule.scss'
import React, { FC, useEffect } from 'react'

import dayjs from 'dayjs'
import loc from 'dayjs/locale/ru'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import ScheduleItem from './ScheduleItem/ScheduleItem'
import ScheduleTime from './ScheduleTime/ScheduleTime'

import { ReactComponent as Arrow } from '../../utils/img/arrow_left.svg'
import axios from 'axios'

// Redux
import { useDispatch } from 'react-redux'
import { useApplication } from '../../hook/useApplication'
import { useSchedule } from '../../hook/useSchedule'
import Loading from '../Loading/Loading'
import { Schedule as ScheduleT } from '../../types'
import fixDayName from '../../utils/fixDayName'
import convertDate, { convertDateTime } from '../../utils/convertDate'

// Interface
interface Props {}

const day = [1, 2, 3, 4, 5, 6]

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Schedule: FC<Props> = (props) => {
  const { groupNow } = useApplication()
  const { isLoading, daySkip, schedule, getScheduleWeek, setDaySkip } = useSchedule()

  const schedulePair = (schedule: ScheduleT[], day: number): ScheduleT[] =>
    schedule.filter((x) => dayjs(x?.date).day() === day)

  const handleOnClickSkip = (ammount: number) => {
    setDaySkip(daySkip + ammount)
  }

  useEffect(() => {
    getScheduleWeek(groupNow, dayjs(new Date()).add(daySkip, 'day').format('YYYY.MM.DD'))
  }, [groupNow, daySkip])

  if (!isLoading) return <Loading />

  return (
    <section className="schedule unselectable">
      <div className="schedule-date">
        <div onClick={(e) => handleOnClickSkip(-7)} className="schedule-arrow-pagination">
          <Arrow className="schedule-arrow-pagination__icon back" />
          <div className="schedule-arrow-pagination__text">Предыдущая неделя</div>
        </div>
        <div className="schedule-date__header">
          {dayjs(schedule[0]?.date).locale(loc).format('D MMMM')} -{' '}
          {dayjs(schedule[schedule.length - 1]?.date)
            .locale(loc)
            .format('D MMMM')}
        </div>
        <div onClick={(e) => handleOnClickSkip(7)} className="schedule-arrow-pagination">
          <div className="schedule-arrow-pagination__text">Следующая неделя</div>
          <Arrow className="schedule-arrow-pagination__icon next" />
        </div>
      </div>
      <div className="schedule-today">Сегодня {fixDayName(dayjs(Date.now()).locale(loc).format('dddd D MMMM'))}</div>
      <ScheduleTime />
      <div className="schedule-content">
        {day.map((val, key) => {
          return <ScheduleItem key={key} schedule={schedulePair(schedule, val)} />
        })}
      </div>
    </section>
  )
}

export default Schedule
