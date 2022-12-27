import React, { Component } from "react";
import { ShareService } from "../..";
class PrintBarcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount = () => {
        let { codeId, nameId } = this.props
        if(codeId)
        {
            ShareService.createEtccode(codeId, nameId)
        }
        
    }
    render() {
        let nameId = this.props
        return (
            <div>
                <canvas id={nameId}></canvas>
            </div>

        );
    }
}

export default PrintBarcode;
