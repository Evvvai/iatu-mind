import React from 'react'
import { FC } from 'react'
import './DisciplinePeriod.scss'

import GrayScrollLeft from '../../../utils/img/gray_blur_h.png'
import GrayScrollRight from '../../../utils/img/gray_blur_rh.png'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component

// Utils
import cn from 'classnames'
import { Period } from '@types'
import { CustomScroll } from '../../../utils'

// Custom hookss
import { useApplication } from '../../../hook/useApplication'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DisciplinePeriod: FC<Props> = (props) => {
  const { changePeriod, periods, periodNow, groupNow } = useApplication()

  const handleClickChangePeriod = (period: Period) => {
    changePeriod(period)
  }

  return (
    <div className="disciplines-period">
      {/* <button className="disciplines-period__scroll left">R</button> */}
      <CustomScroll>
        <div className="disciplines-period__content">
          {periods.map((val, key) => {
            return (
              <React.Fragment key={key}>
                <button
                  onClick={() => handleClickChangePeriod(val)}
                  className={cn('disciplines-period__item', { active: val.id === periodNow.id })}
                  key={key + val.id + 'button'}
                >
                  {val.year}-{val.half}
                </button>
                <span className="disciplines-period__item hr" key={key + val.id + 'span'} />
              </React.Fragment>
            )
          })}
        </div>
      </CustomScroll>
      {/* <button className="disciplines-period__scroll right">L</button> */}
      <div
        style={{
          backgroundImage: `url(${GrayScrollLeft}), url(${GrayScrollRight})`,
        }}
        className="disciplines-period__background"
      />
    </div>
  )
}

export default DisciplinePeriod
