// dependency imports
import React, { Component } from 'react';
import axios from 'axios'

export default class Signup extends Component {

    state = {
        name: '',
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
        axios.post('/auth/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then( res => {
            if (res.data.type === 'error') {
                console.log('error: ', res.data.message)
            } else {
                localStorage.setItem('mernToken', res.data.token)
                this.props.liftToken(res.data)
            }
        }).catch( err => {
            // Rate limiter error
            this.setState({
                message: 'Maximum accounts exceeded. Please try again later.'
            })
        })
    }

    render() {
        return (
            <div className='Signup'>
                <input onChange={this.handleInputChange} value={this.state.name} type='text' name='name' placeholder='Enter your name...' /><br />
                <input onChange={this.handleInputChange} value={this.state.email} type='email' name='email' placeholder='Enter your email...' /><br />
                <input onChange={this.handleInputChange} value={this.state.password} type='password' name='password' placeholder='Enter a password...' /><br />
                <button onClick={this.handleSubmit}>Sign Up</button>
            </div>
        )
    }
}