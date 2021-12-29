import { FC } from 'react'
import './NotFound.scss'

import NotFoundIcon from '../../utils/img/not_found.png'

const NotFound: FC<any> = () => {
  return (
    <div className="not-found">
      <img className="not-found__icon" src={NotFoundIcon} />
      <h1 className="not-found__title">Ничего не найдено</h1>
    </div>
  )
}

export default NotFound
