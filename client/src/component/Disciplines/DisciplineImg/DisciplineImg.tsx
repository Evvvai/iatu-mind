import React from 'react'
import { FC } from 'react'
import './DisciplineImg.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import Back from '../../../utils/img/here.png'
import Gray from '../../../utils/img/gray_blur.png'
import { Breadcrumbs, Chip, emphasize, styled } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useApplication } from '../../../hook/useApplication'

// Utils

// Custom hookss

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplineImg: FC<Props> = (props) => {
  const { location } = useApplication()

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
  }

  return (
    <div className="disciplines-img">
      <div
        className="disciplines-img__image"
        style={{
          backgroundImage: `url(${Gray}), url(${Back})`,
        }}
      ></div>
      <div className="disciplines-img__bread" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          {location.length > 1 &&
            location.map((val, key) => {
              return (
                <Link key={key} className="link" to={val.path}>
                  {val.value}
                </Link>
              )
            })}
        </Breadcrumbs>
      </div>
    </div>
  )
}

export default DisciplineImg
