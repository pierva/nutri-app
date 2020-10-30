import React, { Component } from 'react'
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import AuthService from "../services/auth-service"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

export default class Login extends Component {

  state = {
    username: '',
    password: '',
    loading: false,
    message: ''
  }

  onChangeUsername = (e) => {
    this.setState(() => ({
      username: e.target.value
    }))
  }

  onChangePassword = (e) => {
    this.setState(() => ({
      password: e.target.value
    }))
  }

  handleLogin = (e) => {
    e.preventDefault()

    this.setState(() => ({
      message: '',
      loading: true
    }))

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password)
        .then(() => {
          this.props.history.push('/profile')
          window.location.reload()
        },
        error => {
          const resMessage = (error.response && error.response.data && 
              error.response.data.message) || error.message || error.toString()
          
          this.setState(() => ({
            loading: false,
            message: resMessage
          }))
        }
      )
    } else {
      this.setState(() => ({
        loading: false
      }))
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    )
  }
}