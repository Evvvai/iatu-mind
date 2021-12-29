import './Loading.scss'
import React, { FC } from 'react'

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ReactComponent as LoadingIcon } from '../../utils/img/loading.svg'

const LoadingSmall: FC<any> = () => {
  return (
    <div className="loader-small unselectable">
      <div className="loader-small__inner">
        <LoadingIcon />
      </div>
    </div>
  )
}

export default LoadingSmall
