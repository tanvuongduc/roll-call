import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { LOCALSTORAGE } from "../../../Constances/const";

class LocationSelecter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {

    }
    updateStorage = (locInfo) => {
        localStorage.setItem(LOCALSTORAGE.LOCATION, JSON.stringify(locInfo));
    }

    render() {
        let { list, onSelect } = this.props;

        return (
            <div className="locationSelecterContainer customCard">
                <h1 className="header">Mời chọn phòng</h1>
                <Row>
                    {
                        list && list.length ? list.map(el => {
                            return (
                                <Col sm='3' className="item">
                                    <Button outline color="primary" onClick={() => {
                                        onSelect(el.id, el.name);
                                        this.updateStorage(el);
                                    }}>{el.name}</Button>
                                </Col>
                            )
                        }) : <p>----------------------</p>
                    }
                </Row>

                  </div>
    );
  }
}

export default LocationSelecter;
