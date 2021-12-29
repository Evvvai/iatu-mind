import './Aside.scss'
import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as ScheduleIcon } from '../../../utils/img/schedule.svg'
import { ReactComponent as DashboardIcon } from '../../../utils/img/dashboard.svg'
import { ReactComponent as ArrowIcon } from '../../../utils/img/arrow_left.svg'
import { ReactComponent as LogsIcon } from '../../../utils/img/log.svg'
import { ReactComponent as BookmarksIcon } from '../../../utils/img/bookmarks.svg'
import { ReactComponent as AdminModeIcon } from '../../../utils/img/admin-mode.svg'
import ToolTip from '../../../utils/CustomTooltip'

// Custom hooks
import { useApplication } from '../../../hook/useApplication'
import { useUser } from '../../../hook/useUser'
import { Role } from '../../../types/'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Aside: FC<Props> = (props) => {
  const { user } = useUser()
  const { isAsideOpen, openAside, closeAside, isEdit, switchEditMode } = useApplication()

  return (
    <Fragment>
      <div
        className={cn('aside', { active: isAsideOpen })}
        onMouseLeave={(e) => closeAside()}
        onMouseEnter={(e) => openAside()}
        onClick={(e) => {
          e.preventDefault()
          closeAside()
        }}
      >
        <div className="nav-back">
          <ArrowIcon onClick={(e) => window.scrollTo(0, 0)} className="nav-back__icon" />
        </div>
        <nav className={cn('nav-side', { active: isAsideOpen })}>
          <Link to={'/schedule'} className="nav-side__item link">
            <ScheduleIcon className="nav-side__icon" />
            <span className="nav-side__text">Расписание</span>
          </Link>
          <Link to={'/discipline'} className="nav-side__item link">
            <DashboardIcon className="nav-side__icon" />
            <span className="nav-side__text">Предметы</span>
          </Link>
          <Link to={'/discipline/logs'} className="nav-side__item link">
            <LogsIcon className="nav-side__icon" />
            <span className="nav-side__text">Обновления</span>
          </Link>
        </nav>
        {user?.role === Role.ADMIN && (
          <ToolTip
            delay={25}
            reset={25}
            placement="top"
            content={<span>{isEdit ? 'Выключить' : 'Включить'} режим редактирования</span>}
          >
            <div onClick={() => switchEditMode(isEdit)} className="nav-admin-mode">
              <AdminModeIcon className={cn('nav-admin-mode__icon', { active: isEdit })} />
            </div>
          </ToolTip>
        )}
      </div>
      <div className={cn('background-blur', { active: isAsideOpen })}></div>
    </Fragment>
  )
}

export default Aside
