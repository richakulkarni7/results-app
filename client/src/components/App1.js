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
import Home from './Home';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Home/>
    );
  }
}

export default App;