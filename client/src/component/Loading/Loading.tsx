import './Loading.scss'
import React, { FC } from 'react'

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ReactComponent as LoadingIcon } from '../../utils/img/loading.svg'

const Loading: FC<any> = () => {
  return (
    <div className="loader unselectable">
      <span>
        <div>T</div>
      </span>
      <span>
        <div>I</div>
      </span>
      <span>
        <div>U</div>
      </span>
      <span>
        <div>A</div>
      </span>
      <div className="loader__mind">
        <div>M</div>
        <div>I</div>
        <div>D</div>
        <div>N</div>
      </div>
      <div className="loader__inner">
        <LoadingIcon />
      </div>
    </div>
  )
}

export default Loading
