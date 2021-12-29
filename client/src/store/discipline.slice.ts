import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { apolloClient } from '../graphql/index'
import {
  DisciplineExtended,
  DisciplineLecturer,
  DisciplineSection,
  DisciplineState,
  Group,
  GroupDisciplinesList,
  Lecturer,
  PairType,
  Period,
  DisciplineTask,
  TaskStatus,
  DisciplineTaskStatus,
} from '../types'

import getJwtToken from '../utils/getJwtToken'

import {
  GET_EXIST_DISCIPLINES,
  GET_EXIST_DISCIPLINES_AUTH,
  GET_EXTEND_DISCIPLINES,
  GET_EXTEND_DISCIPLINES_AUTH,
} from '../graphql/queries'
import getKeyName from '../utils/getKeyName'
import {
  CREATE_GROUP_DISCIPLINE_LECTURE,
  CREATE_DISCIPLINE_TASK,
  REMOVE_GROUP_DISCIPLINE_LECTURER,
  REMOVE_DISCIPLINE_TASK,
  CREATE_TASK_COMPLETE,
  UPDATE_TASK_COMPLETE,
} from '../graphql/mutation'

const initialState: DisciplineState = {
  isDisciplineLoad: false,
  isDisciplineExtendLoad: false,
  isLoading: true,
  notFound: false,
  disciplines: [],
  disciplineExtended: {} as DisciplineExtended,
  activeSection: DisciplineSection.OVERVIEW,
}

const disciplineSlice = createSlice({
  name: 'discipline',
  initialState,
  reducers: {
    requestDisciplines: (state) => {
      state.notFound = false
      state.isLoading = true
      state.isDisciplineLoad = false
      state.disciplines = []
    },
    receiveDisciplines: (state, { payload }: PayloadAction<GroupDisciplinesList[]>) => {
      state.isLoading = false
      state.isDisciplineLoad = true
      state.isDisciplineExtendLoad = false
      state.disciplines = payload
    },
    requestDisciplinesExtend: (state) => {
      state.notFound = false
      state.isLoading = true
      state.isDisciplineExtendLoad = false
      state.disciplineExtended = {} as DisciplineExtended
    },
    receiveDisciplinesExtend: (state, { payload }: PayloadAction<DisciplineExtended>) => {
      state.isLoading = false
      state.isDisciplineExtendLoad = true
      state.disciplineExtended = payload
    },
    notFoundDisciplinesExtend: (state) => {
      state.notFound = true
      state.isDisciplineExtendLoad = true
    },
    setActiveSection: (state, { payload }: PayloadAction<DisciplineSection>) => {
      state.activeSection = payload
    },
    removeLecturer: (state, { payload }: PayloadAction<DisciplineLecturer>) => {
      const disciplineLecturer: [DisciplineLecturer] = JSON.parse(
        JSON.stringify(
          state.disciplineExtended.disciplineLecturer.filter((x) => {
            return !(x.lecturer.id == payload.lecturer.id && x.role == payload.role)
          })
        )
      )

      state.disciplineExtended.disciplineLecturer = disciplineLecturer
    },
    addLecturer: (state, { payload }: PayloadAction<DisciplineLecturer>) => {
      state.disciplineExtended.disciplineLecturer.push(payload)
    },
    addTask: (state, { payload }: PayloadAction<DisciplineTask>) => {
      state.disciplineExtended.disciplineTasks.push(payload)
    },
    removeTask: (state, { payload }: PayloadAction<DisciplineTask>) => {
      const disciplineTasks: [DisciplineTask] = JSON.parse(
        JSON.stringify(state.disciplineExtended.disciplineTasks.filter((x) => x.id != payload.id))
      )

      state.disciplineExtended.disciplineTasks = disciplineTasks
    },
    changeStatus: (state, { payload }: PayloadAction<DisciplineTaskStatus>) => {
      const disciplineTasks: [DisciplineTask] = JSON.parse(
        JSON.stringify(
          state.disciplineExtended.disciplineTasks.map((x) =>
            x.id === payload.disciplineTaskId ? { ...x, taskStatus: payload } : x
          )
        )
      )
      state.disciplineExtended.disciplineTasks = disciplineTasks
      console.log(state.disciplineExtended.disciplineTasks)
    },
  },
})

export const {
  notFoundDisciplinesExtend,
  requestDisciplines,
  receiveDisciplines,
  receiveDisciplinesExtend,
  requestDisciplinesExtend,
  setActiveSection,
  removeLecturer,
  addLecturer,
  addTask,
  removeTask,
  changeStatus,
} = disciplineSlice.actions
export default disciplineSlice.reducer

// Action
///////////////////////////////////////////////////////////////////////////////////////////////////

export function getExistDisciplines(groupNow: Group, periodNow: Period, userId?: number) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(requestDisciplines())

      const { data } = await apolloClient.query({
        query: userId ? GET_EXIST_DISCIPLINES_AUTH : GET_EXIST_DISCIPLINES,
        variables: {
          groupId: groupNow.id,
          periodId: periodNow.id,
          userId,
        },
      })

      dispatch(receiveDisciplines(data.getExistDisciplines))
    } catch (e) {
      console.log('getExistDisciplines', e)
    } finally {
    }
  }
}

export function getExtendDiscipline(groupNow: Group, periodNow: Period, disciplineId: number, userId?: number) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(requestDisciplinesExtend())

      const { data } = await apolloClient.query({
        query: userId ? GET_EXTEND_DISCIPLINES_AUTH : GET_EXTEND_DISCIPLINES,
        variables: {
          groupId: groupNow.id,
          periodId: periodNow.id,
          disciplineId: +disciplineId,
          userId,
        },
      })

      dispatch(receiveDisciplinesExtend(data.getExtendDiscipline))
    } catch (e) {
      dispatch(notFoundDisciplinesExtend())
      console.log('getExtendDiscipline', e)
    } finally {
    }
  }
}

export function changeActiveSection(section: DisciplineSection) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      localStorage.setItem('activeSection', section)
      dispatch(setActiveSection(section))
    } catch (e) {
      console.log('setActiveSection', e)
    } finally {
    }
  }
}

export function removeGroupDisciplineLucterer(lecturer: DisciplineLecturer, id: number) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(removeLecturer(lecturer))

      apolloClient
        .mutate({
          mutation: REMOVE_GROUP_DISCIPLINE_LECTURER,
          variables: {
            groupDisciplineId: id,
            lecturerId: lecturer.lecturer.id,
            role: lecturer.role,
          },
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })
        .then(({ data }) => {
          console.log('data', data)
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (e) {
      console.log('removeGroupDisciplineLucterer', e)
    } finally {
    }
  }
}

export function createGroupDisciplineLucterer(lecturer: Lecturer, role: PairType, id: number) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: CREATE_GROUP_DISCIPLINE_LECTURE,
          variables: {
            groupDisciplineId: id,
            lecturerId: lecturer.id,
            role: role,
          },
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })
        .then(({ data }) => {
          dispatch(addLecturer(data.createDisciplineLecturer))
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (e) {
      console.log('createGroupDisciplineLucterer', e)
    } finally {
    }
  }
}

export function createGroupDisciplineTask(
  groupDisciplineId: number,
  description: string,
  title: string,
  authorId: number,
  index: number
) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: CREATE_DISCIPLINE_TASK,
          variables: {
            groupDisciplineId,
            title,
            description,
            authorId,
            index,
          },
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })
        .then(({ data }) => {
          dispatch(addTask(data.createDisciplineTask))
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (e) {
      console.log('createGroupDisciplineLucterer', e)
    } finally {
    }
  }
}

export function removeGroupDisciplineTask(id: number) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: REMOVE_DISCIPLINE_TASK,
          variables: {
            id,
          },
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })
        .then(({ data }) => {
          dispatch(removeTask(data.removeDisciplineTask))
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (e) {
      console.log('removeGroupDisciplineTask', e)
    } finally {
    }
  }
}

export function createTaskStatus(status: TaskStatus, userId: number, disciplineTaskId: number) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: CREATE_TASK_COMPLETE,
          variables: {
            status: getKeyName(TaskStatus)(status),
            userId,
            disciplineTaskId,
          },
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })
        .then(({ data }) => {
          dispatch(changeStatus(data.createTaskComplete))
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (e) {
      console.log('createTaskStatus', e)
    } finally {
    }
  }
}

export function updateTaskStatus(status: TaskStatus, id: number) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: UPDATE_TASK_COMPLETE,
          variables: {
            status: getKeyName(TaskStatus)(status),
            id,
          },
          context: {
            headers: {
              authorization: getJwtToken(),
            },
          },
        })
        .then(({ data }) => {
          dispatch(changeStatus(data.updateTaskComplete))
        })
        .catch((error) => {
          console.log('error', error)
        })
    } catch (e) {
      console.log('updateTaskStatus', e)
    } finally {
    }
  }
}
