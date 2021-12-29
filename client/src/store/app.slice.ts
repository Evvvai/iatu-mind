import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { AppState, Group, Period, SearchBar, Location } from '@types'
import { DisciplineSection } from '../types'

import { GET_ALL_GROUPS, GET_ALL_PERIODS } from '../graphql/queries'
import { AUTH } from '../graphql/mutation'
import { setUserSetting } from './user.slice'
import { apolloClient } from '../graphql/index'

import getJwtToken from '../utils/getJwtToken'
import { setActiveSection } from './discipline.slice'
import getKeyValue from '../utils/getKeyValue'

const initialState: AppState = {
  isLoad: false,
  isAsideOpen: false,
  isGroupSelectorOpen: false,
  isEdit: false,

  groups: [],
  groupNow: {} as Group,

  periods: [],
  periodNow: {} as Period,

  error: {
    info: null,
    isActive: false,
  },

  location: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appInit: (state) => {
      state.isLoad = true
    },
    error: (state, { payload }: PayloadAction<{ info: any; isActive: boolean }>) => {
      state.error = payload
    },
    openAside: (state) => {
      state.isAsideOpen = true
    },
    closeAside: (state) => {
      state.isAsideOpen = false
    },
    openGroupSelector: (state) => {
      state.isGroupSelectorOpen = true
    },
    closeGroupSelector: (state) => {
      state.isGroupSelectorOpen = false
    },
    getAllGroups: (state, { payload }: PayloadAction<Group[]>) => {
      state.groups = payload
    },
    setGroup: (state, { payload }: PayloadAction<Group>) => {
      state.groupNow = payload
    },
    getAllPeriods: (state, { payload }: PayloadAction<Period[]>) => {
      state.periods = payload
    },
    setPeriod: (state, { payload }: PayloadAction<Period>) => {
      state.periodNow = payload
    },
    setLocation: (state, { payload }: PayloadAction<Location[]>) => {
      state.location = payload
    },
    enableEditMode: (state) => {
      state.isEdit = true
    },
    disableEditMode: (state) => {
      state.isEdit = false
    },
  },
})

export const {
  appInit,
  openAside,
  closeAside,
  openGroupSelector,
  closeGroupSelector,
  getAllGroups,
  setGroup,
  getAllPeriods,
  setPeriod,
  error,
  setLocation,
  enableEditMode,
  disableEditMode,
} = appSlice.actions
export default appSlice.reducer

// Action
export function initApp() {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: AUTH,
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })
        .then(({ data }) => {
          dispatch(setUserSetting(data.auth.user))

          data.auth.user?.role === 'admin' && localStorage.getItem('editMode') == '1'
            ? dispatch(enableEditMode())
            : dispatch(disableEditMode())
        })
        .catch((error) => {
          console.log('error', error)
          localStorage.removeItem('jwt')
        })

      const { data } = await apolloClient.query({
        query: GET_ALL_GROUPS,
      })

      let groups = [...data.groups]

      groups.sort((x: Group, y: Group) => {
        const xP = x.name?.split('-')
        const yP = y.name?.split('-')

        if (xP[1] === undefined || yP[1] === undefined) return 0
        return xP[1] > yP[1] ? 1 : -1
      })

      const group = parseInt(localStorage.getItem('groupNow') || '65')
      const period = parseInt(localStorage.getItem('periodNow') || '1')

      dispatch(setGroup(groups.find((x: any) => x.id === group)))
      dispatch(getAllGroups(groups))
      const periods = await apolloClient.query({
        query: GET_ALL_PERIODS,
      })

      dispatch(setPeriod(periods.data.periods.find((x: any) => x.id === period)))
      dispatch(getAllPeriods(periods.data.periods))

      dispatch(
        setActiveSection(
          getKeyValue(DisciplineSection)(
            (Object.keys(DisciplineSection) as Array<keyof typeof DisciplineSection>).find((key: any) => {
              return key === localStorage.getItem('activeSection')
            }) || DisciplineSection.OVERVIEW
          )
        )
      )
    } catch (e) {
      console.log(e, 'initApp')
    } finally {
      dispatch(appInit())
      console.log(
        `




          ╭━━┳━━━┳━━━━┳╮╱╭╮╭━╮╭━┳━━┳━╮╱╭┳━━━╮
          ╰┫┣┫╭━╮┃╭╮╭╮┃┃╱┃┃┃┃╰╯┃┣┫┣┫┃╰╮┃┣╮╭╮┃
          ╱┃┃┃┃╱┃┣╯┃┃╰┫┃╱┃┃┃╭╮╭╮┃┃┃┃╭╮╰╯┃┃┃┃┃
          ╱┃┃┃╰━╯┃╱┃┃╱┃┃╱┃┃┃┃┃┃┃┃┃┃┃┃╰╮┃┃┃┃┃┃
          ╭┫┣┫╭━╮┃╱┃┃╱┃╰━╯┃┃┃┃┃┃┣┫┣┫┃╱┃┃┣╯╰╯┃
          ╰━━┻╯╱╰╯╱╰╯╱╰━━━╯╰╯╰╯╰┻━━┻╯╱╰━┻━━━╯





        `
      )
    }
  }
}

export function changeGroup(group: Group) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      localStorage.setItem('groupNow', group.id.toString())
      dispatch(setGroup(group))
    } catch (e) {
      console.log(e, 'changeGroup')
    } finally {
    }
  }
}

export function changePeriod(period: Period) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      localStorage.setItem('periodNow', period.id.toString())
      dispatch(setPeriod(period))
    } catch (e) {
      console.log(e, 'changePeriod')
    } finally {
    }
  }
}

export function requestSearchBar(searchBar: SearchBar) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
    } catch (e) {
      console.log(e, 'requestSearchBar')
    } finally {
    }
  }
}

export function setError(e: any) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(error({ isActive: true, info: e }))
    } catch (e) {
      console.log(e, 'setError')
    } finally {
    }
  }
}

export function clearError() {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(error({ isActive: false, info: null }))
    } catch (e) {
      console.log(e, 'clearError')
    } finally {
    }
  }
}

export function changeLocation(location: Location[]) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(setLocation(location))
    } catch (e) {
      console.log(e, 'setLocation')
    } finally {
    }
  }
}

export function switchEditMode(mode: boolean) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      localStorage.setItem('editMode', mode ? '0' : '1')
      mode ? dispatch(disableEditMode()) : dispatch(enableEditMode())
    } catch (e) {
      console.log(e, 'switchEditMode')
    } finally {
    }
  }
}
