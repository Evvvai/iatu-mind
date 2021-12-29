import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import './TaskItem.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as FileIcon } from '../../../../utils/img/file.svg'
import { ReactComponent as ImageIcon } from '../../../../utils/img/image.svg'
import { ReactComponent as LinkIcon } from '../../../../utils/img/link.svg'
import { ReactComponent as DeleteIcon } from '../../../../utils/img/close.svg'
import { ReactComponent as LockIcon } from '../../../../utils/img/lock.svg'
import { ReactComponent as CompleteIcon } from '../../../../utils/img/complete.svg'
import { ReactComponent as NoneIcon } from '../../../../utils/img/none.svg'
import ToolTip from '../../../../utils/CustomTooltip'

// Custom hooks
import { useApplication } from '../../../../hook/useApplication'
import { useDiscipline } from '../../../../hook/useDiscipline'
import { useUser } from '../../../../hook/useUser'
import useQuery from '../../../../hook/useQuery'

// Utils
import cn from 'classnames'
import dayjs from 'dayjs'
import { DisciplineTask, TaskStatus } from '../../../../types/'
import { useHistory } from 'react-router-dom'
import getKeyValue from '../../../../utils/getKeyValue'

// Interface
interface Props {
  task: DisciplineTask
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TaskItem: FC<Props> = (props) => {
  const [active, setActive] = useState(false)

  const { isEdit } = useApplication()
  const { removeGroupDisciplineTask, createTaskStatus, updateTaskStatus } = useDiscipline()
  const { isLoggedIn, user } = useUser()

  const query = useQuery()
  const history = useHistory()

  const handleClickDelete = () => {
    removeGroupDisciplineTask(props.task.id)
  }

  const handleClickUpdateStatus = (e: any) => {
    e.stopPropagation()
    if (props.task?.taskStatus?.id) {
      updateTaskStatus(
        getKeyValue(TaskStatus)(props.task.taskStatus.status) === TaskStatus.COMPLETE
          ? TaskStatus.NONE
          : TaskStatus.COMPLETE,
        props.task.taskStatus.id
      )
    } else {
      createTaskStatus(TaskStatus.COMPLETE, user.id, props.task.id)
    }
  }

  const isHighlight = useMemo<boolean>(() => {
    const highlight = query.get('highlight')

    return !highlight ? false : highlight.toString() === props.task.id.toString()
  }, [props.task.id, query])

  useEffect(() => {
    if (isHighlight) setActive(true)
  }, [])

  return (
    <Fragment>
      <Fragment>
        <div
          onClick={(e) => {
            if (isHighlight) {
              query.delete('highlight')
              history.replace({
                search: query.toString(),
              })
            }
            setActive(!active)
          }}
          className={cn('discipline-task-item', { active: active }, { highlight: isHighlight })}
        >
          <div onClick={handleClickUpdateStatus} className="discipline-task-status">
            {isLoggedIn ? (
              <ToolTip
                content={
                  <div className="discipline-task-status__tip">
                    <span>{getKeyValue(TaskStatus)(props.task.taskStatus?.status || 'NONE')}</span>
                    <span>
                      {props.task?.taskStatus?.updatedAt
                        ? dayjs(props.task?.taskStatus?.updatedAt).format('YYYY.MM.DD HH:mm:ss')
                        : 'Не обновлялся'}
                    </span>
                  </div>
                }
                delay={300}
                reset={50}
                placement={'top'}
              >
                {getKeyValue(TaskStatus)(props.task.taskStatus?.status || 'NONE') === TaskStatus.COMPLETE ? (
                  <div>
                    <CompleteIcon className="discipline-task-status__icon theme_complete" />
                  </div>
                ) : (
                  <div>
                    <NoneIcon className="discipline-task-status__icon theme_none" />
                  </div>
                )}
              </ToolTip>
            ) : (
              <ToolTip
                content={
                  <div className="discipline-task-status__tip">
                    <span>Возможность изменить статус доступна только авторизированным пользователям</span>
                  </div>
                }
                delay={500}
                reset={50}
                placement={'top'}
              >
                <div>
                  <LockIcon className="discipline-task-status__icon theme_lock" />
                </div>
              </ToolTip>
            )}
          </div>
          <div className="discipline-task-title">{props.task.title}</div>
          <div className="discipline-task-desc">{props.task.description}</div>
          {/* <div className="discipline-task-additional">
            <ImageIcon />
            <FileIcon />
            <LinkIcon />
          </div> */}
          <ToolTip
            content={
              <div className="discipline-task-date__tip">
                <span>{dayjs(props.task.createdAt).format('YYYY.MM.DD HH:mm:ss')} Created</span>
                <span>{dayjs(props.task.updatedAt).format('YYYY.MM.DD HH:mm:ss')} Updated</span>
              </div>
            }
            reset={250}
            placement={'top'}
          >
            <div className="discipline-task-date">{dayjs(props.task.updatedAt).fromNow()}</div>
          </ToolTip>
        </div>
        {active && (
          <div className={cn('discipline-task-extend', { active: active }, { highlight: isHighlight })}>
            <p>{props.task?.fullDescription || props.task.description}</p>
            {/* <div className="discipline-task-extend__type">
              <span className="active">Материал</span>
              <span>Решения</span>
            </div>
            <div className="discipline-task-extend__content">
              <p>
                sadsadsadsadsadsadsadsadsasadsadsadsadsadsadsadsadsasadsadsadsadsadsadsadsadsasadsadsadsadsadsadsadsadsa
              </p>
            </div>
            <div className="discipline-task-extend__hr" />
            <div className="discipline-task-extend__various">
              <ToolTip content={<span>Показать все картинки</span>} delay={250} reset={25} placement={'top'}>
                <div>
                  <span>4</span>
                  <ImageIcon className="active" />
                </div>
              </ToolTip>

              <ToolTip content={<span>Показать все файлы</span>} delay={250} reset={25} placement={'top'}>
                <div>
                  <span>4</span>
                  <FileIcon />
                </div>
              </ToolTip>

              <ToolTip content={<span>Показать все ссылки</span>} delay={250} reset={25} placement={'top'}>
                <div>
                  <span>4</span>
                  <LinkIcon />
                </div>
              </ToolTip>
            </div> */}
            {isEdit && (
              <div onClick={handleClickDelete} className="discipline-task-extend__delete">
                <DeleteIcon />
              </div>
            )}
          </div>
        )}
      </Fragment>
      <hr className="discipline-task-hr" />
    </Fragment>
  )
}

export default TaskItem

interface TimeVarious {}

const timeVarious: TimeVarious[] = [
  {
    seconds: 1,
    parseValue: 'ss',
  },
  {
    seconds: 1,
    parseValue: 'mm',
  },
  {
    seconds: 1,
    parseValue: 'HH',
  },
  {
    seconds: 1,
    parseValue: 'd',
  },
  {
    seconds: 1,
    parseValue: 'MM',
  },
  {
    seconds: 1,
    parseValue: 'YY',
  },
]
