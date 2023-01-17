import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { BrowserRouter,  Link } from 'react-router-dom';
import ModalConfirm from '../../../../../../Shared/Components/ModalConfirm/ModalConfirm';
import ModalNoti from '../../../../../../Shared/Components/ModalNoti/ModalNoti';
import UserService from '../../../../Shared/UserService';
import { ROLE } from '../../../../../../Constances/const';


export default class AddUpdateUser extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      org_id: '',
      first_name: '',
      last_name: '',
      role: ROLE.RECEPTIONIST.value,
      phone: '',
      birthday: '',

      listOrg: [],
      listRole: [],
      confirmMessage: ''
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    ////////// get user ////////////
    if (id) {
      UserService.getEditUser(id)
      .then((response: any) => {
        let { first_name, last_name, username, org_id, phone, birthday, role } = response.data
        this.setState({
          first_name, last_name, username, org_id, phone, role, birthday
        });
      }).catch(function (error: any) {
        console.log(error);
      });
    }
    ////////// get list org ///////////
    UserService.getListOrg()
    .then((response: any) => {
      this.setState({
        listOrg: response.data,
        org_id: response.data[0].id
      })
    }).catch(function (error: any) {
      console.log(error);
    })
  }

  onHandleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  ////////////////// set confirm message //////////////
  onSubmit = () => {
    let id = this.props.match.params.id;
    if (id) {
      this.setState({
        confirmMessage: 'Bạn muốn cập nhập thông tin này không ?'
      });
    } else {
      this.setState({
        confirmMessage: 'Bạn muốn thêm mới thành viên này không ?'
      });
    }
  }


  answer = (answer: any) => {
    let id = this.props.match.params.id;
    let { first_name, last_name, username, phone, org_id, birthday, role } = this.state;
    const obj = {
      first_name, last_name, username, phone, org_id, birthday, role
    };
    if (answer) {
      let method = (id) ? UserService.postEditUser(id, obj) : UserService.postCreateUser(obj);
      let notiMessage = (id) ? 'Cập nhât thành công' : 'Tạo mới thành công'
      method.then(response => {
        if (response.status === 200) {
          this.setState({
            notiMessage
          });
        }
      });

    }
    else {
      this.setState({
        confirmMessage: ''
      })
    }
  }

  doneAlret = () => {
    if (this.state.notiMessage) {
      window.history.back();
    } else {
      this.setState({ notiMessage: '' })
    }
  }
  onCancel = () => {
    window.location.assign('/app/user')
  }

  onHandleSubmit = () => {

  }
  
  render() {

    let { first_name, last_name, username, role, phone, org_id, birthday, listOrg } = this.state
    let id = this.props.match.params.id
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
              <Col sm={6}>
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
            <FormGroup >
              <Label>Chức vụ</Label>
              <Input
                type="select"
                id="role"
                name="role"
                value={role}
                onChange={(e: any) => this.onHandleChange(e)}
              >
                {Object.keys(ROLE).map((k: string, i: number) => (
                <option key={i} value={ROLE[k  as keyof typeof  ROLE].value}>{ROLE[k as keyof typeof  ROLE].name}</option>))}
              </Input>
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
              <Label for="position">Vị trí</Label>
              <Input
                type="select"
                className="position"
                id="position"
                name="org_id"
                value={org_id}
                onChange={(e: any) => this.onHandleChange(e)}
              >
                {listOrg.map((list: any) => (
                  <option value={list.id} key={list.id}>
                    {list.name}
                  </option>
                ))}
              </Input>
              {/* </Col> */}

              {/* </Row> */}
            </FormGroup>
            <div className="addControl">
              <Button
                outline
                color="primary"
                onClick={this.onSubmit}
              >
                {id ? "Cập nhập" : "Thêm mới"}
              </Button>{" "}
              <Link to="../user/">
                <Button
                  color="danger"
                  onClick={this.onCancel}
                >
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

