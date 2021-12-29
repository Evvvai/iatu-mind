// import { useAction } from './useAction'
import { useTypesSelector } from './useTypesSelector'

import * as ActionCreators from '../store/schedule.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

// Application Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Selector
export const useSchedule = () => {
  const dispatch = useDispatch()
  const { createTicket, getScheduleWeek, getScheduleDay, setDaySkip, getNextPair } = bindActionCreators(
    ActionCreators,
    dispatch
  )

  const { isLoading, daySkip, nextPair, nowPair, schedule, tickets, error } = useTypesSelector(
    (state) => state.scheduleState
  )
  return {
    isLoading,
    daySkip,
    nextPair,
    nowPair,
    schedule,
    tickets,
    error,
    getScheduleWeek,
    getScheduleDay,
    setDaySkip,
    getNextPair,
    createTicket,
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
