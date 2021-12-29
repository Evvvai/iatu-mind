import './ScheduleItem.scss'
import { FC, Fragment, useMemo, useState } from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'
import loc from 'dayjs/locale/ru'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as Ticket } from '../../../utils/img/ticket.svg'
import { ReactComponent as Edit } from '../../../utils/img/edit.svg'

import ScheduleTicket from '../ScheduleTicket/ScheduleTicket'
import SchedulePair from '../SchedulePair/SchedulePair'

// Utils
import uniquePair from '../../../utils/uniquePair'
import fixDayName from '../../../utils/fixDayName'
import { Schedule } from '../../../types'

// Custom hooks
import { useSchedule } from '../../../hook/useSchedule'
import getKeyValue from '../../../utils/getKeyValue'

// Interface
interface Props {
  schedule: Schedule[]
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ScheduleItem: FC<Props> = (props) => {
  const { tickets } = useSchedule()

  const [ticketShow, setTicketShow] = useState<boolean>(false)
  const [extend, setExtend] = useState<boolean>(false)

  const date = useMemo(() => props.schedule[0]?.date, [props.schedule])
  const optionsPair = useMemo(() => uniquePair(props.schedule), [props.schedule])

  return (
    <Fragment>
      <div
        onClick={(e) => setExtend(!extend)}
        className={cn(
          'schedule-item',
          { active: dayjs(Date.now()).date() === dayjs(date).date() && date },
          { extend: extend }
        )}
      >
        <div className="schedule-header">
          <div className="schedule-header__dayname">
            {date ? fixDayName(dayjs(date).locale(loc).format('dddd')) : '---'}
          </div>
          <div className="schedule-header__date">{date ? dayjs(date).locale(loc).format('D MMMM') : '---'}</div>
          <div
            className={cn(
              'schedule-header__ticket',
              { active: tickets.find((x) => new Date(x?.dateAdd).toDateString() === new Date(date).toDateString()) },
              { visible: extend }
            )}
          >
            <Ticket
              onClick={(e: any) => {
                if (ticketShow) return
                setTicketShow(true)
                e.stopPropagation()
              }}
            />
          </div>
        </div>
        {optionsPair.map((x, key) => {
          const pair = props.schedule.filter((y, key) => {
            return y.timeStart === x
          })
          return (
            <div key={key}>
              <hr className="schedule-pair__hr h" />
              <SchedulePair extend={extend} index={pairNumber.get(pair[0]?.timeStart) || 0} schedule={pair} />
            </div>
          )
        })}
      </div>
      {ticketShow && <ScheduleTicket date={date} setShow={setTicketShow} />}
    </Fragment>
  )
}

export default ScheduleItem

export const pairNumber = new Map([
  ['08:30:00', 1],
  ['10:00:00', 2],
  ['11:50:00', 3],
  ['13:20:00', 4],
  ['14:45:00', 5],
  ['16:10:00', 6],
  ['17:35:00', 7],
])
