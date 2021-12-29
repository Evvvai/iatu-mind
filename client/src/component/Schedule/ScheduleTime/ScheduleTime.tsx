import './ScheduleTime.scss'
import { FC, useEffect, useState, Fragment } from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import SchedulePair from '../SchedulePair/SchedulePair'

// Custom hook
import { useSchedule } from '../../../hook/useSchedule'
import { useApplication } from '../../../hook/useApplication'
import { Schedule } from '../../../types'

// Utils
import { getTimeFromSeconds } from '../../../utils/convertDate' // Useless cuz i use dayjs )0))
import { pairNumber } from '../ScheduleItem/ScheduleItem'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ScheduleTime: FC<Props> = (props) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [extendNext, setExtendNext] = useState<boolean>(false)
  const [extendNow, setExtendNow] = useState<boolean>(false)

  const { getNextPair, nextPair, nowPair } = useSchedule()
  const { groupNow } = useApplication()

  const validateNowPair = (pair: Schedule): boolean => {
    const timeNow = dayjs(new Date()).format('HH:mm:ss')

    if (pair === undefined) return false
    return pair.timeStop > timeNow && timeNow < pair.timeStop && dayjs(new Date()).format('YYYY-MM-DD') == pair.date
  }

  useEffect(() => {
    getNextPair(groupNow)
    setSeconds(0)
  }, [groupNow])

  useEffect(() => {
    if (nextPair[0]?.timeWait !== undefined && nextPair[0].timeWait - seconds <= 0) {
      setSeconds(0)
      getNextPair(groupNow)
    }

    setTimeout(() => setSeconds(seconds + 1), 1000)
  }, [seconds])

  return (
    <div className="schedule-time">
      <hr className="schedule-time__hr" />
      <div onClick={(e) => setExtendNext(!extendNext)} className="schedule-time__header">
        <span className="schedule-time-span base">До следующей пары </span>
        <span className="schedule-time-span darker time">
          {nextPair[0]?.timeWait
            ? dayjs.duration((nextPair[0].timeWait - seconds) * 1000).format('HH:mm:ss')
            : 'неизвестно'}
        </span>
      </div>
      <div className={cn('schedule-next', { extend: extendNext })}>
        {nextPair[0]?.timeWait !== undefined && (
          <SchedulePair index={pairNumber.get(nowPair[0]?.timeStart) || 0} extend={true} schedule={nextPair} />
        )}
      </div>
      {validateNowPair(nowPair[0]) && (
        <Fragment>
          <div onClick={(e) => setExtendNow(!extendNow)} className="schedule-time__header">
            <span className="schedule-time-span base">До окончания пары </span>
            <span className="schedule-time-span darker time">
              {nowPair[0]?.timeWait ? dayjs.duration((nowPair[0].timeWait - seconds) * 1000).format('HH:mm:ss') : ''}
            </span>
          </div>
          <div className={cn('schedule-next', { extend: extendNow })}>
            {nowPair[0]?.timeWait !== undefined && (
              <SchedulePair index={pairNumber.get(nowPair[0]?.timeStart) || 0} extend={true} schedule={nowPair} />
            )}
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default ScheduleTime
