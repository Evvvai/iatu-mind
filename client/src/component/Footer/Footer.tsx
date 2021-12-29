import { FC } from 'react'
import './Footer.scss'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Component
import { ReactComponent as GitHub } from '../../utils/img/github.svg'
import { ReactComponent as Vk } from '../../utils/img/vk.svg'
import { ReactComponent as Discord } from '../../utils/img/discord.svg'

// Interface
interface Props {}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Footer: FC<Props> = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <div className="footer-item__logo">© 2021 Iatu-Mind, Inc.</div>
        </div>
        <div className="footer-item">
          <a href="https://discord.gg/ewWZ9ZgVgX" className="footer-item__etc link">
            <Discord className="footer-item__ico" />
          </a>
          <a href="https://vk.com/public145541417" className="footer-item__etc link">
            <Vk className="footer-item__ico" />
          </a>
          <a href="https://github.com/Evvvai/iatu-mind-frontend" className="footer-item__etc link">
            <GitHub className="footer-item__ico" />
          </a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
