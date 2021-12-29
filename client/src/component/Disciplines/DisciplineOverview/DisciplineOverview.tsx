/* eslint-disable jsx-a11y/alt-text */
import { FC, Fragment, useState } from 'react'
import './DisciplineOverview.scss'
import parse from 'html-react-parser'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import NotFoundIcon from '../../../utils/img/not_title_2.png'
import LecturerSelector from './LecturerSelector/LecturerSelector'
import { ReactComponent as AddIcon } from '../../../utils/img/add.svg'
import { ReactComponent as CloseIcon } from '../../../utils/img/close.svg'

// Custom hooks
import { useDiscipline } from '../../../hook/useDiscipline'

// Utils
import { Drawer } from '@material-ui/core'
import { PairType } from '../../../types/index'
import getKeyValue from '../../../utils/getKeyValue'
import { pairTypeVariousIcon } from '../../../utils/pairTypeVariousIcon'
import ToolTip from '../../../utils/CustomTooltip'
import { useApplication } from '../../../hook/useApplication'
import toggleDrawer from '../../..//utils/toggleDrawer'
import Loading from '../../Loading/LoadingSmall'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplineOverview: FC<Props> = (props) => {
  const { isEdit } = useApplication()
  const { disciplineExtended, isLoading, removeGroupDisciplineLucterer } = useDiscipline()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (isLoading)
    return (
      <div className="discipline-overview">
        <Loading />
      </div>
    )

  return (
    <div className="discipline-overview">
      <div className="discipline-overview-content">
        {disciplineExtended.discipline.description !== '' ? (
          parse(disciplineExtended.discipline.description)
        ) : (
          <div className="discipline-overview-content__not unselectable">
            <h1 className="discipline-overview-content__not-title">Описание не добавлено</h1>
            <img className="discipline-overview-content__not-icon" src={NotFoundIcon} />
          </div>
        )}
      </div>
      <div className="discipline-overview-lecturers">
        <div className="discipline-overview-lecturers__header">
          <h3 className="discipline-overview-lecturers__title">Преподаватели</h3>
          {isEdit && <AddIcon onClick={toggleDrawer(true, setIsOpen)} className="discipline-overview-lecturers__add" />}
        </div>
        <div className="discipline-overview-lecturers__content">
          {disciplineExtended.disciplineLecturer.map((val, key) => {
            const PairTypeIcon = getKeyValue(pairTypeVariousIcon)(getKeyValue(PairType)(val.role))

            return (
              <div key={key} className="discipline-overview-lecturers__item item-content">
                <ToolTip content={<div>{getKeyValue(PairType)(val.role)}</div>} reset={250} placement={'top'}>
                  <div>
                    <PairTypeIcon className="item-content__icon" />
                  </div>
                </ToolTip>
                <div className="item-content__title">{val.lecturer.fullName}</div>
                {isEdit && (
                  <CloseIcon
                    onClick={() => removeGroupDisciplineLucterer(val, disciplineExtended.id)}
                    className="item-content__delete"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className="discipline-overview-info">
        <div className="discipline-overview-info__item item-content">
          <p className="item-content__title">
            Чтобы одолеть предмет нужно сдать -{' '}
            <code className="item-content__info">
              {disciplineExtended.finalTask.name}
              {disciplineExtended.isCourse ? ' + Курсовая' : ''}
            </code>
          </p>
        </div>
      </div>
      <Drawer
        anchor={'top'}
        open={isOpen}
        onClose={toggleDrawer(false, setIsOpen)}
        onClick={(e) => e.stopPropagation()}
      >
        <LecturerSelector onClose={setIsOpen} />
      </Drawer>
    </div>
  )
}

export default DisciplineOverview
