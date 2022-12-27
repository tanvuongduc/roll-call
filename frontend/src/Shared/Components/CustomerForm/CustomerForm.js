import React from "react";
import { FormGroup, Label, Input, Col, Row, ModalBody, Modal, ModalHeader, Button } from "reactstrap";
import MedicalHistoryTable from "../../../Modules/Reception/Components/MedicalHistory/MedicalHistoryTable"
import Asterisk from "../../../Modules/Reception/Components/ReceptionForm/Asterisk";
import { REGEX_DATE } from "../../../Modules/Reception/Shared";
import { Util } from "../../../Helper/Util";
import { REGEX_TEL } from '../../../Constances/const';
import { ShareService } from "../..";
import {
  convertToStrDate,
  getAge,
  autoAddSlashDate
} from "../../../Modules/Reception/Shared/Util";
import CustomerFromPrint from "./CustomerFromPrint"
export default class CustomerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      items: [],
    }
  }
  CloseHistory = () => {
    this.setState({
      show: false
    })
  }
  setHistory = (customer_id) => {
    ShareService.getJobByCustomerId(customer_id).then(res => {
      let data = res.data.reverse();
      data.splice(6);
      this.setState({
        items: data,
        show: true
      })
    })
  }
  print = () => {
    ShareService.print("printCode")
  };

  render() {
    let data = this.props.data || {};
    let { cm_code, cm_full_name, cm_gender, cm_birthday, dirty, contact_phone_number } = data;
    let { reExamination, _setValue, mode } = this.props;
    return (
      <div className="customerForm_container">
        <h5 className="title-card"><span className="material-icons">person</span> Thông tin bệnh nhân</h5>
        {mode === "input" && (
          <div>
            <FormGroup row>
              <Label for="cm_code" sm={5}>Mã bệnh nhân <Asterisk /></Label>
              <Col sm={6}>
                <Input
                  placeholder="nhập 12 số mã bệnh nhân"
                  autoFocus
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="1"
                  name="cm_code"
                  value={cm_code.value}
                  type="text"
                  id="cm_code"
                  onChange={(ev) => _setValue(ev, "cm_code")}
                  disabled={reExamination}
                />
              </Col>

              <Col sm={1}>
                <Button
                  onClick={() => this.print()}
                >In</Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="cm_full_name" sm={5}>Họ tên <Asterisk /></Label>
              <Col sm={7}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="2"
                  type="text"
                  name="cm_full_name"
                  value={cm_full_name.value}
                  id="cm_full_name"
                  onChange={(ev) => _setValue(ev, "cm_full_name")}
                  required
                  className="text-uppercase" />
                {dirty && (
                  <span className="text-danger">{cm_full_name.err}</span>
                )}
              </Col>
            </FormGroup>
            <FormGroup row className="customer-birthday">
              <Label for="cm_birthday" sm={5}>
                Ngày sinh <Asterisk />
              </Label>
              <Col sm={5}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="3"
                  type="text"
                  name="cm_birthday"
                  id="cm_birthday"
                  value={cm_birthday.value}
                  onChange={(ev) => { ev.target.value = autoAddSlashDate(ev.target.value); _setValue(ev, "cm_birthday") }}
                  pattern={REGEX_DATE}
                  placeholder="dd/mm/yyyy"
                  required
                />
                {dirty && (
                  <span className="text-danger">{cm_birthday.err}</span>
                )}
              </Col>
              {cm_birthday.value && !cm_birthday.err && (
                <Col sm={2}>
                  <div className=" align-items-center get-age">
                    {getAge(cm_birthday.value)}
                  </div>
                </Col>
              )}
            </FormGroup>
            <Row className="gender">
              <Label for="cm_gender" sm={5}>
                Giới tính <Asterisk />
              </Label>
              <Col sm={7}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="4"
                  type="select"
                  id="cm_gender"
                  value={cm_gender.value}
                  onChange={(ev) => _setValue(ev, "cm_gender")}
                  required>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </Input>
                {dirty && (
                  <span className="text-danger">{cm_gender.err}</span>
                )}
              </Col>
            </Row>
            <FormGroup row className="customer-phone">
              <Label for="contact_phone_number" sm={5}>Số điện thoại <Asterisk /></Label>
              <Col sm={7}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="5"
                  type="text"
                  name="contact_phone_number"
                  id="contact_phone_number"
                  value={contact_phone_number.value}
                  pattern={REGEX_TEL}
                  onChange={(ev) => _setValue(ev, 'contact_phone_number')}
                  required
                />
                {dirty && <span className="text-danger">{contact_phone_number.err}</span>}
              </Col>
            </FormGroup>
            <div className="print">
              <CustomerFromPrint id={cm_code.value.toString()}></CustomerFromPrint>
            </div>


          </div>
        )}
        {mode !== "input" && (

          <div>
            <Row className="infoCustomer ">
              <Col sm={5} className="ml-10">
                <Row className="mb-1">
                  <Col xs="5">Mã bệnh nhân:</Col>
                  <Col xs="7">{data.code}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Họ tên:</Col>
                  <Col xs="7">{data.full_name}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Địa chỉ:</Col>
                  <Col xs="7">{data.address}</Col>
                </Row>
              </Col>
              <Col sm={5}>
                <Row className="mb-1">
                  <Col xs="5">Giới tính:</Col>
                  <Col xs="7">{data.gender ? data.gender === "male" ? "Nam" : "Nữ" : null}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Ngày sinh:</Col>
                  <Col xs="5">{convertToStrDate(data.birthday)}</Col>
                </Row>
              </Col>
              {/* <Col sm="1" className="end">
                <Button hidden={!this.props.data.code} className="btn-sm" onClick={() => this.setHistory(data.id)}>?</Button>
              </Col>
              <Modal isOpen={this.state.show}>
                <ModalHeader>Lịch sử khám</ModalHeader>
                <ModalBody>
                  <MedicalHistoryTable items={this.state.items}></MedicalHistoryTable>
                  <Row>
                    <Col sm="12" className="end">
                      <Button onClick={this.CloseHistory}>Đóng</Button>
                    </Col>
                  </Row>
                </ModalBody>
              </Modal> */}
            </Row>

            {mode === "easyInfo" && (
              <>
                <Row className="mb-1">
                  <Col xs="5">Giới tính:</Col>
                  <Col xs="7">{data.gender ? data.gender === "male" ? "Nam" : "Nữ" : null}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Ngày sinh:</Col>
                  <Col xs="5">{convertToStrDate(data.birthday)}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Địa chỉ:</Col>
                  <Col xs="7">{data ? data.contacts ? data.contacts[0].address.province : "" : ""}</Col>
                </Row>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}