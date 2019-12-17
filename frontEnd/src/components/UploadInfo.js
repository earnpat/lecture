import React, { Component } from 'react'
import './UploadInfo.scss'
import { Input } from 'antd'
import { Upload, Icon, message } from 'antd'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png');
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB');
    }

    return isJpgOrPng && isLt2M;
}

export class UploadInfo extends Component {
    state = {
        loading: false,
        array: []
    };
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.setState((state) => ({
                imageUrl,
                loading: false,
                array: [...state.array, imageUrl]
              }), () => {
                console.log(this.state.array)
              })
            },
          );
        }

        console.log(this.state.imageUrl)
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">อัพโหลด</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
                <div className="container-upload">
                    <div className="upload-input">
                        ชื่อสินค้า : &nbsp;
                        <Input />
                    </div>

                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        { this.state.array[0] ? <img src={this.state.array[0]} style={{ width: '100%' }} /> : uploadButton }
                    </Upload>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        { this.state.array[1] ? <img src={this.state.array[1]} style={{ width: '100%' }} /> : uploadButton }
                    </Upload>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        { this.state.array[2] ? <img src={this.state.array[2]} style={{ width: '100%' }} /> : uploadButton }
                    </Upload>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        { this.state.array[3] ? <img src={this.state.array[3]} style={{ width: '100%' }} /> : uploadButton }
                    </Upload>

                </div>
            </div>
        )
    }
}

export default UploadInfo