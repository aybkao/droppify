import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Nav from './Nav.jsx';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
// import config from '../../../config.js';

const CLOUDINARY_UPLOAD_PRESET = 'dropiffy';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dropiffy/image/upload';
                                                                         
class Input extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      uploadedFile: null,
      cloudinaryUrl: '',
      fileTitle: '',
      redirect: false //if this turns true then we have a response and we should redirect via a ternary operator in the render function
    };
    this.onImageDrop = this.onImageDrop.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cloudinaryUrl !== this.state.cloudinaryUrl && this.state.cloudinaryUrl !== '') {
        this.sendUrl();
    }
  }

  sendUrl() {
    axios.post('/url', {
      url: this.state.cloudinaryUrl,
      title: this.state.fileTitle,
    })
    .then((response) => {
      console.log(response);
      console.log(this.state.uploadedFile);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onImageDrop(files) {
    let uploadedPdf = new FormData();
    uploadedPdf.append('file', files[0]);

    request.post('/upload')
      .send(uploadedPdf)
      .end((err, resp) => {
        if (err) {
          console.log('error in onImageDrop Post to /upload: ', err);
        } else {
          this.setState({
            redirect: true
          });

          return resp;
        }
      });

    this.setState({
      uploadedFile: files[0]
    });

    this.uploadToCloudinary(files[0]);
  }

  uploadToCloudinary(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url) {
        this.setState({
          cloudinaryUrl: response.body.secure_url,
          fileTitle: response.body.original_filename
        });
      }
    });
  }

  render() {
    return (
      <div>  
        <div>
          <Nav />
        </div>
        <form>
          <div className="input">
            <Dropzone
              onDrop={this.onImageDrop}
              multiple={false}
              name='file'
            >
              <div> Drop a pdf or click to select a file to upload. </div>
            </Dropzone>
          </div>
          
          <div>
            {!this.state.redirect ? null : 
              <Redirect to='/tableView'/>
            }
          </div>

          <div>
            {this.state.cloudinaryUrl === '' ? null :
              <div>
                <p> Thank you, your file is being uploaded </p>
              </div>
            }
          </div>
        </form>
      </div>
    )
  }
}

export default Input;