import React from 'react';

const SearchBar = (props) => (
  <div>
    <h4> SearchBar </h4>
    <input type='text' value='value' onChange={props.handleChange.bind(this, )}/>
    <input type='button' value='Submit' onClick={props.handleClick}/>
  </div>
)

export default SearchBar;