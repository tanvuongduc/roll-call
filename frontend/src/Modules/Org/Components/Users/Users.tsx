import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AddUpdateUser from "./Components/AddUpdateUser/AddUpdateUser";
import Main from "./Components/UsersList/Main";

class Users extends Component<any> {
  render() {
    const { path } = this.props.match;
    return (
      <div className="Users">
        <Switch>
          <Route path={`${path}/create`} component={AddUpdateUser} />
          <Route path={`${path}/:id`} component={AddUpdateUser} />
          <Route path={`${path}/`} component={Main} />
        </Switch>
      </div>
    );
  }
}

export default Users;
