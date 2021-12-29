import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { searchVariousData } from '../utils/searchVariousData'
import { apolloClient } from '../graphql/index'
import getKeyValue from '../utils/getKeyValue'

import { SearchState, SearchVarious, SearchSuggestion } from '../types'

const initialState: SearchState = {
  term: '',
  suggestion: [],
  various: SearchVarious.NONE,
  isLoading: false,
  isVisible: false,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTerm: (state, { payload }: PayloadAction<string>) => {
      state.term = payload
    },
    setVarious: (state, { payload }: PayloadAction<SearchVarious>) => {
      state.various = payload
    },
    openSearch: (state) => {
      state.isVisible = true
    },
    closeSearch: (state) => {
      state.isVisible = false
    },
    requestSearch: (state) => {
      state.isLoading = true
      // state.suggestion = []
    },
    receiveSearch: (state, { payload }: PayloadAction<SearchSuggestion[]>) => {
      state.isLoading = false
      state.suggestion = payload
    },
  },
})

export const { setTerm, setVarious, openSearch, closeSearch, requestSearch, receiveSearch } = searchSlice.actions
export default searchSlice.reducer

// Action
///////////////////////////////////////////////////////////////////////////////////////////////////

export function getSearch(various: SearchVarious, term: string) {
  return async (dispatch: Dispatch, getState: () => {}) => {
    try {
      dispatch(requestSearch())
      const g = getKeyValue(searchVariousData)(various)
      const { data } = await apolloClient.query({
        query: g.ql,
        variables: { term },
      })

      dispatch(receiveSearch(getKeyValue(data)(g.term)))
      // console.log(getKeyValue(data)(g.term))
    } catch (e) {
      console.log('getSearch', e)
    } finally {
    }
  }
}
