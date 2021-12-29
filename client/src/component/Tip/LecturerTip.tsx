import './LecturerTip.scss'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component

// Custom hooks

// Interface
interface Props {
  lecturerId?: number
  lecturerName?: string
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const LecturerTip: FC<Props> = (props) => {
  return (
    <div className="lecturer-tip unselectable">
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
    </div>
  )
}

export default LecturerTip
