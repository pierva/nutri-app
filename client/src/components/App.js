import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Link, Route } from 'react-router-dom'

import '../style/index.scss'

import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Home from './Home'
import UserBoard from './UserBoard'
import AdminBoard from './AdminBoard'

import { logout } from '../actions/auth'
import { clearMessage } from '../actions/message'
import { history } from '../helpers/history'

class App extends Component {
  state = {
    showAdmin: false,
    currentUser: undefined
  }

  componentDidMount() {
    history.listen((location) => {
      // clear message when navigating
      this.props.dispatch(clearMessage())
    })

    const user = this.props.user

    if (user) {
      this.setState(() => ({
        currentUser: user,
        showAdmin: user.roles.includes('ROLE_ADMIN')
      }))
    }
  }

  logout() {
    this.props.dispatch(logout())
  }

  render() {
    const { currentUser, showAdmin } = this.state

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              YOUR BRAND
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/home'} className="nav-link">
                  Home
                </Link>
              </li>

              {showAdmin && (
                <li className="nav-item">
                  <Link to={'/admin'} className="nav-link">
                    Admin page
                  </Link>
              </li>
              )}
              {currentUser && (
                <li className='nav-item'>
                  <Link to={'/user'} className="nav-link">
                    User Page
                  </Link>
                </li>
              )}

              </div>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={'/profile'} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logout}>
                      LOGOUT
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" componenet={UserBoard} />
              <Route path="/admin" componenet={AdminBoard} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth
  return {
    user
  } 
}
export default connect(mapStateToProps)(App)
