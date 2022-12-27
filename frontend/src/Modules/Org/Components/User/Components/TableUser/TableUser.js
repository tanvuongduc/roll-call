import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import RowTable from './RowTable';



class TableUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            confirmMessage: '',
            notiMessage: '',
        }
    }



    render() {
        let { userList } = this.props;
        let user = userList.map((user, index) => {
            return <RowTable key={user.id} user={user} index={index}
                onDelete={this.props.onDelete}
            ></RowTable>
        })
        return (

            // <Row className="table-user">
            <div className="table-responsive min-h-100 df-h-75">
                <table className="table table-head-fixed table-bordered">
                    <thead>
                        <tr>
                            <th className="dw-5">STT</th>
                            <th>Tên Đăng Nhập</th>
                            <th>Tên Người dùng</th>
                            <th >Vai trò</th>
                            <th>Ngày Bắt Đầu</th>
                            <th>Số Điện Thoại</th>
                            <th>Ngày sinh</th>
                            <th>Tùy Chỉnh</th>
                        </tr>
                    </thead>
                    <tbody className="bodyTable">
                        {user}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default TableUser
