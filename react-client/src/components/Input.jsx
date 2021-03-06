import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Nav from './Nav.jsx';
import axios from 'axios';
import $ from 'jquery';
import {Redirect} from 'react-router-dom';
import ReactSpinner from 'react-spinjs';
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
      redirect: false,
      loading: false
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
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
          loading: true
        });

        setTimeout(() => {
          this.setState({
            loading: false,
            redirect: true
          });
        }, 2500)

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

  dragEnter(e) {
    e.preventDefault();
    $(e.target).css({'border-color': '#4CAF50', 'background-color': '#AAD1F8'});
  }

  dragLeave(e) {
    e.preventDefault();
    $(e.target).css({'border-color': '#000000', 'background-color': '#ffffff'});
  }

  render() {
    return (
      <div>  
        <div>
          <Nav />
        </div>
        {this.state.loading ? 
          <div>
            <ReactSpinner />
          </div> :
          <form>
            <div className="dropzone">
              <Dropzone
                className="dropzone dz-clickable"
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDrop={this.onImageDrop}
                multiple={false}
                name='file'
              >
                <div className="dz-message"> Drop a pdf or click to select a file to upload. </div>
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
        }
      </div>
    )
  }
}

export default Input;