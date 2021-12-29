import './DiscipinesSelector.scss'
import React, { FC, useEffect, useState } from 'react'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as Close } from '../../../utils/img/close.svg'

// Utils
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import cn from 'classnames'
import { GET_AVAILABLE_DISCIPLINES } from '../../../graphql/queries'
import { apolloClient } from '../../../graphql'
import LoadingSmall from '../../Loading/LoadingSmall'
import { Disciplines } from '@types'
import { Role } from '../../../types/index'
import { filteringDisciplinesUtil } from '../../../utils/filteringUtil'
import { CREATE_GROUP_DISCIPLINE } from '../../../graphql/mutation'
import getJwtToken from '../../../utils/getJwtToken'

// Custom hooks
import { useApplication } from '../../../hook/useApplication'
import { useUser } from '../../../hook/useUser'
import { useDiscipline } from '../../../hook/useDiscipline'

// Interface
interface Props {
  onClose: any
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DiscipinesSelector: FC<Props> = (props) => {
  const { periodNow, groupNow, setError } = useApplication()
  const { isLoggedIn, user } = useUser()
  const { getExistDisciplines } = useDiscipline()

  const [term, setTerm] = useState<string>('')
  const [discipline, setDiscipline] = useState<Disciplines | null>(null)
  const [typeExam, setTypeExam] = useState<VariblesExams | null>(null)
  const [course, setCourse] = useState<VariblesCourse | null>(null)
  const [availableDisciplines, setAvailableDisciplines] = useState<Disciplines[] | null>(null)

  const handleOnChangeText = (e: any) => {
    setTerm(e.target.value)
  }

  const handleOnClickSelectDiscipline = (val: Disciplines) => {
    setDiscipline(val)
  }

  const handleOnClickSelectTypeExam = (val: VariblesExams) => {
    setTypeExam(val)
  }

  const handleOnClickSelectCourse = (val: VariblesCourse) => {
    setCourse(val)
  }

  const handleOnClickSubmit = (e: any) => {
    if (!discipline || !typeExam || !course) {
      if (!discipline) setError('Не выбрана дисциплина')
      if (!typeExam) setError('Не выбран экзамен')
      if (!course) setError('Не выбрана тип курсовой')
      return
    }

    if (user?.role !== Role.ADMIN) {
      setError('У вас нету доступа')
      props.onClose(false)
    }

    apolloClient
      .mutate({
        mutation: CREATE_GROUP_DISCIPLINE,
        variables: {
          groupId: groupNow.id,
          periodId: periodNow.id,
          disciplineId: discipline.id,
          isCourse: course.value,
          finalTaskId: typeExam.id,
        },
        context: {
          headers: {
            authorization: getJwtToken(),
          },
        },
      })
      .then((result) => {
        getExistDisciplines(groupNow, periodNow, user?.id)
        props.onClose(false)
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  const handleOnClickClose = (e: any) => {
    props.onClose(false)
  }

  useEffect(() => {
    if (!groupNow || !periodNow) return

    apolloClient
      .query({
        query: GET_AVAILABLE_DISCIPLINES,
        variables: {
          groupId: groupNow.id,
          periodId: periodNow.id,
        },
      })
      .then(({ data }) => {
        setAvailableDisciplines(data.disciplinesAvailable)
      })
  }, [])

  if (!availableDisciplines) {
    return (
      <section className="discipline-selector">
        <LoadingSmall />
      </section>
    )
  }

  return (
    <section className="discipline-selector">
      <header className="discipline-selector-header">
        <input
          type="text"
          className="discipline-selector-header__search"
          placeholder="Поиск..."
          onChange={handleOnChangeText}
          value={term}
        />
        <Close onClick={handleOnClickClose} className="discipline-selector-header__close" />
      </header>

      <div className="discipline-selector__title">Выберите предмет</div>
      <div className="discipline-selector__content">
        {filteringDisciplinesUtil(availableDisciplines, term).map((val, key) => {
          const matches = match(val.name, term)
          const parts = parse(val.name, matches)

          return (
            <div
              onClick={() => handleOnClickSelectDiscipline(val)}
              key={val.id}
              className={cn('discipline-selector__item', { active: val.id === discipline?.id })}
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
      <div className="discipline-selector__title">Выберите итоговое задание</div>
      <div className="discipline-selector__content">
        {variblesExams.map((val, index) => {
          return (
            <span
              onClick={() => handleOnClickSelectTypeExam(val)}
              key={val.id}
              className={cn('discipline-selector__item', { active: val.id === typeExam?.id })}
            >
              {val.title}
            </span>
          )
        })}
      </div>
      <hr />
      <div className="discipline-selector__title">Имеется ли курсовая</div>
      <div className="discipline-selector__content">
        {variblesCourse.map((val, index) => {
          return (
            <span
              onClick={() => handleOnClickSelectCourse(val)}
              key={val.title}
              className={cn('discipline-selector__item', { active: val.value === course?.value })}
            >
              {val.title}
            </span>
          )
        })}
      </div>
      <div className="discipline-selector__submit">
        <button onClick={handleOnClickSubmit}>Добавить</button>
      </div>
    </section>
  )
}

export default DiscipinesSelector

interface VariblesExams {
  id: number
  title: string
}

const variblesExams: VariblesExams[] = [
  {
    id: 1,
    title: 'Зачет',
  },
  {
    id: 2,
    title: 'Зачет с оценкой',
  },
  {
    id: 3,
    title: 'Экзамен',
  },
]

interface VariblesCourse {
  value: boolean
  title: string
}

const variblesCourse: VariblesCourse[] = [
  {
    value: true,
    title: 'Да',
  },
  {
    value: false,
    title: 'Нет',
  },
]
