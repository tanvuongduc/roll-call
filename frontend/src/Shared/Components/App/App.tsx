import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import { AuthService } from "../..";
import { ROLE } from "../../../Constances/const";


import User from '../../../../src/Modules/Org/Components/User/User';

class App extends React.Component<any, any> {
    render() {
        const { path } = this.props.match;
        return (
            <div className="App">
                <AppHeader></AppHeader>

                <Switch>
                    {/* <Route exact path={`${path}`} render={() => {
                        
                        if (AuthService.hasRole(ROLE.RECEPTIONIST) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/reception" ></Redirect>)
                        }else if  (AuthService.hasRole(ROLE.RECEPTIONIST) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/transaction/order" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.DOCTOR) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/doctor" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.TEST_OPERATOR) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/exam" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.ACCOUNTER) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/reception" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.PHARMACIST) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/pharmacy" ></Redirect>)
                        } else {
                            return (<Redirect to="/app/org/notauthorized" ></Redirect>)
                        }
                    }}></Route> */}
                    <Route path={`${path}/user`} component={User} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
