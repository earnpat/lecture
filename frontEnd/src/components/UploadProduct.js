import React, { Component } from "react";
import "./UploadProduct.scss";
import Axios from "../config/axios.setup";

import { Upload, Icon, message, InputNumber, Select } from "antd";
import { Input, Row, Col, Form, Modal } from "antd";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    alert("You can only upload JPG/PNG file.");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    alert("Image must smaller than 2MB.");
  }
  return isJpgOrPng && isLt2M;
}

function onSearch(val) {
  console.log("search:", val);
}

export class UploadProductDetail extends Component {
  componentDidMount = () => {};

  state = {
    confirmDirty: false,
    array: [
      { img: "", loading: false },
      { img: "", loading: false },
      { img: "", loading: false },
      { img: "", loading: false }
    ],
    product_name: "",
    price: "",
    detail: "",
    category: "",
    image_url_1: "",
    image_url_2: "",
    image_url_3: "",
    image_url_4: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleChangeType = value => {
    this.setState({
      category: value
    });
  };

  handleChangePrice = value => {
    this.setState({
      price: value
    });
  };

  handleUploadImg = value => async info => {
    if (info.file.status === "uploading") {
      await this.setState(state => ({
        array: state.array.map((data, idx) => {
          if (idx === value) {
            return { loading: true, data: data.img };
          } else {
            return data;
          }
        })
      }));
      return;
    }
    if (info.file.status === "done") {
      console.log(info.file.response.data.name);
      this.setState(
        state => ({
          array: state.array.map((data, idx) => {
            if (idx === value) {
              return {
                img: "http://localhost:8080/" + info.file.response.data.name,
                loading: false
              };
            } else {
              return data;
            }
          })
        }),
        () => {
          console.log(this.state.array);
        }
      );
    }
    console.log(this.state.array);
  };

  uploadButton(loading) {
    return (
      <div>
        <Icon type={loading ? "loading" : "plus"} />
      </div>
    );
  }

  handleUploadProduct = e => {
    e.preventDefault();
    this.setState(
      {
        image_url_1: this.state.array[0].img,
        image_url_2: this.state.array[1].img,
        image_url_3: this.state.array[2].img,
        image_url_4: this.state.array[3].img
      },
      () => {
        this.props.form.validateFields((errors, value) => {
          if (!errors) {
            const {
              product_name,
              price,
              detail,
              category,
              image_url_1,
              image_url_2,
              image_url_3,
              image_url_4
            } = this.state;

            Axios.post("/upload", {
              product_name,
              price,
              detail,
              category,
              image_url_1,
              image_url_2,
              image_url_3,
              image_url_4
            })
              .then(result => {
                console.log(`result : ${result}`);
              })
              .catch(err => {
                console.error(err.message);
              });
          }
        });
      }
    );
  };

  render() {
    const { TextArea } = Input;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="register-bg">
        <div>
          <div className="container-upload">
            <Row className="input-product-name">
              <Col span={4} className="input-title">
                ชื่อสินค้า : &nbsp;
              </Col>
              <Col span={20}>
                <Form.Item>
                  {getFieldDecorator("product_name", {
                    rules: [
                      {
                        required: true,
                        message: "กรุณากรอกชื่อผู้ใช้",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      allowClear
                      name="product_name"
                      onChange={e => this.handleChange(e)}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row className="input-product-img">
              <Col span={4} className="input-title-img">
                ภาพสินค้า : &nbsp;
              </Col>
              <Col span={20} className="upload-img">
                <div>
                  <Form.Item>
                    {getFieldDecorator("product_first_img", {
                      rules: [
                        {
                          required: true,
                          message: "กรุณาใส่ภาพปก",
                          type: "object",
                          whitespace: true
                        }
                      ]
                    })(
                      <Upload
                        name="photo"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://localhost:8080/upload-photo"
                        beforeUpload={beforeUpload}
                        onChange={this.handleUploadImg(0)}
                      >
                        {this.state.array[0].img ? (
                          <img
                            src={this.state.array[0].img}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <div>
                            {this.uploadButton(this.state.array[0].loading)}
                            <div style={{ marginTop: "10px" }}>ภาพปก</div>
                          </div>
                        )}
                      </Upload>
                    )}
                  </Form.Item>
                </div>
                <div>
                  <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:8080/upload-photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImg(1)}
                  >
                    {this.state.array[1].img ? (
                      <img
                        src={this.state.array[1].img}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>
                        {this.uploadButton(this.state.array[1].loading)}
                        <div style={{ marginTop: "10px" }}>ภาพ 1</div>
                      </div>
                    )}
                  </Upload>
                </div>
                <div>
                  <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:8080/upload-photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImg(2)}
                  >
                    {this.state.array[2].img ? (
                      <img
                        src={this.state.array[2].img}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>
                        {this.uploadButton(this.state.array[2].loading)}
                        <div style={{ marginTop: "10px" }}>ภาพ 2</div>
                      </div>
                    )}
                  </Upload>
                </div>
                <div>
                  <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:8080/upload-photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImg(3)}
                  >
                    {this.state.array[3].img ? (
                      <img
                        src={this.state.array[3].img}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>
                        {this.uploadButton(this.state.array[3].loading)}
                        <div style={{ marginTop: "10px" }}>ภาพ 3</div>
                      </div>
                    )}
                  </Upload>
                </div>
              </Col>
            </Row>

            <Row className="input-product-detail" type="flex" align="middle">
              <Col span={4} className="input-title">
                รายละเอียดสินค้า : &nbsp;
              </Col>
              <Col span={20} style={{ padding: "5px 0" }}>
                <TextArea
                  allowClear
                  rows={4}
                  name="detail"
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>

            <Row className="input-product-cat">
              <Col span={4} className="input-title">
                ประเภท : &nbsp;
              </Col>
              <Col span={20}>
                <Form.Item>
                  {getFieldDecorator("product_type", {
                    rules: [
                      {
                        required: true,
                        message: "กรุณาเลือกประเภทสินค้า",
                        whitespace: true
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="เลือกประเภทสินค้า"
                      optionFilterProp="children"
                      onChange={this.handleChangeType}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option name="category" value="lecture">
                        สมุดเลคเชอร์
                      </Option>
                      <Option name="category" value="planner">
                        สมุดแพลนเนอร์
                      </Option>
                      <Option name="category" value="others">
                        สินค้าอื่นๆ
                      </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row className="input-product-price">
              <Col span={4} className="input-title">
                ราคา : &nbsp;
              </Col>
              <Col span={19}>
                <Form.Item>
                  {getFieldDecorator("product_price", {
                    rules: [
                      {
                        required: true,
                        message: "กรุณากรอกราคาสินค้า",
                        type: "number",
                        whitespace: true
                      }
                    ]
                  })(
                    <InputNumber
                      onChange={this.handleChangePrice}
                      className="input-price"
                      min={1}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={1} className="input-title">
                &nbsp;บาท
              </Col>
            </Row>
          </div>

          <Row className="save-product" type="flex" align="middle">
            <Col span={15}></Col>
            <Col span={4}>
              <button className="btn-cc">ยกเลิก</button>
            </Col>
            <Col span={1}></Col>
            <Col span={4}>
              <button
                className="btn-save"
                onClick={e => this.handleUploadProduct(e)}
              >
                บันทึก
              </button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const UploadProduct = Form.create()(UploadProductDetail);

export default UploadProduct;
