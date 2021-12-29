import './DisciplinesItem.scss'
import React, { FC } from 'react'
import Back from '../../utils/img/here.png'
import Gray from '../../utils/img/gray_blur.png'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component

import { ReactComponent as History } from '../../../utils/img/history.svg'

import { ReactComponent as Task } from '../../../utils/img/library.svg'
import { ReactComponent as Library } from '../../../utils/img/bookmarks.svg'
import { ReactComponent as Update } from '../../../utils/img/update.svg'
import { GroupDisciplinesList } from '@types'
import { Link } from 'react-router-dom'

// Interface
interface Props {
  discipline: GroupDisciplinesList
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplinesItem: FC<Props> = (props) => {
  return (
    <Link to={'/discipline/' + props.discipline.disciplineId} className="discipline-content link">
      <div className="discipline-content__info info-item">
        <History className="info-item__icon" />
        <p className="info-item__name">{props.discipline.discipline?.name}</p>
      </div>

      <span className="discipline-content__hr" />

      <div className="discipline-content__tip tip-item">
        <div className="tip-item">
          <Task className="tip-item__icon" />
          <div className="tip-item__value">{props.discipline?.taskCount || 0}</div>
        </div>
        <div className="tip-item">
          <Library className="tip-item__icon" />
          <div className="tip-item__value">{props.discipline?.lybraryCount || 0}</div>
        </div>
        <div className="tip-item last">
          <div className="tip-item__value">5 дней назад</div>
          <Update className="tip-item__icon" />
        </div>
      </div>
    </Link>
  )
}

export default DisciplinesItem
