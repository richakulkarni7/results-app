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
const SubMenu = Menu.SubMenu;

class App extends Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

  state = {
    openKeys: [],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

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
          <Menu
            theme = "dark"
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            <SubMenu key="sub1" title={<span><span>Faculty</span></span>}>
             <Menu.Item key="1"> <Link to = "/faculty/see">See Faculty</Link></Menu.Item>
              <Menu.Item key="2"><Link to = "/faculty/add">Add Faculty</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><span>Subjects</span></span>}>
              <Menu.Item key="5"><Link to = "/subjects/see">See Subjects</Link></Menu.Item>
              <Menu.Item key="6"><Link to = "/subjects/add">Add Subjects</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><span>Classes</span></span>}>
              <Menu.Item key="5"><Link to = "/classes/see">See Classes</Link></Menu.Item>
              <Menu.Item key="6"><Link to = "/classes/add">Add Classes</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><span>Marks</span></span>}>
              <Menu.Item key="9"><Link to = "/marks/see">See Marks</Link></Menu.Item>
              <Menu.Item key="10"><Link to = "/marks/add">Add Marks</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route exact path = "/" render = {() => <h1 style = {{textAlign: 'center'}}>results-app</h1>}/>
                <Route path="/faculty/:op" component = {Faculty}/>
                <Route path="/classes/:op" component={SClass} />
                <Route path="/subjects/:op" component={Subject} />
                <Route path="/marks/:op" component={Marks} />
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
