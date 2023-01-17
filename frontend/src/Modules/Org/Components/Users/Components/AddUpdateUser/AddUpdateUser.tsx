import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { BrowserRouter, Link } from "react-router-dom";
import ModalConfirm from "../../../../../../Shared/Components/ModalConfirm/ModalConfirm";
import ModalNoti from "../../../../../../Shared/Components/ModalNoti/ModalNoti";

import { ROLE } from "../../../../../../Constances/const";
import UsersService from "../../../../Shared/UsersService";
export default class AddUpdateUser extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      role_id: 0,
      phone: "",
      birthday: "",
      listRoleId: [],
      confirmMessage: "",
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    ////////// get user ////////////
    if (id) {
      UsersService.getEditUser(id)
        .then((response: any) => {
          let { first_name, last_name, username, phone, birthday, role_id } =
            response.data;
          this.setState({
            first_name,
            last_name,
            username,
            phone,
            role_id,
            birthday,
          });
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }
  }

  onHandleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  onHandleChange1 = (e: any) => {
    let name = e.target.name;
    let value = Number(e.target.value);
    this.setState({
      [name]: value,
    });
  };

  ////////////////// set confirm message //////////////
  onSubmit = () => {
    let id = this.props.match.params.id;
    if (id) {
      this.setState({
        confirmMessage: "Bạn muốn cập nhập thông tin này không ?",
      });
    } else {
      this.setState({
        confirmMessage: "Bạn muốn thêm mới thành viên này không ?",
      });
    }
  };

  answer = (answer: any) => {
    let id = this.props.match.params.id;
    let { first_name, last_name, username, phone, birthday, role_id } =
      this.state;
    const obj = {
      first_name,
      last_name,
      username,
      phone,
      birthday,
      role_id,
    };
    if (answer) {
      let method = id
        ? UsersService.postEditUser(id, obj)
        : UsersService.postCreateUser(obj);
      let notiMessage = id ? "Cập nhât thành công" : "Tạo mới thành công";
      method.then((response) => {
        if (response.status === 200) {
          this.setState({
            notiMessage,
          });
        }
      });
    } else {
      this.setState({
        confirmMessage: "",
      });
    }
  };

  doneAlret = () => {
    if (this.state.notiMessage) {
      window.history.back();
    } else {
      this.setState({ notiMessage: "" });
    }
  };
  onCancel = () => {
    window.location.assign("/app/users");
  };

  onHandleSubmit = () => {};

  render() {
    let { first_name, last_name, username, role_id, phone, birthday } =
      this.state;
    let id = this.props.match.params.id;
    return (
      <div className="addUpdate ">
        <h4 className="text-center title-card-lg">
          {id ? "Cập nhập thông tin thành viên" : "Tạo mới nhân viên"}
        </h4>
        <Form
          style={{ width: "500px", margin: "40px auto" }}
          onSubmit={this.onHandleSubmit}
        >
          <Row form>
            <Col sm={12}>
              <FormGroup>
                <Label for="last_name">Họ</Label>
                <Input
                  type="text"
                  id="last_name"
                  className="last_name"
                  name="last_name"
                  value={last_name}
                  onChange={(e: any) => this.onHandleChange(e)}
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup sm={6}>
                <Label for="first_name">Tên</Label>
                <Input
                  type="text"
                  className="first_name"
                  name="first_name"
                  value={first_name}
                  onChange={(e: any) => this.onHandleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="username">Tên tài khoản</Label>
            <Input
              type="text"
              className="username"
              name="username"
              value={username}
              onChange={(e: any) => this.onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Mã chức vụ</Label>
            <Input
              type="text"
              id="role_id"
              name="role_id"
              value={role_id}
              onChange={(e: any) => this.onHandleChange1(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Số điện thoại</Label>
            <Input
              type="text"
              className="phone"
              name="phone"
              value={phone}
              onChange={(e: any) => this.onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthday">Ngày sinh</Label>
            <input
              type="date"
              className="birthday form-control"
              // min="1890-04-01"
              // max="2050-04-20"
              name="birthday"
              min="01-04-1890"
              max="01-04-2050"
              value={birthday}
              onChange={(e) => this.onHandleChange(e)}
              required={true}
            ></input>
          </FormGroup>
          <FormGroup>
            {/* <Row> */}
            {/* <Col xs="6"> */}

            {/* </Col> */}

            {/* </Row> */}
          </FormGroup>
          <div className="addControl">
            <Button outline color="primary" onClick={this.onSubmit}>
              {id ? "Cập nhập" : "Thêm mới"}
            </Button>{" "}
            <Link to="../users/">
              <Button color="danger" onClick={this.onCancel}>
                Hủy
              </Button>
            </Link>
          </div>
        </Form>
        <ModalConfirm
          message={this.state.confirmMessage}
          answer={this.answer}
        ></ModalConfirm>
        <ModalNoti
          message={this.state.notiMessage}
          done={this.doneAlret}
        ></ModalNoti>
      </div>
    );
  }
}
