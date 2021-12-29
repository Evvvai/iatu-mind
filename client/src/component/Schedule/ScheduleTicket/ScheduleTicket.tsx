import './ScheduleTicket.scss'
import React, { FC, useMemo, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import parse from 'html-react-parser'
import cn from 'classnames'

// Import components
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Svg
import { ReactComponent as Close } from '../../../utils/img/close.svg'
import { ReactComponent as Lock } from '../../../utils/img/lock.svg'
import { ReactComponent as Back } from '../../../utils/img/back.svg'
import { ReactComponent as Submit } from '../../../utils/img/submit.svg'

// Custom hook
import { useUser } from '../../../hook/useUser'
import { useSchedule } from '../../../hook/useSchedule'
import { useApplication } from '../../../hook/useApplication'
import { Ticket } from '@types'

// Utils

// Interface
interface Props {
  date?: any
  setShow: any
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ScheduleTicket: FC<Props> = (props) => {
  const { groupNow } = useApplication()
  const { user } = useUser()
  const { createTicket, tickets } = useSchedule()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  const availableTickets = useMemo(
    () => tickets.filter((x) => new Date(x?.dateAdd).toDateString() === new Date(props.date).toDateString()),
    [tickets]
  )

  const handleOnClickSubmit = (e: any) => {
    createTicket(groupNow, props.date, text)
    setText('')
    setIsEdit(false)
  }

  return (
    <div className={cn('l-ticket unselectable', { active: props.setShow.isActive })}>
      <section onClick={(e) => e.stopPropagation()} className="ticket-main">
        <div className="ticket-header">
          <div className="ticket-header__title">
            <h1>Примечание к расписанию</h1>
            {/* <span>...текст...</span> */}
          </div>
          <div onClick={(e: any) => props.setShow(false)} className="ticket-header__close">
            <Close />
          </div>
        </div>
        <hr className="ticket-hr" />
        <div className="ticket-content">
          {isEdit ? (
            <div className="ticket-editor">
              {user.role === 'admin' ? (
                <div className="ticket-editor__content">
                  <CKEditor
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event: any, editor: any) => {
                      const data = editor.getData()
                      setText(data)
                    }}
                  />
                  {/* <div>
                    <p>{text}</p>
                  </div> */}
                </div>
              ) : (
                <div className="ticket-editor__lock">
                  <Lock />
                </div>
              )}
            </div>
          ) : (
            <div className="ticket-text">
              {/* Need to do more beautiful things */}
              {availableTickets?.map((val, key) => {
                return (
                  <div className="ticket-text-item">
                    <div>{parse(val.text)}</div>
                    <hr />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="ticket-add">
          <button
            onClick={(e) => setIsEdit(false)}
            className={cn('ticket-add__button back', { active: !isEdit })}
            type="button"
          >
            {/* <Back /> */}
            <span>Назад</span>
          </button>
          <button
            onClick={(e) => setIsEdit(true)}
            className={cn('ticket-add__button add', { active: isEdit })}
            type="button"
          >
            Добавить
          </button>
          <button
            onClick={handleOnClickSubmit}
            className={cn('ticket-add__button submit', { active: !isEdit })}
            type="button"
          >
            <span>Отправить</span>
            {/* <Submit /> */}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ScheduleTicket
