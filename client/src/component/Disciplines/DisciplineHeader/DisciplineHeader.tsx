import { FC, useState } from 'react'
import './DisciplineHeader.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as Overview } from '../../../utils/img/overview.svg'
import { ReactComponent as Bookmarks } from '../../../utils/img/bookmarks.svg'
import { ReactComponent as Library } from '../../../utils/img/library.svg'

// Utils
import cn from 'classnames'

// Custom hookss
import { useDiscipline } from '../../../hook/useDiscipline'
import { DisciplineSection } from '../../../types'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplineHeader: FC<Props> = (props) => {
  const { disciplineExtended, activeSection, changeActiveSection } = useDiscipline()

  return (
    <header className="discipline-main-header">
      <h1 className="discipline-main-header__title">{disciplineExtended.discipline.name}</h1>
      <div className="discipline-main-header__section">
        <Overview
          onClick={(e) => changeActiveSection(DisciplineSection.OVERVIEW)}
          className={cn('discipline-main-header__icon', { active: activeSection === DisciplineSection.OVERVIEW })}
        />
        <Bookmarks
          onClick={(e) => changeActiveSection(DisciplineSection.TASK)}
          className={cn('discipline-main-header__icon', { active: activeSection === DisciplineSection.TASK })}
        />
        <Library
          onClick={(e) => changeActiveSection(DisciplineSection.LIBRARY)}
          className={cn('discipline-main-header__icon', { active: activeSection === DisciplineSection.LIBRARY })}
        />
      </div>
    </header>
  )
}

export default DisciplineHeader
