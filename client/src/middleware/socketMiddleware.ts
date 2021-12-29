import { Dispatch } from 'redux'

import { RootState } from '../store/rootReducer'

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params
    const { type, payload } = action

    switch (type) {
    }

    return next(action)
  }
}
