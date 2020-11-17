import React, { Component } from "react"

import UserService from "../services/user-service"

export default class UserBoard extends Component {
    state = {
        content: ''
    }

    componentDidMount() {
        UserService.getAdminBoard()
            .then(
                response => {
                    this.setState(() => ({
                        content: response.data
                    }))
                },
                error => {
                    this.setState(() => ({
                        content: (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    }))
                }
            )
    }

    render() {
        return (
            <div className="container">
                <header className='jumbotron'>
                    <h1>ADMIN PAGE</h1>
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        )
    }
}