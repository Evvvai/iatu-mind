import './SearchBarResult.scss'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { CustomScroll } from '../../../../utils'

// Custom hooks
import { useSearch } from '../../../../hook/useSearch'
import LoadingSmall from '../../../Loading/LoadingSmall'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const SearchBarResult: FC<Props> = (props) => {
  const { suggestion, isLoading, term, closeSearch } = useSearch()

  const handleOnClick = (e: any) => {
    closeSearch()
  }

  return (
    <div className="search-bar-result">
      <CustomScroll>
        <div
          className={cn('search-bar-result-loading', {
            active: ((suggestion.length === 0 || term === '') && isLoading) || isLoading,
          })}
        >
          <LoadingSmall className="search-bar-result-loading__image" />
        </div>
        {suggestion.length === 0 && term !== '' && !isLoading ? (
          <h1 className="search-bar-info__nothing">Ничего не найдено</h1>
        ) : suggestion.length !== 0 && !isLoading ? (
          suggestion.map((val, key) => {
            const matches = match(val.name, term)
            const parts = parse(val.name, matches)
            return (
              <div key={key} className="search-bar-item">
                <Link onClick={handleOnClick} to={'/url'} className="search-bar-info link">
                  <img
                    className="search-bar-info__img"
                    src={
                      'https://firebasestorage.googleapis.com/v0/b/trick-a871a.appspot.com/o/image%2Fdashboard.gif?alt=media&token=e2bb410b-bde1-475d-9baa-bfd9a71f6f11'
                    }
                    alt={'da'}
                  />
                  <div>
                    {parts.map((part, index) => (
                      <span
                        className="search-bar-info__text"
                        key={index + val.id}
                        style={{
                          fontWeight: part.highlight ? 500 : 400,
                          color: part.highlight ? '#dddddd' : '#aaaaaa',
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </Link>
                <hr className="search-bar-item__hr" />
              </div>
            )
          })
        ) : (
          <div></div>
        )}
      </CustomScroll>
    </div>
  )
}

export default SearchBarResult
