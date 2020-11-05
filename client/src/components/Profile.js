import React, { Component } from 'react'
import AuthService from '../services/auth-service'

export default class Profile extends Component {

  // Consider componetDidMount lifecycle
  state = {
    currentUser: AuthService.getCurrentUser()
  }

  render() {

    const { currentUser } = this.state

    if (!currentUser) {
      return (
        <div className="container text-center mt-5">
          <h3>No user logged in</h3>
        </div>
      )
    }

    return (
      <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>{" "}
        {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong>{" "}
        {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong>{" "}
        {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
    )
  }
}