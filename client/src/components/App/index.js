// dependency imports
import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
    
    state = {
        token: '',
        user: null,
        errorMessage: '',
        lockedResult: ''
    }

    checkForLocalToken = () => {
        // check localStorage for token
        let token = localStorage.getItem('mernToken')
        if (!token || token === 'undefined') {
            // there is no token
            localStorage.removeItem('mernToken')
            this.setState({
                token: '',
                user: null
            })
        } else {
            // found a token, send it for verification
            axios.post('/auth/me/from/token', {token})
            .then( res => {
                if (res.data.type === 'error') {
                    localStorage.removeItem('mernToken')
                    this.setState({
                        errorMessage: res.data.message
                    })
                } else {
                    // put the token in localStorage
                    localStorage.setItem('merntoken', res.data.token)
                    // put token in state
                    this.setState({
                        token: res.data.token,
                        user: res.data.user
                    })
                }
            })
        }
    }

    componentDidMount = () => {
        this.checkForLocalToken()
    }

    liftTokenToState = ({user, token}) => {
        this.setState({
            token,
            user
        })
    }

    logout = () => {
        // remove token from localStorage
        localStorage.removeItem('mernToken')
        // remove token and user from state
        this.setState({
            token: '',
            user: null
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        // alt = axios.default.headers.common['Authorization'] = `Bearer ${this.state.token}`
        let config = {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        }
        axios.get('/locked/test', config).then( res => {
            console.log('this is the locked response:')
            this.setState({
                lockedResult: res.data
            })
        })
    }

    render() {
        let user = this.state.user
        let contents;
        if (user) {
            contents = (
                <>
                </>
            )
        } else {
            contents = (
                <>

                </>
            )
        }
        return (
            <div className='App'>
                { contents }
            </div>
        )
    }
}