import React, { Component } from "react";
import { Button } from "reactstrap";
import { Fragment } from "react";
import { ROLE } from "../../../../../../Constances/const";

class RowTable extends Component {

  onDelete = (id) => {
    id = this.props.user.id;
    this.props.onDelete(id);
  };
  edit = (id) => {
    let url = "/app/user/" + id;
    console.log(url);
    window.location.assign(url);
  };
  render() {
    let user = this.props.user;
    let {
      first_name,
      last_name,
      username,
      role,
      phone,
      birthday,
    } = this.props.user;
    let ctime = new Date(user.ctime);
    let date = new Date(birthday)
    let roleKey = Object.keys(ROLE).find(k => ROLE[k].value == role);
    return (
      <Fragment>
        <tr>
          <td className="dw-5" scope="row">
            {this.props.index + 1}
          </td>
          <td width="20%">{username}</td>
          <td>{last_name + " " + first_name}</td>
          <td>{ROLE[roleKey]?.name}</td>
          <td>
            {ctime.getDate() < 10
              ? "0" + (ctime.getDate() + 1)
              : ctime.getDate() + 1}
            -
            {ctime.getMonth() < 10
              ? "0" + (ctime.getMonth() + 1)
              : ctime.getMonth() + 1}
            -{ctime.getFullYear()}
          </td>
          <td>{phone}</td>
          <td>
           {date.toLocaleString('en-NZ', { dateStyle: "medium" })}
          </td>
          <td>
            <Button
              outline
              color="primary"
              className="btn-sm"
              onClick={() => this.edit(user.id)}
            >
              <span>Sửa</span>
            </Button>{" "}
            <Button
              color="danger"
              className="btn-sm"
              onClick={this.onDelete}
            >
              Xóa
            </Button>{" "}
          </td>
        </tr>
      </Fragment>
    );
  }
}
export default RowTable;
