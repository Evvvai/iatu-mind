import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { apolloClient } from '../graphql/index'

import { SIGNIN, SIGNUP } from '../graphql/mutation'

import { UserState, User, SignUpQL, SignInQL } from '../types'

const initialState: UserState = {
  isLoggedIn: false,
  user: {} as User,
  error: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSetting: (state, { payload }: PayloadAction<User>) => {
      state.isLoggedIn = true
      state.user = payload
      state.error = []
    },
    removeUserSetting: (state) => {
      localStorage.removeItem('jwt')
      state.isLoggedIn = false
      state.user = {} as User
      state.error = []
    },
    setErrors: (state, { payload }: PayloadAction<any>) => {
      state.error = payload
    },
  },
})

export const { setUserSetting, removeUserSetting, setErrors } = userSlice.actions
export default userSlice.reducer

// Action
///////////////////////////////////////////////////////////////////////////////////////////////////

export function signIn(variables: SignInQL, history: any) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: SIGNIN,
          variables: variables,
        })
        .then(({ data }) => {
          dispatch(setUserSetting(data.signIn.user))
          localStorage.setItem('jwt', data.signIn.token)
          history.push('/')
        })
        .catch((error) => {
          console.log(error)
          dispatch(setErrors(error?.graphQLErrors[0]?.extensions?.response))
        })
    } catch (e) {
      console.log('signIn', e)
    } finally {
    }
  }
}

export function signUp(variables: SignUpQL, history: any) {
  return (dispatch: Dispatch, getState: () => {}) => {
    try {
      apolloClient
        .mutate({
          mutation: SIGNUP,
          variables: variables,
        })

        .then((result) => {
          history.push('/signin')
        })
        .catch((error) => {
          dispatch(setErrors(error?.graphQLErrors[0]?.extensions?.response))
        })
    } catch (e: any) {
      console.log('signUp', e)
    }
  }
}

/**
 *
 * Idk why...
 *
 * export function auth() {
 *   return async (dispatch: Dispatch, getState: () => {}) => {
 *     try {
 *     } catch (e) {
 *       console.log('auth', e)
 *     } finally {
 *     }
 *   }
 * }
 *
 */
