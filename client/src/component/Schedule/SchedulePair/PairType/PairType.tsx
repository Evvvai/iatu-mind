import './PairType.scss'
import React, { FC } from 'react'
import { Schedule } from '../../../../types'

import { ReactComponent as Practic } from '../../../../utils/img/Practic.svg'
import { ReactComponent as Laba } from '../../../../utils/img/Laba.svg'
import { ReactComponent as Lecture } from '../../../../utils/img/Lecture.svg'

//Icon
import { GiBloodyStash } from 'react-icons/gi'
import { GiChewedSkull } from 'react-icons/gi'

// Utils
import getKeyValue from '../../../../utils/getKeyValue'

// Interface
interface Props {
  schedule: Schedule
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PairType: FC<Props> = (props) => {
  const type = getKeyValue(variants)(props.schedule.type)

  return (
    <div className="type-content__item">
      <div className="type-content__icon">{type?.icon}</div>
      <div className="type-content__info">{type?.name}</div>
    </div>
  )
}

export default PairType

const variants: { [key: string]: { icon: any; name: string } } = {
  Практика: {
    icon: <Practic />,
    name: 'Практика',
  },
  'Лабораторная работа': {
    icon: <Laba />,
    name: 'Лаба',
  },
  Лекция: {
    icon: <Lecture />,
    name: 'Лекция',
  },
  Зачёт: {
    icon: <GiBloodyStash />,
    name: 'Зачёт',
  },
  Экзамен: {
    icon: <GiChewedSkull />,
    name: 'Лекция',
  },
}
