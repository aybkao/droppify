import React from 'react';
import config from '/../../../config.jsx';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  
  sendPdf = (file) => {
    
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
