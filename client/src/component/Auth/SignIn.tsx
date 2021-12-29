import { FC, useState } from 'react'
import './Auth.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component

import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

// Custom hooks
import { useUser } from '../../hook/useUser'

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const SignIn: FC<any> = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { signIn, error } = useUser()

  let history = useHistory()

  const clickSubmitHandler = async (e?: any) => {
    await signIn(
      {
        login,
        password,
      },
      history
    )

    setPassword('')
  }

  const clickSwitchHandler = (e: any) => {
    history.push('/signup')
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      clickSubmitHandler()
    }
  }

  return (
    <section className="auth">
      <div onKeyPress={handleKeyDown} className="auth__content">
        <header className="auth-header">
          <h1 className="auth-header__title">Войдите в свой аккаунт</h1>
        </header>
        {error?.message && (
          <div className="auth-errors">
            {error?.message.map((x: any) => {
              return <span className="auth-errors__text">{x}</span>
            })}
          </div>
        )}
        <form className="auth-form form-group">
          <div className="form-group login">
            <label className="form-group__label">ЛОГИН</label>
            <input
              className="form-group__input"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
              type="text"
              // placeholder="Логин"
            />
          </div>
          <div className="form-group password">
            <label className="form-group__label">ПАРОЛЬ</label>
            <input
              className="form-group__input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              // placeholder="Пароль"
            />
          </div>
          <div className="form-group additional">
            <div>Запомнить?...конечно!</div>
            <Link className="form-group__reset" to={'reset-password'}>
              Забыли пароль?
            </Link>
          </div>
          <div className="form-group submit">
            <button onClick={clickSubmitHandler} className="form-group__submit" type="button">
              Войти
            </button>
          </div>
        </form>
        <footer className="auth-footer">
          <span className="auth-footer__title">Неужто новенький!?</span>
          <button onClick={clickSwitchHandler} className="auth-footer__button">
            Регистрация
          </button>
        </footer>
      </div>
    </section>
  )
}

export default SignIn
