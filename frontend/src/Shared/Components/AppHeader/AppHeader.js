import React from "react";
import logo from "./logo.png";
import { withRouter } from "react-router-dom";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";
import { Col, Row } from "reactstrap";
import { AuthService } from "../../";
import { ROLE } from "../../../Constances/const";

class AppHeader extends React.Component {
  state = {
    dropdownUserOpen: false,
    dropdownMasterDataOpen: false,
    dropdownInventoryOpen: false,
  };

  goTo(url = "") {
    url = window.location.origin + "/" + url;
    window.location.replace(url);
  }

  toggleUser = () => {
    this.setState({
      dropdownUserOpen: !this.state.dropdownUserOpen,
    });
  };

  toggleMasterData = () => {
    this.setState({
      dropdownMasterDataOpen: !this.state.dropdownMasterDataOpen,
    });
  };

  toggleWareHouse = () => {
    this.setState({
      dropdownInventoryOpen: !this.state.dropdownInventoryOpen,
    });
  };

  logout() {
    AuthService.userInfo = null;
    window.localStorage.clear();
    window.location.replace("login");
  }

  render() {
    return (
      <Nav pills>
        <Row className="appHeaderContainer">
          <Col xs="2">
            <NavItem className="mt-1">
              <img
                src={logo}
                alt="img company"
                style={{ width: 60, height: 30 }}
              ></img>
            </NavItem>
          </Col>

          <Col sm="8">
            {/* {AuthService.hasRole(ROLE.ADMIN) ? */}
            <Row style={{ margin: "0px" }}>
              <Dropdown
                nav
                isOpen={this.state.dropdownMasterDataOpen}
                toggle={this.toggleMasterData}
              >
                <DropdownToggle nav caret>
                  Organization
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.goTo("app/users")}>
                    Users
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Row>
            {/* //    : null}  */}
          </Col>
        </Row>
      </Nav>
    );
  }
}

export default withRouter(AppHeader);
