import React from "react";
import { ShareService } from "../..";
export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount = () => {
        let { id } = this.props
        ShareService.createBarcode(id)
    }

    render() {

        return (
            <div id="printCode">
                <canvas id="canvas_id"></canvas>
            </div>

        );
    }
}