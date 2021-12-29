import { useTypesSelector } from './useTypesSelector'

import * as ActionCreators from '../store/discipline.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

// Discipline Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Selector
export const useDiscipline = () => {
  const dispatch = useDispatch()
  const {
    removeGroupDisciplineLucterer,
    createGroupDisciplineLucterer,
    removeGroupDisciplineTask,
    createGroupDisciplineTask,
    getExistDisciplines,
    getExtendDiscipline,
    changeActiveSection,
    updateTaskStatus,
    createTaskStatus,
  } = bindActionCreators(ActionCreators, dispatch)
  const {
    activeSection,
    isLoading,
    isDisciplineLoad,
    isDisciplineExtendLoad,
    notFound,
    disciplines,
    disciplineExtended,
  } = useTypesSelector((state) => state.disciplineState)
  return {
    activeSection,
    getExistDisciplines,
    getExtendDiscipline,
    isLoading,
    isDisciplineLoad,
    isDisciplineExtendLoad,
    notFound,
    disciplines,
    disciplineExtended,
    changeActiveSection,
    removeGroupDisciplineLucterer,
    createGroupDisciplineLucterer,
    removeGroupDisciplineTask,
    createGroupDisciplineTask,
    updateTaskStatus,
    createTaskStatus,
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
