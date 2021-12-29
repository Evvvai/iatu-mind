import './LecturerSelector.scss'
import React, { FC, useEffect, useState } from 'react'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import LoadingSmall from '../../../../component/Loading/LoadingSmall'
import { ReactComponent as Close } from '../../../../utils/img/close.svg'

// Utils
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import cn from 'classnames'
import { GET_ALL_LECTURERS } from '../../../../graphql/queries'
import { apolloClient } from '../../../../graphql'
import { Lecturer } from '@types'
import { PairType, Role } from '../../../../types'
import { filteringLecturersUtil } from '../../../../utils/filteringUtil'
import { pairTypeVariousIcon } from '../../../../utils/pairTypeVariousIcon'
import { CREATE_GROUP_DISCIPLINE_LECTURE } from '../../../../graphql/mutation'
import getJwtToken from '../../../../utils/getJwtToken'
import getKeyValue from '../../../../utils/getKeyValue'

// Custom hooks
import { useUser } from '../../../../hook/useUser'
import { useDiscipline } from '../../../../hook/useDiscipline'
import { useApplication } from '../../../../hook/useApplication'

// Interface
interface Props {
  onClose: any
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DiscipinesSelector: FC<Props> = (props) => {
  const { user } = useUser()
  const { disciplineExtended, createGroupDisciplineLucterer } = useDiscipline()
  const { setError } = useApplication()

  const [term, setTerm] = useState<string>('')
  const [lecturer, setLecturer] = useState<Lecturer | null>(null)
  const [typePair, setPairType] = useState<PairType | null>(null)

  const [availableLecturers, setAvailableLecturers] = useState<any[] | null>(null)

  const handleOnChangeText = (e: any) => {
    setTerm(e.target.value)
  }

  const handleOnClickSelectLecturer = (val: any) => {
    setLecturer(val)
  }

  const handleOnClickSelectPairType = (val: any) => {
    setPairType(val)
  }

  const getPairTypeIcon = () => {
    const PairTypeIcon = getKeyValue(pairTypeVariousIcon)(
      getKeyValue(PairType)(
        (Object.keys(PairType) as Array<keyof typeof PairType>).filter((key: any) => {
          return key === typePair
        })[0]
      )
    )

    return <PairTypeIcon />
  }

  const handleOnClickSubmit = (e: any) => {
    if (!lecturer || !typePair) {
      if (!lecturer) setError('Не выбран преподаватель')
      if (!typePair) setError('Не выбран тип пары')
      return
    }

    if (user?.role !== Role.ADMIN) {
      setError('У вас нету доступа')
    }

    createGroupDisciplineLucterer(lecturer, typePair, disciplineExtended.id)

    props.onClose(false)
  }

  const handleOnClickClose = (e: any) => {
    props.onClose(false)
  }

  useEffect(() => {
    apolloClient
      .query({
        query: GET_ALL_LECTURERS,
      })
      .then(({ data }) => {
        setAvailableLecturers(data.lecturers)
      })
  }, [])

  if (!availableLecturers) {
    return (
      <section className="discipline-selector">
        <LoadingSmall />
      </section>
    )
  }

  return (
    <section className="lecturer-selector">
      <header className="lecturer-selector-header">
        <input
          type="text"
          className="lecturer-selector-header__search"
          placeholder="Поиск..."
          onChange={handleOnChangeText}
          value={term}
        />
        <Close onClick={handleOnClickClose} className="lecturer-selector-header__close" />
      </header>

      <div className="lecturer-selector__title">Выберите преподавателя</div>
      <div className="lecturer-selector__content">
        {filteringLecturersUtil(availableLecturers, term).map((val, key) => {
          const matches = match(val.fullName, term)
          const parts = parse(val.fullName, matches)

          return (
            <div
              onClick={() => handleOnClickSelectLecturer(val)}
              key={val.id}
              className={cn('lecturer-selector__item', { active: val.id === lecturer?.id })}
            >
              {parts.map((part, index) => (
                <span
                  key={index + val.id}
                  style={{ fontWeight: part.highlight ? 700 : 400, color: part.highlight ? '#007bff' : '#aaaaaa' }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          )
        })}
      </div>
      <hr />
      <div className="lecturer-selector__title">Выберите тип пары</div>
      <div className="lecturer-selector__content">
        {(Object.keys(PairType) as Array<keyof typeof PairType>).map((key: any) => {
          return (
            <span
              onClick={() => handleOnClickSelectPairType(key)}
              key={key}
              className={cn('lecturer-selector__item', { active: key === typePair })}
            >
              {getKeyValue(PairType)(key)}
            </span>
          )
        })}
      </div>
      <hr />

      <div className="lecturer-selector__content">
        <div className="lecturer-selector__result result-content">
          <div className="result-content__type">{typePair ? getPairTypeIcon() : ''}</div>
          <div className="result-content__teacher">{lecturer?.fullName || 'Неизвестно Н.Н.'}</div>
        </div>
      </div>

      <button onClick={handleOnClickSubmit} className="lecturer-selector__submit">
        Добавить
      </button>
    </section>
  )
}

export default DiscipinesSelector
