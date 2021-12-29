import axios from 'axios'
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { Group, Schedule, ScheduleState, Ticket } from '../types'
import { apolloClient } from '../graphql'
import { CREATE_SCHEDULE_TICKET } from '../graphql/mutation'
import { GET_TICKETS_WEEK_BETWEEN } from '../graphql/queries'
import dayjs from 'dayjs'

const initialState: ScheduleState = {
  isLoading: false,
  error: null,

  daySkip: 0,

  nowPair: [],
  nextPair: [],

  schedule: [],
  tickets: [],
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    reqeustShedule: (state) => {
      state.isLoading = false
      state.schedule = []
    },
    receiveShedule: (state, { payload }: PayloadAction<{ s: Schedule[]; t: Ticket[] }>) => {
      state.isLoading = true
      state.schedule = payload.s
      state.tickets = payload.t
    },
    setDaySkip: (state, { payload }: PayloadAction<number>) => {
      state.daySkip = payload
    },
    setNextPair: (state, { payload }: PayloadAction<Schedule[]>) => {
      state.nextPair = payload
    },
    setNowPair: (state, { payload }: PayloadAction<Schedule[]>) => {
      state.nowPair = payload
    },
  },
})

export const { reqeustShedule, receiveShedule, setDaySkip, setNextPair, setNowPair } = scheduleSlice.actions
export default scheduleSlice.reducer

// Action
export function getScheduleWeek(group: Group, day: string) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(reqeustShedule())

      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/timetable/week`, {
        params: {
          group: group.name,
          day,
        },
      })

      const tickets = await apolloClient.query({
        query: GET_TICKETS_WEEK_BETWEEN,
        variables: {
          groupId: group.id,
          dateFirst: data[0].date,
          dateLast: data[data.length - 1].date,
        },
      })

      dispatch(receiveShedule({ s: data, t: tickets.data.scheduleTicketsWeek }))
    } catch (e) {
      console.log('getScheduleWeek', e)
    } finally {
    }
  }
}

export function getScheduleDay(group: Group, day: string) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(reqeustShedule())
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/timetable/day`, {
        params: {
          group: group.name,
          day,
        },
      })
      dispatch(receiveShedule(data))
    } catch (e) {
      console.log('getScheduleDay', e)
    } finally {
    }
  }
}

export function getNextPair(group: Group) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      let nextUrl = `${process.env.REACT_APP_BACKEND_URL}/api/timetable/next`
      let nowUrl = `${process.env.REACT_APP_BACKEND_URL}/api/timetable/now`

      const requestNext = axios.get<any[]>(nextUrl, {
        params: {
          group: group.name,
        },
      })

      const requestNow = axios.get<any[]>(nowUrl, {
        params: {
          group: group.name,
        },
      })

      axios.all([requestNext, requestNow]).then(
        axios.spread((...responses) => {
          let nextPair = responses[0]?.data
          let nowPair = responses[1]?.data

          if (nowPair[0]?.date) nowPair[0].date = dayjs(nowPair[0]?.date).format('YYYY-MM-DD')
          if (nextPair[0]?.date) nextPair[0].date = dayjs(nextPair[0]?.date).format('YYYY-MM-DD')

          // if (nextPair[0]?.date) {
          //   // const dateNow = dayjs(new Date()).format('YYYY-MM-DD')
          //   // const dateNext = dayjs(nextPair[0]?.date).format('YYYY-MM-DD')

          //   nextPair[0].date = dayjs(nextPair[0]?.date).format('YYYY-MM-DD')
          //   // nextPair[0].timeWait = +nextPair[0].timeWait + +dayjs(dateNext).diff(dateNow, 'seconds')
          // }

          dispatch(setNextPair(nextPair))
          dispatch(setNowPair(nowPair))

          return
        })
      )
    } catch (e) {
      console.log('setNextPair', e)
    } finally {
    }
  }
}

export function createTicket(group: Group, date: Date, text: string) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      const token = localStorage.getItem('jwt')
      apolloClient
        .mutate({
          mutation: CREATE_SCHEDULE_TICKET,
          variables: {
            groupId: group.id,
            dateAdd: date,
            text: text,
          },
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : '',
            },
          },
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (e) {
      console.log('createTicket', e)
    } finally {
    }
  }
}
