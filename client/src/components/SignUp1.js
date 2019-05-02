import React, { Component } from 'react';
import { Icon, Input, Button } from 'antd';
import axios from 'axios';

export default class SignUp extends React.Component {
  
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
    axios.post('http://localhost:4000/api/results/adduser', this.state)
    .then(res => console.log(res));
  }

  render() {
    return (
      <div style = {{width: '30%', margin: '30px auto'}}>
        <div>
          <Input name = "username" onChange = {this.handleChange}  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        </div>
        <div>
          <Input name = "password" onChange = {this.handleChange}  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        </div>
        <Button type="primary" onClick = {this.handleSubmit} className="login-form-button">
          Sign Up
        </Button>
      </div> 
    );
  }
}

