import React from 'react';
// import AppBar from 'material-ui/AppBar';
const Link = require('react-router-dom').Link;
const NavLink = require('react-router-dom').NavLink;

const Nav = (props) => (
  <ul className='nav'>
   <li>
    <NavLink exact activeClassName='active' to='/'>
      Import pdfs
    </NavLink>
   </li>

   <li>
    <a href="/auth/google">Login</a>
   </li>
   
   <li>
    <a href="https://accounts.google.com/SignUp?hl=en-GB">Signup</a>
   </li>

   <li>
    <NavLink activeClassName='active' to='/tableView'>
      TableView
    </NavLink>
   </li>
  </ul>
)

export default Nav;
    // <AppBar
    //   title='Droppiffy'
    //   iconClassNameRight='muidocs-icon-navigation-expand-more'
    // />