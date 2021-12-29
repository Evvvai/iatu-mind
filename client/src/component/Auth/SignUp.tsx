import { FC, Fragment, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import './Auth.scss'

import ReCAPTCHA from 'react-google-recaptcha'
import cn from 'classnames'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

// Custom hooks
import { useUser } from '../../hook/useUser'

// Etc
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const SignUp: FC<any> = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')
  const [captchaАccess, setСaptchaАccess] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const { signUp, error } = useUser()

  const captcha = useRef<any>(null)

  let history = useHistory()

  const clickSubmitHandler = async (e: any) => {
    if (!captchaАccess) {
      setOpen(true)
    }

    await signUp(
      {
        firstName,
        lastName,
        email,
        login,
        password,
        rePassword,
      },
      history
    )

    setPassword('')
    setRePassword('')
  }

  const clickSwitchHandler = (e: any) => {
    history.push('/signin')
  }

  const ReCAPTCHAHandler = (e: any) => {
    if (captcha.current.getValue()) {
      setСaptchaАccess(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      <section className="auth">
        <div className="auth__content">
          <header className="auth-header">
            <h1 className="auth-header__title">Регистрация</h1>
          </header>
          {error?.message && (
            <div className="auth-errors">
              {error?.message.map((x: any) => {
                return <span className="auth-errors__text">{x}</span>
              })}
            </div>
          )}
          <form className="auth-form form-group">
            <div className="form-group firstname error">
              <label className="form-group__label">ИМя</label>
              <input
                className={cn('form-group__input', {
                  error: error?.message?.some((x: any) => x.includes('firstName')),
                })}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                name="firstName"
              />
            </div>
            <div className="form-group lastName">
              <label className="form-group__label">ФАМИЛИЯ</label>
              <input
                className={cn('form-group__input', { error: error?.message?.some((x: any) => x.includes('lastName')) })}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                name="lastName"
                // placeholder="Логин"
              />
            </div>
            <div className="form-group email">
              <label className="form-group__label">Почта</label>
              <input
                className={cn('form-group__input', { error: error?.message?.some((x: any) => x.includes('email')) })}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                name="email"
                autoComplete="email"
                aria-invalid="true"
                // placeholder="Почта"
              />
            </div>
            <div className="form-group login">
              <label className="form-group__label">ЛОГИН</label>
              <input
                className={cn('form-group__input', { error: error?.message?.some((x: any) => x.includes('login')) })}
                onChange={(e) => setLogin(e.target.value)}
                value={login}
                type="text"
                autoComplete="username"
                name="username"
                // placeholder="Логин"
              />
            </div>
            <div className="form-group password">
              <label className="form-group__label">ПАРОЛЬ</label>
              <input
                className={cn('form-group__input', { error: error?.message?.some((x: any) => x.includes('password')) })}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                autoComplete="new-password"
                name="new-password"
                // placeholder="Пароль"
              />
            </div>
            <div className="form-group repassword">
              <label className="form-group__label">ПОДТВЕРЖДЕНИЕ ПАРОЛЯ</label>
              <input
                className={cn('form-group__input', {
                  error: error?.message?.some((x: any) => x.includes('rePassword')),
                })}
                onChange={(e) => setRePassword(e.target.value)}
                value={rePassword}
                type="password"
                name="password-confirm"
                // placeholder="Повторите Пароль"
              />
            </div>
            <div className="form-group captcha">
              <ReCAPTCHA
                ref={captcha}
                theme={'dark'}
                sitekey={'6LdkSX4cAAAAAP7XuUwlHxYn3qbfFTGBU7AV2sH_'}
                onChange={ReCAPTCHAHandler}
              ></ReCAPTCHA>
            </div>
            <div className="form-group submit">
              <button onClick={clickSubmitHandler} className="form-group__submit" type="button">
                Регистрация
              </button>
            </div>
          </form>
          <footer className="auth-footer">
            <span className="auth-footer__title">Имеется аккаунт!?</span>
            <button onClick={clickSwitchHandler} className="auth-footer__button">
              Войти
            </button>
          </footer>
        </div>
      </section>
      <Snackbar autoHideDuration={4000} className="tr-snackbar" open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Капча не пройдена
        </Alert>
      </Snackbar>
    </Fragment>
  )
}

export default SignUp
