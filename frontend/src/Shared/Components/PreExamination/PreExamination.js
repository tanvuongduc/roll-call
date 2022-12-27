import React from 'react';
import { Table, Row, Col } from 'reactstrap';
import DoctorServices from '../../Services/SharedService'
import { Form } from '../../../Shared';
class PreExamination extends Form {
    constructor(props) {
        super(props);
        this.state = {
            blood: '',
            height: '',
            temp: '',
            weight: '',
        }
    }

    componentDidUpdate = (preProps) => {
        if (preProps.job.id !== this.props.job.id) {
            let blood = this.props.job.state.subclinical.blood || '';
            let height = this.props.job.state.subclinical.height || '';
            let temp = this.props.job.state.subclinical.temp || '';
            let weight = this.props.job.state.subclinical.weight || '';
            this.setState({
                blood,
                height,
                temp,
                weight
            })

        }
    }

    onHandelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onBlurDiagnosis = () => {
        let { job } = this.props;
        let subclinical = {
            blood: this.state.blood,
            temp: this.state.temp,
            weight: this.state.weight,
            height: this.state.height
        }
        DoctorServices.postSubclinical({
            id: job.id,
            state: {
                subclinical
            }
        }).then(res => {
            job.state = job.state || {};
            job.state.subclinical = subclinical;
            console.log('Thành Công', res);
        })
    }

    render() {
        let { temp, height, weight, blood } = this.state
        return (
            <div className="PreExaminationShared">
                <Row>
                    <Col sm={12} className="p-0">
                        <p><b className="title-card"><span className="material-icons">create</span> Cận lâm sàng</b></p>
                    <Table className="table-preEX" >
                        
                        <tbody>
                            <tr>
                                <td><p>Nhiệt độ:</p></td>
                                <td> <input
                                    name="temp"
                                    value={temp}
                                    onChange={e => this.onHandelChange(e)}
                                    onBlur={() => { this.onBlurDiagnosis() }}
                                    disabled={!this.props.job.id}
                                ></input></td>
                                <td><p>Huyết áp:</p></td>
                                <td>
                                    <input
                                        name="blood"
                                        value={blood}
                                        onChange={e => this.onHandelChange(e)}
                                        onBlur={() => { this.onBlurDiagnosis() }}
                                        disabled={!this.props.job.id}>
                                    </input>
                                </td>
                            </tr>
                            <tr>
                            <td><p>cân nặng:</p></td>
                                <td>
                                    <input name="weight"
                                        value={weight}
                                        onChange={e => this.onHandelChange(e)}
                                        onBlur={() => { this.onBlurDiagnosis() }}
                                        disabled={!this.props.job.id}
                                    ></input>
                                </td>
                                <td>{" "}</td>
                                <td><p>Chiều Cao:</p></td>
                                <td>
                                    <input name="height"
                                        value={height}
                                        onChange={e => this.onHandelChange(e)}
                                        onBlur={() => { this.onBlurDiagnosis() }}
                                        disabled={!this.props.job.id}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </Table></Col>
                   
                </Row>
            </div>
        );
    }
}
export default PreExamination;