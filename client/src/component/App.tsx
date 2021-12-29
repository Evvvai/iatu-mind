import './App.scss'
import React, { FC, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import updateLocale from 'dayjs/locale/ru'

// Import components
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Header from './Header/Header'
import Aside from './Header/Aside/Aside'
import Footer from './Footer/Footer'

import Home from './Home/Home'
import Schedule from './Schedule/Schedule'
import DisciplinesList from './Disciplines/DisciplinesList/DisciplinesList'
import Discipline from './Disciplines/Discipline'
import DisciplineLogs from './Disciplines/DisciplineLogs/DisciplineLogs'
import Profile from './Profile/Profile'

// Auth
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'

// Custom hooks
import { useApplication } from '../hook/useApplication'
import Loading from './Loading/Loading'

// Utils
import { Snackbar } from '@material-ui/core'
import { Alert } from '../utils'
import dayjs from 'dayjs'

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const App: FC<any> = () => {
  const { isLoad, initApp, error, clearError } = useApplication()

  const [minDelay, setMinDelay] = useState<boolean>(false)

  useEffect(() => {
    initApp()
    setTimeout(() => setMinDelay(true), 1000)

    dayjs.extend(relativeTime)
    dayjs.extend(duration)
    dayjs.locale('ru')
  }, [])

  if (!isLoad || !minDelay) {
    return (
      <div className="main-loading">
        <Loading />
      </div>
    )
  }

  return (
    <React.Fragment>
      <Header />
      <Aside />

      <main className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/discipline" component={DisciplinesList} />
          <Route exact path="/discipline/logs" component={DisciplineLogs} />
          <Route exact path="/discipline/:url" component={Discipline} />
          <Route exact path="/schedule" component={Schedule} />

          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/reset-password" component={SignUp} />

          <Route path="/:login" component={Profile} />
        </Switch>
      </main>
      <Footer />

      <Snackbar
        autoHideDuration={4000}
        className="tr-snackbar"
        open={error.isActive}
        onClose={() => {
          clearError()
        }}
      >
        <Alert
          onClose={() => {
            clearError()
          }}
          severity="error"
        >
          {error.info}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default App
