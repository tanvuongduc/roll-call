import React, { Component } from 'react';
import { Container, Row, Button, Input } from 'reactstrap';
import './Main.scss';
import TableUser from '../TableUser/TableUser';
import ModalConfirm from '../../../../../../Shared/Components/ModalConfirm/ModalConfirm';
import ModalNoti from '../../../../../../Shared/Components/ModalNoti/ModalNoti';
import UserService from '../../../../Shared/UserService';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            id: '',
            confirmMessage: '',
            notiMessage: '',
            textFilter: '',
        }
    }

    componentDidMount=()=>{
        this.getUserList();
    }
    //list user
    getUserList=()=>{
        UserService.getListUser().then(
            response => {
                this.setState({userList: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onDelete=(id)=>{
        this.setState({
            id,
            confirmMessage: 'Bạn muốn xóa thông tin người dùng này không'
        })      
    }
    answer = (answer) => {  
        if (answer){
            let id = this.state.id;
            UserService.getDeleteUser(id)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            notiMessage : 'Bạn xóa thành công'
                        });
                    }
                }); 
            this.getUserList();
        }   
        this.props.history.push('/app/user');
        this.setState({
            confirmMessage: ''
        })
    }
    doneAlret = () => {
        if (this.state.notiMessage) {
            window.history.back();
            this.getUserList();  
        } 
        this.setState({ notiMessage: '' }) 
    }

    onChangeSearch = (e)=>{
        this.setState({
            textFilter: e.target.value
        });
    }
    // createUser=()=>{
        
    // }
    createUser=()=>{
        this.props.history.push("/app/user/create");
    }
    render() {
        let {textFilter, userList} = this.state;
        if(textFilter){
            userList = userList.filter((user) =>{
                return user.username.toLowerCase().indexOf(textFilter) !== -1;
            })
        }
        return (
            <Container className="Main customCard mr-top-20">
                <h4 className="title-card-lg">Quản lý nhân viên</h4>
                <Row className="search-user">
                    <Button onClick={()=>this.createUser()}><span>Thêm mới</span></Button>                   
                    <div className="search">
                        <Input type="text" placeholder="Tìm kiếm tài khoản" 
                                    value={this.state.value} 
                                    onChange={this.onChangeSearch} 
                        ></Input>
                    </div>
                </Row>
                <TableUser 
                    userList={userList} 
                    onDelete = {this.onDelete}
                ></TableUser>
                <ModalConfirm message={this.state.confirmMessage} answer={this.answer}></ModalConfirm> 
                <ModalNoti message={this.state.notiMessage} done={this.doneAlret}></ModalNoti>
            </Container>
        );
    }
}
export default Main
