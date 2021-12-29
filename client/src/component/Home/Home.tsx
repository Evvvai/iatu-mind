import './Home.scss'
import React, { FC, useEffect, useRef, useState } from 'react'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import Loading from '../Loading/Loading'
import ScheduleTicket from '../Schedule/ScheduleTicket/ScheduleTicket'
import { Button, Drawer } from '@material-ui/core'
import ToolTip from '../../utils/CustomTooltip'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const FancyButton = React.forwardRef((props, ref: any) => <button ref={ref}>{props.children}</button>)

const Home: FC<Props> = (props) => {
  // const ref = React.createRef()
  const ref = useRef()

  // useEffect(() => {
  //   console.log('ref', ref)
  // }, [ref])

  return (
    <section onClick={(e: any) => {}} className="home">
      {/* <FancyButton ref={ref} /> */}
      {/* <ToolTip content={<div>aaaaaaaa</div>} placement={'bottom'}>
        <div style={{ backgroundColor: 'red' }}>AASJDJAssssssaaaaD</div>
      </ToolTip> */}
      <img
        src={'https://user-images.githubusercontent.com/66115913/132265293-72835d4b-b2bd-4555-9ad5-9678768f1a18.gif'}
        alt={'aa'}
      ></img>
    </section>
  )
}

export default Home
