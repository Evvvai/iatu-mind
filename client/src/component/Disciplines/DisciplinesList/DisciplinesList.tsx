import './DisciplinesList.scss'
import React, { FC, useEffect, useState } from 'react'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as Add } from '../../../utils/img/add.svg'
import DisciplinesItem from '../DisciplinesItem/DisciplinesItem'
import DiscipinesSelector from '../DiscipinesSelector/DiscipinesSelector'
import DisciplinePeriod from '../DisciplinePeriod/DisciplinePeriod'
import DisciplineImg from '../DisciplineImg/DisciplineImg'

// Utils
import { Drawer } from '@material-ui/core'
import toggleDrawer from '../../../utils/toggleDrawer'

// Custom hooks
import { useApplication } from '../../../hook/useApplication'
import { useDiscipline } from '../../../hook/useDiscipline'
import { useUser } from '../../../hook/useUser'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplinesList: FC<Props> = (props) => {
  const { periodNow, groupNow, changeLocation } = useApplication()
  const { getExistDisciplines, disciplines } = useDiscipline()
  const { user } = useUser()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    getExistDisciplines(groupNow, periodNow, user?.id)
  }, [groupNow, periodNow])

  useEffect(() => {
    changeLocation([{ original: 'discipline', value: 'Предметы', path: '/discipline' }])
  }, [])

  return (
    <section className="disciplines unselectable">
      <DisciplineImg />
      <DisciplinePeriod />
      <h1 className="disciplines-header">Список доступных предметов</h1>
      <div className="disciplines-list">
        {disciplines?.length === 0 || !disciplines ? (
          <div className="disciplines-not-found">Никаких предметов для выбранной группы в данный период не найдено</div>
        ) : (
          disciplines.map((val, key) => {
            return <DisciplinesItem key={key} discipline={val} />
          })
        )}
      </div>
      <div className="disciplines-add">
        <div onClick={toggleDrawer(true, setIsOpen)} className="disciplines-add__content">
          <Add className="disciplines-add__icon" />
          <Drawer
            anchor={'top'}
            open={isOpen}
            onClose={toggleDrawer(false, setIsOpen)}
            onClick={(e) => e.stopPropagation()}
          >
            <DiscipinesSelector onClose={setIsOpen} />
          </Drawer>
        </div>
      </div>
    </section>
  )
}

export default DisciplinesList
