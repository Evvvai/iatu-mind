import { useTypesSelector } from './useTypesSelector'

import * as ActionCreators from '../store/search.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

// Search Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Selector
export const useSearch = () => {
  const dispatch = useDispatch()
  const { getSearch, closeSearch, openSearch, setTerm, setVarious } = bindActionCreators(ActionCreators, dispatch)

  const { isLoading, isVisible, suggestion, term, various } = useTypesSelector((state) => state.searchState)
  return { getSearch, closeSearch, openSearch, setTerm, setVarious, isLoading, isVisible, suggestion, term, various }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
