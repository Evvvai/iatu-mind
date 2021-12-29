import { FC, Fragment, useEffect } from 'react'
import './Discipline.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import DisciplineOverview from './DisciplineOverview/DisciplineOverview'
import DisciplineHeader from './DisciplineHeader/DisciplineHeader'
import DisciplinePeriod from './DisciplinePeriod/DisciplinePeriod'
import LoadingSmall from '../Loading/LoadingSmall'
import DisciplineImg from './DisciplineImg/DisciplineImg'
import DisciplineTask from './DisciplineTask/DisciplineTask'
import DisciplineLibrary from './DisciplineLibrary/DisciplineLibrary'

// Utils
import { DisciplineSection } from '../../types'

// Custom hookss
import { useApplication } from '../../hook/useApplication'
import { useDiscipline } from '../../hook/useDiscipline'
import NotFound from '../NotFound/NotFound'
import getKeyValue from '../../utils/getKeyValue'
import { useUser } from '../../hook/useUser'

// Interface
interface Props {
  match: any
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Discipline: FC<Props> = (props) => {
  const { periodNow, groupNow, changeLocation } = useApplication()
  const {
    activeSection,
    notFound,
    getExistDisciplines,
    getExtendDiscipline,
    isDisciplineLoad,
    disciplines,
    isDisciplineExtendLoad,
  } = useDiscipline()

  const { user } = useUser()

  useEffect(() => {
    if (!isDisciplineLoad) getExistDisciplines(groupNow, periodNow, user?.id)
    else {
      if (disciplines.find((x: any) => x.disciplineId == props.match.params?.url)) {
        getExtendDiscipline(groupNow, periodNow, props.match.params.url, user?.id)
      }
    }
  }, [isDisciplineLoad, periodNow, groupNow])

  useEffect(() => {
    changeLocation([
      { original: 'discipline', value: 'Предметы', path: '/discipline' },
      {
        original: props.match.params.url,
        value: disciplines.find((x) => x.disciplineId == props.match.params?.url)?.discipline?.name || '???',
        path: '/discipline/' + props.match.params.url,
      },
    ])
  }, [isDisciplineLoad])

  if (isDisciplineLoad && !disciplines.find((x) => x.disciplineId == props.match.params?.url)) {
    return <NotFound />
  } else {
    return (
      <Fragment>
        <section className="discipline unselectable">
          <DisciplineImg />
          <DisciplinePeriod />
          <main className="discipline-main">
            {isDisciplineExtendLoad ? (
              notFound || (isDisciplineLoad && !disciplines.find((x) => x.disciplineId == props.match.params?.url)) ? (
                <NotFound />
              ) : (
                <Fragment>
                  <DisciplineHeader />
                  {getKeyValue(disciplineSectionList)(activeSection).component}
                </Fragment>
              )
            ) : (
              <div className="discipline-main__loading">
                <LoadingSmall />
              </div>
            )}
          </main>
        </section>
      </Fragment>
    )
  }
}

export default Discipline

const disciplineSectionList = {
  [DisciplineSection.OVERVIEW]: { component: <DisciplineOverview /> },
  [DisciplineSection.TASK]: { component: <DisciplineTask /> },
  [DisciplineSection.LIBRARY]: { component: <DisciplineLibrary /> },
}
