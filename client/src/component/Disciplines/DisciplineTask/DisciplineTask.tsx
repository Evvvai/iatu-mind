import { FC } from 'react'
import './DisciplineTask.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import TaskAdd from './TaskAdd/TaskAdd'

// Custom hooks
import { useDiscipline } from '../../../hook/useDiscipline'
import { useApplication } from '../../../hook/useApplication'

// Utils
import TaskItem from './TaskItem/TaskItem'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplineTask: FC<Props> = (props) => {
  const { isEdit } = useApplication()
  const { disciplineExtended } = useDiscipline()

  return (
    <div className="discipline-task">
      <hr className="discipline-task-hr" />
      {disciplineExtended?.disciplineTasks.map((val: any) => {
        return <TaskItem key={val.id} task={val} />
      })}
      {isEdit && <TaskAdd />}
    </div>
  )
}

export default DisciplineTask
