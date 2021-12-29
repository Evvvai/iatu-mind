// import { useAction } from './useAction'
import { useTypesSelector } from './useTypesSelector'

import * as ActionCreators from '../store/app.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

// Application Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Selector
export const useApplication = () => {
  const dispatch = useDispatch()
  const {
    openAside,
    setError,
    clearError,
    closeAside,
    initApp,
    closeGroupSelector,
    openGroupSelector,
    changeGroup,
    changePeriod,
    changeLocation,
    switchEditMode,
  } = bindActionCreators(ActionCreators, dispatch)

  const { isEdit, location, isAsideOpen, isLoad, groups, groupNow, periods, periodNow, isGroupSelectorOpen, error } =
    useTypesSelector((state) => state.appState)
  return {
    isAsideOpen,
    isLoad,
    groups,
    groupNow,
    isGroupSelectorOpen,
    error,
    initApp,
    openAside,
    closeAside,
    closeGroupSelector,
    openGroupSelector,
    changeGroup,
    changePeriod,
    periods,
    periodNow,
    setError,
    clearError,
    location,
    changeLocation,
    switchEditMode,
    isEdit,
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
