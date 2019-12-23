import React, { Component } from 'react'
import './UploadInfo.scss'
import { Input, Row, Col } from 'antd'
import { Upload, Icon, message, InputNumber, Select } from 'antd'

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

function onChange(value) {
    console.log(`selected ${value}`);
}
  
function onSearch(val) {
    console.log('search:', val);
}

export class UploadInfo extends Component {
    state = {
        array: [
            { img: '', loading: false },
            { img: '', loading: false },
            { img: '', loading: false },
            { img: '', loading: false }
        ]
    };

    handleChange = value => async info => {
        if (info.file.status === 'uploading') {
            await this.setState((state) => ({
                array: state.array.map((data, idx) => {
                    if (idx === value) {
                        return { loading: true, data: data.img }
                    }
                    else {
                        return data
                    }
                })
            }));
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState((state) => ({
                    array: state.array.map((data, idx) => {
                        if (idx === value) {
                            return { img: imageUrl, loading: false }
                        }
                        else {
                            return data
                        }
                    })
                }), () => { console.log(this.state.array) })
            },
            );
        }
        console.log(this.state.array)
    };

    uploadButton(loading) {
        return (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
            </div>)
    }

    render() {
        const { TextArea } = Input;
        const { Option } = Select;
        return (
            <div className="regiter-bg">
                <div>
                    <div className="container-upload">
                        <Row className="input-product-name" type="flex" align="middle">
                            <Col span={4} className="input-title">ชื่อสินค้า : &nbsp;</Col>
                            <Col span={20}><Input /></Col>
                        </Row>

                        <Row className="input-product-img" type="flex" align="middle">
                            <Col span={4} className="input-title">ภาพสินค้า : &nbsp;</Col>
                            <Col span={20} className="upload-img">
                                    <div className="upload">
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange(0)}
                                        >
                                            {this.state.array[0].img ? <img src={this.state.array[0].img} style={{ width: '100%' }} /> : <div>{this.uploadButton(this.state.array[0].loading)}<div style={{marginTop: '10px'}}>ภาพปก</div></div>}
                                        </Upload>
                                    </div>
                                    <div>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange(1)}
                                        >
                                            {this.state.array[1].img ? <img src={this.state.array[1].img} style={{ width: '100%' }} /> : <div>{this.uploadButton(this.state.array[1].loading)}<div style={{marginTop: '10px'}}>ภาพ 1</div></div>}
                                        </Upload>
                                    </div>
                                    <div>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange(2)}
                                        >
                                            {this.state.array[2].img ? <img src={this.state.array[2].img} style={{ width: '100%' }} /> : <div>{this.uploadButton(this.state.array[2].loading)}<div style={{marginTop: '10px'}}>ภาพ 2</div></div>}
                                        </Upload>
                                    </div>
                                    <div>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange(3)}
                                        >
                                            {this.state.array[3].img ? <img src={this.state.array[3].img} style={{ width: '100%' }} /> : <div>{this.uploadButton(this.state.array[3].loading)}<div style={{marginTop: '10px'}}>ภาพ 3</div></div>}
                                        </Upload>
                                    </div>
                            </Col>
                        </Row>

                        <Row className="input-product-detail" type="flex" align="middle">
                            <Col span={4} className="input-title">รายละเอียดสินค้า : &nbsp;</Col>
                            <Col span={20}><TextArea rows={4} /></Col>
                        </Row>

                        <Row className="input-product-cat" type="flex" align="middle">
                            <Col span={4} className="input-title">ประเภท : &nbsp;</Col>
                            <Col span={20}>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="เลือกประเภทสินค้า"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="lecture">สมุดเลคเชอร์</Option>
                                <Option value="planner">สมุดแพลนเนอร์</Option>
                                <Option value="others">สินค้าอื่นๆ</Option>
                            </Select>
                            </Col>
                        </Row>

                        <Row className="input-product-price" type="flex" align="middle">
                            <Col span={4} className="input-title">ราคา : &nbsp;</Col>
                            <Col span={19}>
                                <InputNumber
                                    className="input-price" 
                                    min={1}
                                />
                            </Col>
                            <Col span={1}>&nbsp;บาท</Col>
                        </Row>
                    </div>

                    <Row className="save-product" type="flex" align="middle">
                        <Col span={15}></Col>
                        <Col span={4}>
                            <button className="btn-cc">ยกเลิก</button>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={4}>
                            <button className="btn-save">บันทึก</button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default UploadInfo