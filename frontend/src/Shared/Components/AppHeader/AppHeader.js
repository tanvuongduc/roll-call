import React from 'react';
import logo from './logo.png';
import { withRouter } from "react-router-dom";
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Col, Row } from 'reactstrap';
import { AuthService } from '../../';
import { ROLE } from '../../../Constances/const';


class AppHeader extends React.Component {
    state = {
        dropdownUserOpen: false,
        dropdownMasterDataOpen: false,
        dropdownInventoryOpen: false,
    }

    goTo(url = '') {
        url = window.location.origin + '/' + url
        window.location.replace(url)
    }

    toggleUser = () => {
        this.setState({
            dropdownUserOpen: !this.state.dropdownUserOpen,
        })
    }

    toggleMasterData = () => {
        this.setState({
            dropdownMasterDataOpen: !this.state.dropdownMasterDataOpen,
        })
    }

    toggleWareHouse = () => {
        this.setState({
            dropdownInventoryOpen: !this.state.dropdownInventoryOpen,
        })
    }

    logout() {
        AuthService.userInfo = null;
        window.localStorage.clear();
        window.location.replace('login');
    }

    render() {
        return (
            <Nav pills>
                <Row className="appHeaderContainer" >
                    <Col xs="2">
                        <NavItem className="mt-1">
                            <img src={logo} alt="img company" style={{ width: 60 }, { height: 30 }}></img>
                        </NavItem>
                    </Col>
                    
                    {AuthService.userInfo.role === ROLE.ADMIN.value ? 
                        <Col sm="8">
                            {/* {AuthService.hasRole(ROLE.ADMIN) ? */}
                            <Row style={{ margin: '0px' }}>
                                <NavItem className="pointer">
                                    <NavLink onClick={() => this.goTo('app/transaction/order')}>Thu Ngân</NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink onClick={() => this.goTo('app/reception')}>Lễ Tân</NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink onClick={() => this.goTo('app/doctor')}>Khám Bệnh</NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink onClick={() => this.goTo('app/exam')}>Xét Nghiệm</NavLink>
                                </NavItem>
                                {/* <NavItem className="pointer">
                                        <NavLink onClick={() => this.goTo('app/xray')}>X-Quang</NavLink>
                                    </NavItem> */}
                                <NavItem className="pointer">
                                    <NavLink onClick={() => this.goTo('app/pharmacy')}>Nhà thuốc</NavLink>
                                </NavItem>
                                <Dropdown nav isOpen={this.state.dropdownInventoryOpen} toggle={this.toggleWareHouse}>
                                    <DropdownToggle nav caret>Kho</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.goTo('app/inventory/producer')}>Nhà Cung Cấp</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/inventory/lot')}>Nhập Lô</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/inventory/transaction')}>Xuất Kho</DropdownItem>
                                    </DropdownMenu>

                                </Dropdown>
                                <Dropdown nav isOpen={this.state.dropdownMasterDataOpen} toggle={this.toggleMasterData}>
                                    <DropdownToggle nav caret>Quản lý</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.goTo('app/user')}>Nhân Viên</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/location')}>Phòng Ban</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/service')}>Dịch Vụ</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/product')}>Thuốc & Vật Tư</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/transaction/transaction')}>Quản lý thu ngân</DropdownItem>

                                    </DropdownMenu>
                                </Dropdown>
                            </Row>
                            {/* //    : null}  */}
                        </Col>
                    : null }
                    <Col sm="2">
                        <Dropdown nav isOpen={this.state.dropdownUserOpen} toggle={this.toggleUser}>
                            <DropdownToggle nav caret><span className="material-icons">account_box</span> {AuthService.userInfo.first_name}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.goTo('app/user/' + AuthService.userInfo.id)}><span className="material-icons">account_circle</span> Thông tin người dùng</DropdownItem>
                                <DropdownItem onClick={() => this.goTo('app/user/setpassword/' + AuthService.userInfo.id)}><span className="material-icons">lock</span> Đổi mật khẩu</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => this.logout()}><span className="material-icons">exit_to_app</span> Đăng xuất</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </Nav>
        );
    }
}

export default withRouter(AppHeader);