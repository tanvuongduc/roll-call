import React, { Component } from "react";
import { Table, Input } from "reactstrap";
import SharedService from '../../Services/SharedService';
import { STATUS } from '../../../Constances/const'
import { Util } from '../../../Helper/Util'
class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJob: -1,
      patientList: [],
      textFilter: '',
      tabs: "1",
      customerSearch: {},
    }
  }

  interval = null;

  fetchPatientList = () => {
    let { status, type, location_id } = this.props;
    status = status.join(',');
    let day = new Date().toLocaleString('en-NZ', { dateStyle: "medium" });
    SharedService.getListJobStep({ location_id, status }).then((res) => {
      let cusList = res.data.filter(el => el.type === type && new Date(el.ctime).toLocaleString('en-NZ', { dateStyle: "medium" }) == day).reverse()
      // let cusList = res.data.filter(el => el.type === type).reverse()
      this.setState({
        patientList: cusList
      });
    }).catch(err => {
      console.log(err)
    })
  }

  onSelectJobStep = (jobStep) => {
    this.props.onSelectJobStep(jobStep);
    this.setState({
      selectedJob: jobStep.id,
      textFilter: "",
      tabs: "1"
    })
  }

  componentDidMount() {
    this.props.action.refresh = this.fetchPatientList;
    this.fetchPatientList()
    this.interval = setInterval(() => {
      if (!this.state.patientList || !this.state.patientList.length) {
        this.fetchPatientList();
      }
    }, 30000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval)
  // }

  onFilterChange = (ev) => {
    this.setState({
      textFilter: ev.target.value
    })
    // let { patientList, customerSearch } = this.state;
    // if (ev.target.value.length == 10) {
    //   patientList.map(el => {
    //     if (ev.target.value == el.order.customer.code) {
    //       this.setState({
    //         tabs: "1"
    //       })
    //     }
    //     else {
    //       SharedService.getCustomerByCode(ev.target.value).then(res => {
    //         let cusID = res.data[0] ? res.data[0].id : " ";
    //         SharedService.getJobByCustomerId(cusID).then(res => {
    //           this.setState({
    //             customerSearch: res.data[0],
    //             tabs: "2"
    //           })
    //         })
    //       })
    //     }
    //   })

    // }
    // else {
    //   this.setState({
    //     tabs: "1"
    //   })
    // }
  }
  sortByName = (a, b) => {
    let nameA = a.toUpperCase();
    let nameB = b.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }
  render() {
    let { patientList, tabs, textFilter, customerSearch } = this.state;
    let { mode } = this.props

    let cusArr = customerSearch ? customerSearch.steps ? customerSearch.steps : [] : [];
    let cusSearch = cusArr.map((p, index) => {
      return (
        <tr onClick={this.onSelectJobStep(p)} className={`pointer${this.state.selectedJob == p.id ? ' active' : ''}`} key={p.id} >
          <td className="dw-10">
            {index + 1}
          </td>
          <td>{p.order.customer.code}</td>
          <td className="dw-60">
            <div>
              {p.order.customer.full_name}
            </div>
          </td>
          <td>{p.order.customer.gender == "male" ? "nam" : "n???"}</td>
          <td>{new Date(p.order.customer.birthday).toLocaleString('en-NZ', { dateStyle: "medium" })}</td>
          <td>{p.order.customer.contacts[0].address.street},{p.order.customer.contacts[0].address.ward}
            ,{p.order.customer.contacts[0].address.district},{p.order.customer.contacts[0].address.province}
          </td>
          <td>{p.status === STATUS.DONE ? "???? HO??N TH??NH" : "??ANG KH??M"}</td>
        </tr>
      );
    })
    let modeList = patientList.sort((a, b) => this.sortByName(b.status, a.status))
      // .filter(p => p.order.customer? p.order.customer.code? p.order.customer.code.search(textFilter) : [] : []>= 0)
      .filter(p=>{
        if(textFilter.length > 5){
          return p.order.customer.code == textFilter
        }
        return p
      } )
      .map((p, index) => {
        return (
          <tr onClick={(e) => this.onSelectJobStep(p)} className={`pointer${this.state.selectedJob == p.id ? ' active' : ''}`} key={p.id} >
            <td className="dw-10">
              {index + 1}
            </td>
            <td>{p.order.customer.code}</td>
            <td className="dw-60">
              <div>
                {p.order.customer.full_name}
              </div>
            </td>
            <td>{p.order.customer.gender == "male" ? "nam" : "n???"}</td>
            <td>{new Date(p.order.customer.birthday).toLocaleString('en-NZ', { dateStyle: "medium" })}</td>
            <td>{p.order.customer.contacts[0].address.province}
            </td>
            <td>{p.status === STATUS.RUNNING ? "??ANG X??T NGHI???M" : "CH??? KH??M"}</td>
          </tr>
        );
      })
    return (
      <div className="patientList ">
        <div className="title-card mb-5"><span className="material-icons">people</span> {this.props.titleOfList}</div>
        <div className="patientList-search mb-3">
          <Input
            maxLength="10"
            autoFocus
            style={{ 'fontFamily': 'Arial, Material Icons' }}
            type="text"
            placeholder="&#xe8b6; L???c theo m??..."
            value={textFilter}
            onChange={(ev) => this.onFilterChange(ev)}></Input>
        </div>
        <div className="tableFixHead">
          {mode === "doctor" && (
            <div className="table-responsive min-h-60 df-h-90">
              <table className="table table-head-fixed table-bordered"
                onKeyDown={(e) => Util.onKeyDown(e)}
                data-index="1">
                <thead>
                  <tr>
                    <th className="dw-5">STT</th>
                    <th className="dw-15">M?? b???nh nh??n</th>
                    <th className="dw-60">B???nh nh??n</th>
                    <th>Gi???i t??nh</th>
                    <th>Ng??y sinh</th>
                    <th>?????a ch???</th>
                    <th>Tr???ng th??i</th>
                  </tr>
                </thead>
                <tbody className="body-half-screen">
                  { modeList }
                </tbody>
              </table>
            </div>
          )}
          {mode === "exam" && (
            <div className="table-responsive min-h-65 df-h-75">
              <table className="table table-head-fixed table-bordered">
                <thead>
                  <tr>
                    <th className="dw-3">STT</th>
                    <th>M?? b???nh nh??n</th>
                    <th className="dw-40">B???nh nh??n</th>
                    <th>T??n X??t nghi??m</th>
                  </tr>
                </thead>
                <tbody className="bodyTable">
                  {patientList ? (
                    patientList.filter(p => p.code.search(textFilter) >= 0).map((p, index) => {
                      return (
                        <tr onClick={(e) => this.onSelectJobStep(p)} className={`pointer${this.state.selectedJob == p.id ? ' active' : ''}`} key={p.id} >
                          <td className="dw-3">
                            {index + 1}
                          </td>
                          <td>{p.order.customer.code}</td>
                          <td className="dw-40">
                            <div>
                              {p.order.customer.full_name}
                            </div>
                          </td>
                          <td className="status-cus">
                            {p ? p.order.items[0].ref_value.name : ""}
                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <span></span>
                  )}
                </tbody>
              </table>
            </div>)}
          {mode === "xray" && (
            <div className="table-responsive min-h-80 dh-80">
              <table className="table table-head-fixed table-bordered">
                <thead>
                  <tr>
                    <th className="dw-10">STT</th>
                    <td>M?? b???nh nh??n</td>
                    <th>B???nh nh??n</th>
                  </tr>
                </thead>
                <tbody className="bodyTable">
                  {patientList ? (
                    patientList.filter(p => p.code.search(textFilter) >= 0).map((p, index) => {
                      return (
                        <tr onClick={(e) => this.onSelectJobStep(p)} className={`pointer${this.state.selectedJob == p.id ? ' active' : ''}`} key={p.id} >
                          <td className="dw-10">
                            {index + 1}
                          </td>
                          <td>{p.order.customer.code}</td>
                          <td className="dw-40">
                            <div >
                              {p.order.customer.full_name}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <span></span>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PatientList;
