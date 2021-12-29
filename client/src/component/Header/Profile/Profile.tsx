import './Profile.scss'
import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import components
import { ReactComponent as Expand } from '../../../utils/img/expand_more_white.svg'
import { ReactComponent as Auth } from '../../../utils/img/auth.svg'

// Custom Hooks
import { useUser } from '../../../hook/useUser'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Profile: FC<Props> = () => {
  const { isLoggedIn, removeUserSetting } = useUser()

  const [state, setState] = useState<boolean>(false)

  if (!isLoggedIn)
    return (
      <div className="profile-header">
        <Link to="/signin" className="profile-header-signin link">
          <Auth />
        </Link>
      </div>
    )

  return (
    <div className="profile-header">
      <Link className="profile-header-img link" to={'/' + 'userInfo'}>
        {/* {userInfo.avatarUrl !== null ? (
          <img src={userInfo.avatarUrl} alt="nope"></img>
        ) : ( */}
        <img
          src="https://firebasestorage.googleapis.com/v0/b/trick-a871a.appspot.com/o/image%2Fnoneavatar.jpg?alt=media&token=47945346-3fb8-408f-a0f4-fe28e8e3c18b"
          alt="nope"
        ></img>
        {/* )} */}
      </Link>
      <div onClick={() => setState(!state)} className={cn('profile-header-info', { active: state })}>
        <Expand />
      </div>
      <div onClick={() => setState(false)} className={cn('profile-header-propaginaion', { active: state })}></div>
      <div className={cn('profile-header-tip', { active: state })}>
        <div className={cn('profile-header-tip__header', { active: state })}>
          <div className="profile-header-tip__avatar avatar-content">
            <div className="avatar-content__back">
              {/* {userInfo.dashboardUrl !== null ? (
                <img src={userInfo.dashboardUrl} alt="nope"></img>
              ) : ( */}
              <img
                src="https://firebasestorage.googleapis.com/v0/b/trick-a871a.appspot.com/o/image%2Fdashboard.gif?alt=media&token=e2bb410b-bde1-475d-9baa-bfd9a71f6f11"
                alt="nope"
              ></img>
              {/* )} */}
            </div>
          </div>
          <div className="profile-header-tip__info info-content">
            <div className="info-content__nickname"></div>
            <div className="info-content__steamid">"</div>
          </div>
        </div>
        <Link
          onClick={() => setState(false)}
          to={'userInfo'}
          className={cn('profile-header-tip__item link', { active: state })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 5v14H5V5h14m0-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 10H6v-1.53c0-2.5 3.97-3.58 6-3.58s6 1.08 6 3.58V18zm-9.69-2h7.38c-.69-.56-2.38-1.12-3.69-1.12s-3.01.56-3.69 1.12z" />
          </svg>
          <div>Профиль</div>
        </Link>
        <Link
          onClick={() => setState(false)}
          to={'settings'}
          className={cn('profile-header-tip__item link', { active: state })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
          <div>Настройки</div>
        </Link>
        <Link
          onClick={() => {
            setState(false)
            removeUserSetting()
          }}
          to={'signin'}
          className={cn('profile-header-tip__item link', { active: state })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
          <div>Выйти</div>
        </Link>
      </div>
    </div>
  )
}

export default Profile
