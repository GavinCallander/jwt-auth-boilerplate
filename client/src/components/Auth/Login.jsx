// dependency imports
import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    state = {
        email: '',
        password: '',
        message: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then( res => {
            if (res.data.type === 'error') {
                this.setState({
                    message: res.data.message
                })
            } else {
                localStorage.setItem('mernToken', res.data.token)
                this.props.liftToken(res.data)
            }
        }).catch( err => {
            this.setState({
                message: 'Maximum login attempts exceeded'
            })
        })
    }
    
    render() {
        <div className='Login'>
            <input onChange={this.handleInputChange} value={this.state.email} type='email' name='email' placeholder='Enter your email...' />
            <input onChange={this.handleInputChange} value={this.state.password} type='password' name='password' placeholder='Enter your password...'/>
            <button onClick={this.handleSubmit}>Login</button>
        </div>
    }
}