import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import '../styles/App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';

import SignUp from './SignUp1';
import LogIn from './LogIn';
import Home from './Home';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }    
  }

  componentDidMount() {
    this.getUser()
  }

  /*componentDidUpdate() {
    if(!this.state.loggedIn)
      this.getUser()
  }*/

  updateUser = (userObject) => {
    this.setState(userObject)
  }

  getUser = () => {
    axios.get('http://localhost:4000/api/results/checklogin').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Route
          exact path="/"
          render = {() => <Home user = {this.state.username}/>} />
        <Route
          path="/login"
          render={() =>
            <LogIn updateUser = {this.updateUser}/>}
        />
        <Route
          path="/signup"
          render={() =>
            <SignUp/>}
        />
      </div>
      </Router>
    );
  }
}

export default App;