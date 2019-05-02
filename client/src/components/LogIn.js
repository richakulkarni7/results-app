import React, { Component } from 'react';
import { Icon, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class LogIn extends React.Component {
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
        axios.post('http://localhost:4000/api/results/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

  render() {
    if (this.state.redirectTo) 
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    else return (
      <div style = {{width: '30%', margin: '30px auto'}}>
        <div>
          <Input name = "username" onChange = {this.handleChange}  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        </div>
        <div>
          <Input name = "password" onChange = {this.handleChange}  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        </div>
        <Button type="primary" onClick = {this.handleSubmit} className="login-form-button">
          Log In
        </Button>
      </div> 
      );
  }
}

