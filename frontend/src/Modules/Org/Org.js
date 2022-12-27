import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NotAuthorized from './Components/NotAuthorized/NotAuthorized'

class Org extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="org">
                <Switch>
                    <Route exact path={`${path}/notauthorized`} component={NotAuthorized} />
                </Switch>
            </div>
        )
    }
}

export default Org