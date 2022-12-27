import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AddUpdateUser from "./Components/AddUpdateUser/AddUpdateUser";
import Main from "./Components/Main/Main";
import ChangePasswordForm from "./Components/ChangePassword/ChangePasswordForm";

class User extends Component<any> {

  render() {
    const { path } = this.props.match;
    return (
      <div className="User">
        <Switch>
          <Route path={`${path}/setpassword/:id`} component={ChangePasswordForm} />
          <Route path={`${path}/create`} component={AddUpdateUser} />
          <Route path={`${path}/:id`} component={AddUpdateUser} />
          <Route path={`${path}/`} component={Main} />
        </Switch>
      </div>
    );
  }
}

export default User;
