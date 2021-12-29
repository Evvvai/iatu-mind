import { FC, Fragment, useState } from 'react'
import './TaskAdd.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component

// Custom hooks
import { useApplication } from '../../../../hook/useApplication'
import { useDiscipline } from '../../../../hook/useDiscipline'
import { useUser } from '../../../../hook/useUser'

// Utils

// Interface //NEED REwORK
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TaskAdd: FC<Props> = (props) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const { setError } = useApplication()
  const { disciplineExtended, createGroupDisciplineTask } = useDiscipline()
  const { isLoggedIn, user } = useUser()

  const handleClickSumbit = () => {
    if (description.length < 3 || title.length < 3 || !isLoggedIn) {
      setError('Описание или оглавление слишком короткое')
      return
    }

    console.log(
      disciplineExtended.id,
      description,
      title,
      user.id,
      Math.max(...[...disciplineExtended.disciplineTasks.map((x) => x.index), -1]) + 1
    )

    createGroupDisciplineTask(
      disciplineExtended.id,
      description,
      title,
      user.id,
      Math.max(...[...disciplineExtended.disciplineTasks.map((x) => x.index), -1]) + 1
    )
    setTitle('')
    setDescription('')
  }

  return (
    <Fragment>
      <div className="discipline-task-item">
        <form className="task-form form-group">
          <div className="form-group">
            <label className="form-group__label">название</label>
            <input onChange={(e) => setTitle(e.target.value)} className="form-group__input" value={title} type="text" />
          </div>
          <div className="form-group">
            <label className="form-group__label">Краткое описание</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="form-group__input"
              value={description}
              type="text"
            />
          </div>
          <div className="form-group">
            <button onClick={handleClickSumbit} type="button" className="form-group__submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default TaskAdd
