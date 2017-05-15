import React from 'react';
import {AppBar, Tabs, Tab} from 'material-ui';
const Link = require('react-router-dom').Link;
const NavLink = require('react-router-dom').NavLink;

const toLogin = () => (
 location='/auth/google'
)

const toSignup = () => (
 parent.location='https://accounts.google.com/SignUp?hl=en'
)

const Nav = (props) => (
  <div>
  <div>
    <AppBar
      className='appBar'
      title='Droppiffy'
      iconClassNameRight='muidocs-icon-navigation-expand-more'
      
    >
      <Tabs className='tabs navTab'>
        <Tab label="Import pdfs" containerElement={<NavLink exact activeClassName='active' to='/'></NavLink>}/>
        <Tab label="Login" onClick={toLogin}/>
        <Tab label="Signup" onClick={toSignup}/>
        <Tab label="View Tables" containerElement={<NavLink activeClassName='active' to='/tableView'></NavLink>} />
      </Tabs>
    </AppBar>
  </div>
  </div>
)

export default Nav;