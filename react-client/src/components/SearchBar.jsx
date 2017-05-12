import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Search = ({handleChange, handleClick}) => (
  <div>
    <input type='text' value='value' onChange={handleChange.bind(this, )}/>
    <input type='button' value='Submit' onClick={handleClick}/>
  </div>
)

export default Search;