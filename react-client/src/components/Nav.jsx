import React from 'react';
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
    <NavLink activeClassName='active' to='/login'>
      Login
    </NavLink>
   </li>
   
   <li>
    <NavLink activeClassName='active' to='/signup'>
      signup
    </NavLink>
   </li>

   <li>
    <NavLink activeClassName='active' to='/tableView'>
      TableView
    </NavLink>
   </li>
  </ul>
)

export default Nav;