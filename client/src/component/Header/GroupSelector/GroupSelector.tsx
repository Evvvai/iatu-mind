import './GroupSelector.scss'
import { FC, Fragment, useMemo } from 'react'

import cn from 'classnames'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as Close } from '../../../utils/img/close.svg'

// Custom hooks
import { useApplication } from '../../../hook/useApplication'
import { Group } from '../../../types'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const GroupSelector: FC<Props> = (props) => {
  const { isGroupSelectorOpen, groups, groupNow, changeGroup, openGroupSelector, closeGroupSelector } = useApplication()

  const handleClickMenu = () => {
    isGroupSelectorOpen ? closeGroupSelector() : openGroupSelector()
  }

  const handleClickGroup = (group: Group) => () => {
    changeGroup(group)
    closeGroupSelector()
  }

  const getGroups = (groupName: string) => {
    return groups.filter((x: any) => {
      const g = x.name?.split('-')
      return g[0] === groupName
    })
  }

  const uniqueGroups = useMemo(() => {
    let arr: any[] = []
    groups.forEach((x: any) => {
      const g = x.name?.split('-')
      if (arr.find((x) => x === g[0]) === undefined && g[0] !== 'Неизвестая группа') arr.push(g[0])
    })
    return arr
  }, [groups])

  return (
    <Fragment>
      <div className="group-selector" onClick={handleClickMenu}>
        <span>{groupNow?.name || 'Не выбрана'}</span>
      </div>
      {isGroupSelectorOpen && (
        <Fragment>
          <div className="group-selector-background">
            <header className="group-selector-header">
              <span className="group-selector-title">Выберите группу</span>
              <Close onClick={handleClickMenu} className="group-selector-close" />
            </header>
            <div className="group-selector-menu">
              {uniqueGroups.map((x, key) => {
                return (
                  <div key={key} className="group-selector-menu__content">
                    <span>{x}</span>
                    <ul>
                      {getGroups(x).map((y, key) => {
                        return (
                          <li key={key} onClick={handleClickGroup(y)}>
                            {y.name}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="group-selector-background-blur" onClick={handleClickMenu} />
        </Fragment>
      )}
    </Fragment>
  )
}

export default GroupSelector
