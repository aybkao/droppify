import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Nav from './Nav.jsx';
import axios from 'axios';
// import config from '../../../config.js';

const CLOUDINARY_UPLOAD_PRESET = 'dropiffy';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dropiffy/image/upload';
                                                                         
class Input extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      uploadedFile: null,
      cloudinaryUrl: '',
      fileTitle: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cloudinaryUrl !== this.state.cloudinaryUrl && this.state.cloudinaryUrl !== '') {
      console.log('component did update')
      this.sendUrl();
    }
  }

  sendUrl() {
    axios.post('/url', {
    url: this.state.cloudinaryUrl,
    title: this.state.fileTitle
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    console.log(`this is the file: ${file}`);
  
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

        console.log('this is the response body: ', response.body);
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