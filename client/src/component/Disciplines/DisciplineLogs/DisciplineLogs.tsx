import { FC, Fragment, useEffect, useMemo } from 'react'
import './DisciplineLogs.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import DisciplinePeriod from '../DisciplinePeriod/DisciplinePeriod'
import ToolTip from '../../../utils/CustomTooltip/index'

// Utils
import cn from 'classnames'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { TaskStatus } from '../../../types/index'
import getKeyName from '../../../utils/getKeyName'

// Custom hooks
import { useDiscipline } from '../../../hook/useDiscipline'
import { useApplication } from '../../../hook/useApplication'
import { useUser } from '../../../hook/useUser'
import getKeyValue from '../../../utils/getKeyValue'

// Interface
interface Props {
  match: any
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplineLogs: FC<Props> = (props) => {
  const { periodNow, groupNow, changeLocation } = useApplication()
  const { getExistDisciplines, disciplines, disciplineExtended, isDisciplineLoad } = useDiscipline()
  const { user } = useUser()

  useEffect(() => {
    if (!isDisciplineLoad) getExistDisciplines(groupNow, periodNow, user?.id)
  }, [])

  useEffect(() => {
    if (isDisciplineLoad) getExistDisciplines(groupNow, periodNow, user?.id)
  }, [groupNow, periodNow])

  useEffect(() => {
    changeLocation([{ original: 'logs', value: 'История', path: '/discipline/logs' }])
  }, [])

  interface DisciplineLogs {
    disciplineId: number
    disciplineTasksId: number
    name: string
    title: string
    createdAt: Date
    updatedAt: Date
    authorId: number
    authorLogin: string
    status: any
  }

  // Thats so bad but in first okay... NEED REwORK
  const logsAll = useMemo(() => {
    const allTasks: DisciplineLogs[] = []

    disciplines.forEach((x) => {
      x.disciplineTasks.forEach((y) => {
        allTasks.push({
          disciplineId: x.discipline.id,
          disciplineTasksId: y.id,
          name: x.discipline?.name || '',
          title: y.title,
          createdAt: y.createdAt,
          updatedAt: y.updatedAt,
          authorId: y.authorId,
          authorLogin: y.author.login,
          status: y?.taskStatus?.status,
        })
      })
    })
    return allTasks
  }, [disciplines, disciplineExtended.disciplineTasks, disciplineExtended])

  const logsUpdated = useMemo(() => {
    return logsAll
      .filter((x) => x.updatedAt != x.createdAt)
      .sort((x, y) => {
        if (x.updatedAt > y.updatedAt) return -1
        if (x.updatedAt < y.updatedAt) return 1
        return 0
      })
  }, [logsAll])

  const logsCreated = useMemo(() => {
    return logsAll.sort((x, y) => {
      if (x.createdAt > y.createdAt) return -1
      if (x.createdAt < y.createdAt) return 1
      return 0
    })
  }, [logsAll])

  return (
    <section className="discipline-logs unselectable">
      <DisciplinePeriod />
      <h1 className="discipline-logs-header">История изменения предметов</h1>
      <div className="discipline-logs-content logs-part">
        <div data-title="Добавления" className="logs-part">
          {logsCreated.map((x, key) => {
            return (
              <Fragment key={key}>
                <div className="logs-part__item item">
                  <div className="item-status status ">
                    <div
                      className={cn('status-circle ', {
                        complete: getKeyValue(TaskStatus)(x.status) === TaskStatus.COMPLETE,
                      })}
                    ></div>
                    <div
                      className={cn('status-line ', {
                        complete: getKeyValue(TaskStatus)(x.status) === TaskStatus.COMPLETE,
                      })}
                    ></div>
                  </div>
                  <Link
                    to={'/discipline/' + x.disciplineId + '/?highlight=' + x.disciplineTasksId}
                    className="item-name link"
                  >
                    {x.name}
                  </Link>
                  <Link
                    to={'/discipline/' + x.disciplineId + '/?highlight=' + x.disciplineTasksId}
                    className="item-title link"
                  >
                    {x.title}
                  </Link>
                  <ToolTip
                    content={
                      <div className="discipline-task-date__tip">
                        <span>{dayjs(x.createdAt).format('YYYY.MM.DD HH:mm:ss')} Created</span>
                        <span>{dayjs(x.updatedAt).format('YYYY.MM.DD HH:mm:ss')} Updated</span>
                      </div>
                    }
                    reset={0}
                    delay={150}
                    placement={'top'}
                  >
                    <span className="item-date">{dayjs(x.createdAt).fromNow()}</span>
                  </ToolTip>

                  <ToolTip
                    content={
                      <div className="discipline-task-date__tip">
                        <p>
                          Создано <code>{x.authorLogin}</code>
                        </p>
                      </div>
                    }
                    reset={100}
                    delay={150}
                    placement={'top'}
                  >
                    <Link to={'/' + x.authorLogin} className="item-icon">
                      <img
                        src={
                          'https://static.wikia.nocookie.net/8b1eeedf-3486-4ee3-917a-a943cf3ce3d1/scale-to-width/755'
                        }
                        alt=""
                      />
                    </Link>
                  </ToolTip>
                </div>
                {/* {key !== logsCreated.length - 1 && <hr className="logs-part__hr" />} */}
              </Fragment>
            )
          })}
        </div>
        <div data-title="Обновления" className="logs-part">
          {logsUpdated.map((x, key) => {
            return (
              <Fragment>
                <div className="logs-part__item item">
                  <span className="item-name link">S</span>
                  <Link to={'/discipline/' + x.disciplineId} className="item-name link">
                    {x.name}
                  </Link>
                  <Link to={'/discipline/' + x.disciplineId} className="item-title link">
                    {x.title}
                  </Link>
                  <ToolTip
                    content={
                      <div className="discipline-task-date__tip">
                        <span>{dayjs(x.createdAt).format('YYYY.MM.DD HH:mm:ss')} Created</span>
                        <span>{dayjs(x.updatedAt).format('YYYY.MM.DD HH:mm:ss')} Updated</span>
                      </div>
                    }
                    reset={0}
                    delay={150}
                    placement={'top'}
                  >
                    <span className="item-date">{dayjs(x.createdAt).fromNow()}</span>
                  </ToolTip>

                  <ToolTip
                    content={
                      <div className="discipline-task-date__tip">
                        <p>
                          Создано <code>{x.authorLogin}</code>
                        </p>
                      </div>
                    }
                    reset={100}
                    delay={150}
                    placement={'top'}
                  >
                    <Link to={'/' + x.authorLogin} className="item-icon">
                      <img
                        src={
                          'https://static.wikia.nocookie.net/8b1eeedf-3486-4ee3-917a-a943cf3ce3d1/scale-to-width/755'
                        }
                        alt=""
                      />
                    </Link>
                  </ToolTip>
                </div>
                {key !== logsUpdated.length - 1 && <hr className="logs-part__hr" />}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DisciplineLogs

// const disciplineSectionList = {
//   [DisciplineSection.OVERVIEW]: { component: <DisciplineOverview /> },
//   [DisciplineSection.TASK]: { component: <DisciplineTask /> },
//   [DisciplineSection.LIBRARY]: { component: <DisciplineLibrary /> },
// }
