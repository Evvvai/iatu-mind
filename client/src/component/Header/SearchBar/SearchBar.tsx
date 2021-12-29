import './SearchBar.scss'
import React, { FC, useEffect, useState } from 'react'
import cn from 'classnames'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import SearchBarResult from './SearchBarResult/SearchBarResult'

// Utils
import { ReactComponent as Search } from '../../../utils/img/search_white.svg'
import { ReactComponent as Clear } from '../../../utils/img/clear.svg'

// Custom hook
import { useSearch } from '../../../hook/useSearch'
import { SearchVarious } from '../../../types/index'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const SearchBar: FC<Props> = (props) => {
  const { closeSearch, getSearch, isVisible, openSearch, setTerm, setVarious, term, various } = useSearch()

  const [saveTimer, setSaveTimer] = useState<any>(null)
  const [termState, setTermState] = useState<string>(term)

  const handlerChangeText = (e: any) => {
    setTermState(e.target.value)
    clearTimeout(saveTimer)
    setSaveTimer(
      setTimeout(() => {
        getSearch(various, termState)
        setTerm(termState)
      }, 500)
    )
  }

  const handlerClickClear = (e: any) => {
    setVarious(SearchVarious.NONE)
    setTermState('')
    setTerm('')
  }

  const handlerClickOpen = (e: any) => {
    openSearch()
  }

  const handlerClickClose = (e: any) => {
    closeSearch()
  }

  useEffect(() => {
    // const f = searchVariousData[SearchVarious.NONE]
    // console.log(f)
    // console.log(getKeyValue(searchVariousData, SearchVarious.NONE))
    console.log()
  }, [])

  return (
    <React.Fragment>
      <div className="search">
        <div className="search-bar high">
          <input
            type="text"
            className={cn('search-bar__input', { active: isVisible })}
            placeholder="Поиск..."
            onClick={handlerClickOpen}
            onChange={handlerChangeText}
            value={termState}
          />
          {various !== SearchVarious.NONE ? (
            <React.Fragment>
              <div className="search-bar__category">{Object.values(SearchVarious).find((x) => x === various)}</div>
              <Clear onClick={handlerClickClear} className="search-bar__icon" />
            </React.Fragment>
          ) : (
            <Search onClick={handlerClickClose} className="search-bar__icon" />
          )}
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className={cn('search-bar__variuos', { active: isVisible })}
          >
            {termState.length === 0 ? (
              <ul className="search-bar option-content">
                {Object.values(SearchVarious).map((val, key) => {
                  if (val === SearchVarious.NONE) return
                  return (
                    <li
                      key={key}
                      onClick={(e) => {
                        setVarious(val)
                        e.stopPropagation()
                      }}
                      className={cn('option-content__item', { active: val === various })}
                    >
                      {val}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <SearchBarResult />
            )}
          </div>
        </div>
        <div className="search-bar-mobile">
          <Search onClick={handlerClickOpen} className="search-bar__icon" />
        </div>
      </div>
      <div onClick={handlerClickClose} className={cn('search-bar-background-blur', { active: isVisible })} />
      <div onClick={handlerClickOpen} className={cn('search-bar-mobile__content', { active: isVisible })}>
        <div className="search-bar">
          <input
            type="text"
            className={cn('search-bar__input', { active: isVisible })}
            placeholder="Поиск..."
            onClick={handlerClickOpen}
            onChange={handlerChangeText}
            value={termState}
          />
          {various !== SearchVarious.NONE ? (
            <React.Fragment>
              <div className="search-bar__category">{Object.values(SearchVarious).find((x) => x === various)}</div>
              <Clear onClick={handlerClickClear} className="search-bar__icon" />
            </React.Fragment>
          ) : (
            <Search onClick={handlerClickClose} className="search-bar__icon" />
          )}
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className={cn('search-bar__variuos', { active: isVisible })}
          >
            {termState.length === 0 ? (
              <ul className="search-bar option-content">
                {Object.values(SearchVarious).map((val, key) => {
                  if (val === SearchVarious.NONE) return
                  return (
                    <li
                      key={key}
                      onClick={(e) => {
                        setVarious(val)
                        e.stopPropagation()
                      }}
                      className={cn('option-content__item', { active: val === various })}
                    >
                      {val}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <SearchBarResult />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SearchBar
