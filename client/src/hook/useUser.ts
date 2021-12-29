import { useTypesSelector } from './useTypesSelector'

import * as ActionCreators from '../store/user.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

// User Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Selector
export const useUser = () => {
  const dispatch = useDispatch()
  const { signIn, removeUserSetting, setUserSetting, signUp, setErrors } = bindActionCreators(ActionCreators, dispatch)

  const { isLoggedIn, user, error } = useTypesSelector((state) => state.userState)
  return {
    isLoggedIn,
    user,
    error,
    signIn,
    removeUserSetting,
    setUserSetting,
    signUp,
    setErrors,
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
