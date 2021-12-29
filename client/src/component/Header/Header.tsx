import './Header.scss'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import Aside from './Aside/Aside'
import Profile from './Profile/Profile'
import GroupSelector from './GroupSelector/GroupSelector'
import SearchBar from './SearchBar/SearchBar'

import { ReactComponent as Menu } from '../../utils/img/menu.svg'

// Custom hooks
import { useApplication } from '../../hook/useApplication'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Header: FC<Props> = (props) => {
  const { isAsideOpen, openAside, closeAside } = useApplication()

  return (
    <header className="header unselectable">
      <Menu
        onMouseEnter={(e) => openAside()}
        onClick={(e) => {
          isAsideOpen ? closeAside() : openAside()
        }}
        className="header__menu"
      />
      {/* <div className="header__tab">Расписани</div> */}
      <SearchBar />
      <GroupSelector />
      <Profile />
    </header>
  )
}

export default Header
