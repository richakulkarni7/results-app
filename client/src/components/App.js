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
import Faculty from './Faculty';
import SClass from './SClass';
import Subject from './Subject';
import Marks from './Marks';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    let that = this;
    return (
      <Router>
        <Layout style = {{height: '100vh'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to = "/faculty">
                <Icon type="user" />
                <span className="nav-text">Faculty</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to = "/classes">
                <Icon type="video-camera" />
                <span className="nav-text">Classes</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to = "/subjects">
                <Icon type="upload" />
                <span className="nav-text">Subjects</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to = "/marks">
                <Icon type="user" />
                <span className="nav-text">Marks</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route path="/faculty" component={Faculty} />
                <Route path="/classes" component={SClass} />
                <Route path="/subjects" component={Subject} />
                <Route path="/marks" component={Marks} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
