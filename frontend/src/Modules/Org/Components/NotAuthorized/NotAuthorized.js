import React, { Component } from 'react';

class NotAuthorized extends Component {

    render() {
        return (
            <div className="notAuthContainer">
                <h4>Bạn không có quyền truy cập tính năng này</h4>
            </div>
        );
    }
}

export default NotAuthorized;