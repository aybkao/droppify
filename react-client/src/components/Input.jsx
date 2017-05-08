import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        <input type="file" id="pdf-file"></input>
      </div>
    );
  }
}

export default Input;
