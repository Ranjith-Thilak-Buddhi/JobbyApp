import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="nav-items-container">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-header-logo"
              alt="website logo"
            />
          </Link>
        </div>
        <ul className="header-links-container">
          <li className="header-link-container">
            <Link to="/" className="header-link">
              Home
            </Link>
          </li>
          <li className="header-link-container">
            <Link to="/jobs" className="header-link">
              Jobs
            </Link>
          </li>
          <li className="header-button-container">
            <button
              type="button"
              className="header-logout-button"
              onClick={onClickLogOut}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
