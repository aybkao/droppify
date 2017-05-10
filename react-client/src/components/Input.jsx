import React from 'react';
import config from '../../../config.js';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'dropiffy';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dropiffy/image/upload';
                                                                         
class Input extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
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

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });

        console.log('this is the response: ', response);
      }
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop}
            multiple={false}
            name='file'
          >
            <div> Drop a pdf or click to select a file to upload. </div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </form>
    )
  }
}

export default Input;
//     this.state = {
//       uploadedFileCloudinaryUrl: '',
//       uploadedFile: []
//     }
//     this.onImageDrop = this.onImageDrop.bind(this);
//     this.handleImageUpload = this.handleImageUpload.bind(this);
//   }
  
//   onImageDrop(files) {
//     this.setState({
//       uploadedFile: files[0]
//     });
//     console.log('this is the files[0]: ', files[0]);

//     this.handleImageUpload(files[0]);
//   } 

//   handleImageUpload(file) {
//     $.cloudinary.config({cloud_name: config.cloud_name, api_key: config.api_key, api_secret: config.api_secret})
//     $(() => {
//       if ($.fn.cloudinary_fileupload !== undefined) {
//         console.log('this is the file: ', file);
//         $(`input.cloudinary-fileupload[type=${file}]`).cloudinary_fileupload();
//       } else {
//         console.log('there was an error');
//       }
//     });
//   }

//   render() {
//     return (
//       <Dropzone
//         multiple={false}
//         onDrop={this.onImageDrop}
//         // name="file" 
//         // type="file" 
//         // className="cloudinary-fileupload"
//         // data-cloudinary-field="image_id" 
//         // data-form-data=" ... html-escaped JSON data ... "
//       >
//         <p>Drop an image or click to select a file to upload.</p>
//       </Dropzone>
//     );
//   }
// }

// // Input example directly from cloudinary
//       // <input name="file" type="file" 
//       //   className="cloudinary-fileupload" data-cloudinary-field="image_id" 
//       //   data-form-data=" ... html-escaped JSON data ... " 
//       //   onChange={this.onImageDrop}
//       // />


// //ajax call with superagent
//     // let upload = request.post(CLOUDINARY_UPLOAD_URL)
//     //   .field('headers', 'Access-Control-Allow-Origin')
//     //   .field('upload-preset', CLOUDINARY_UPLOAD_PRESET)
//     //   .field('cloud_name', config.cloud_name)
//     //   .field('api_key', config.api_key)
//     //   .field('file', file);
    
//     // upload.end((err, res) => {
//     //   if (err) {
//     //     console.error(err);
//     //     console.log('************** there was an error   *************')
//     //   } 

//     //   if (res.body.secure_url !== '') {
//     //     this.setState({
//     //       uploadedFileCloudinaryUrl: res.body.secure_url
//     //     });
//     //       console.log('image uploaded to cloudinary!')
//     //   }
//     // });