import React from "react"
import {
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap"
import { Menu, Search, Info, ShoppingCart, Clock } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import Moment from 'moment';
import {colorPrimary} from "../../../../assets/color"
import { history } from "../../../../history"
import "../../../../assets/scss/pages/users.scss"
import {formatVND} from "../../../../codes/function"
import HistoryOrderModal from "./HistoryOrderModal";
import InfoModal from "./InfoModal"
import TransactionDetailModal from "./TransactionDetailModal";

class Patient extends React.Component {
  state = {
    patients: this.props.dataPatients,
    patientSelected: {},
    value: "",
    showModalHistory: false,
    showModalInfo: false,
    inHistory: [],
    loadingUpdate: false,
    transactionSelected: {},
    showModalDetail: false,
    transactionDetail: []
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.dataPatients !== null && prevProps.dataPatients === null)
    || (this.props.dataPatients !== null && prevState !== null && this.props.dataPatients !== prevState.patients)
    ) {
      this.setState({ patients: this.props.dataPatients});
    }
    if ((this.props.transactionDetail !== null && prevProps.transactionDetail === null)
    || (this.props.transactionDetail !== null && prevState !== null && this.props.transactionDetail !== prevState.transactionDetail)
    ) {
      this.setState({ transactionDetail: this.props.transactionDetail});
    }
  }
  toggleModalHistory = () => {
    this.setState(prevState => ({
      showModalHistory: !prevState.showModalHistory
    }))

  }
  toggleModalInfo = () => {
    this.setState(prevState => ({
      showModalInfo: !prevState.showModalInfo
    }))

  }
  toggleModalDetail = () => {
    this.setState(prevState => ({
      showModalDetail: !prevState.showModalDetail
    }))

  }
  handleUpdateTrans = async (obj) => {
    let dataUp = {
      TransactionCode: obj.TransactionCode,
      Status: 1,
      PatientID : obj.PatientID
    }
    await this.props.updateShipTransaction(dataUp);
    this.toggleModalHistory();
    this.props.showModalAPI(200, true, "Update successfully", new Date());
    this.setState({loadingUpdate: false});
  }
  checkNumTransNew = (trans) => {
    let tranNew = trans.filter(x=>x.Status === 0)
    if(tranNew.length > 0){
      return true;
    }
    return false;
  }
  handleOnChange = e => {
    this.setState({ value: e.target.value })
    this.props.seachPatient(e.target.value)
  }
  renderTransactionDetail = (trans) => {
    let totalPrice = 0;
    let totalVAT = 0;
    let total = 0;
    let tranDetails = trans.length > 0 ? trans.map((el,i) => {
      if(el.ProductNum != 2004){
        totalPrice += el.Price;
        totalVAT += el.TotalTax;
        total += (el.Price + el.TotalTax)
        return (
          <tr key={i}>
          <td>{el.Quantity}</td>
          <td>{el.ProductName}</td>
          <td>{formatVND(el.Price)}</td>
          <td>{formatVND(el.TotalTax)}</td>
          <td>{formatVND(el.TotalTax + el.Price)}</td>
        </tr>
        )
      }
    }) : null
    return (
      <tbody>
        {tranDetails}
        <tr>
          <td></td>
          <td className="text-right">Total:</td>
          <td>{formatVND(totalPrice)}</td>
          <td>{formatVND(totalVAT)}</td>
          <td>{formatVND(total)}</td>
        </tr>
      </tbody>
    )
  }
  handleClickShiped = (isLoading, el) => {
    this.setState({loadingUpdate: isLoading, transactionSelected: el});
    this.handleUpdateTrans(el);
  }
  handleClickDetail = async (el) => {
    await this.props.getTransactionDetail(el.TransactionCode);
    this.toggleModalDetail()
  }
  render() {
    const { patients, patientSelected, value } = this.state
    let renderPatients =
    patients.length > 0 ? (
      patients.map((patient, i) => {
          return (
            <li
              className={`todo-item`}
              key={i}
              // onClick={() => {
              //   handleUpdateTask(todo)
              // }}
            >
              <div className="todo-title-wrapper d-flex justify-content-between mb-50">
                <div className="todo-title-area d-flex align-items-center">
                  <div className="title-wrapper d-flex">
                    <h6 className="todo-title mt-50 mx-50">{patient.PatientFullName}</h6>
                    <div className="chip-wrapper">
                        <div className="chip mb-0" key={i}>
                          <div className="chip-body">
                            <span className="chip-text">
                              <span
                                className="bullet bullet-primary bullet-xs"
                              />
                              <span className="text-capitalize ml-25">
                                {patient.BedName}
                              </span>
                            </span>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div
                  className="todo-item-action d-flex justify-content-end"
                >
                  <div
                    className="todo-item-info d-inline-block mr-1 mr-sm-1"
                  >
                    <ShoppingCart
                      size={30}
                      className="text-success"
                      id="UncontrolledOrder"
                      onClick={()=>{
                        this.props.handlePatientOrder(patient)
                        history.push("/orders/menu-alacarte")

                      }}
                    />
                    <UncontrolledTooltip
                      placement="bottom"
                      target="UncontrolledOrder"
                      style={{
                          backgroundColor: colorPrimary,
                          color:"#000"
                        }}
                    >
                      Click Order
                    </UncontrolledTooltip>
                  </div>
                  <div
                    className="todo-item-info d-inline-block mr-1 mr-sm-1"
                  >
                    <Clock
                      size={30}
                      className={(patient.Transactions.filter(x=>x.Status === 0)).length > 0 ? "text-danger" : "text-warning"}
                      id="UncontrolledHistory"
                      onClick={
                        () => {
                          this.setState({inHistory: patient.Transactions})
                          this.toggleModalHistory()
                          }
                        }
                    />
                    <UncontrolledTooltip
                      placement="bottom"
                      target="UncontrolledHistory"
                      style={{
                          backgroundColor: colorPrimary,
                          color:"#000"
                        }}
                    >
                      {(patient.Transactions.length > 0) ? (" new orders") : "Click View History Order"}
                    </UncontrolledTooltip>
                  </div>
                  <div
                    className="todo-item-info d-inline-block mr-1 mr-sm-0"
                  >
                    <Info
                      size={30}
                      className="text-primary"
                      id="UncontrolledInfo"
                      onClick={()=>{
                        this.setState({patientSelected: patient})
                        this.toggleModalInfo()
                      }}
                    />
                    <UncontrolledTooltip
                      placement="bottom"
                      target="UncontrolledInfo"
                      style={{
                          backgroundColor: colorPrimary,
                          color:"#000"
                        }}
                    >
                      Click View Patient Info
                    </UncontrolledTooltip>
                  </div>

                </div>
              </div>
                <p className="todo-desc truncate mb-0 mx-50">{"DoB: " + Moment(patient.DoB).format("MM-DD-YYYY")}</p>
                <p className="todo-desc truncate mb-0 mx-50">{"Nationality: " + patient.Nationality}</p>
            </li>
          )
        })
      ) : (
        <p className="p-1 text-center mt-2 font-medium-3 text-bold-500">
          No patients in this room
        </p>
      )

    return (
      <div className="content-right">
        <div className="todo-app-area">
          <div className="todo-app-list-wrapper">
            <div className="todo-app-list">
              <div className="app-fixed-search">
                <div
                  className="sidebar-toggle d-inline-block d-lg-none"
                  onClick={() => this.props.mainSidebar(true)}
                >
                  <Menu size={24} />
                </div>
                <FormGroup className="position-relative has-icon-left m-0 d-inline-block d-lg-block">
                  <Input
                    type="text"
                    placeholder="Search patient name..."
                    onChange={e => this.handleOnChange(e)}
                    value={value}
                  />
                  <div className="form-control-position">
                    <Search size={15} />
                  </div>
                </FormGroup>
              </div>
              <PerfectScrollbar
                className="todo-task-list"
                options={{
                  wheelPropagation: false
                }}
              >
                <ul className="todo-task-list-wrapper">{renderPatients}</ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
        <HistoryOrderModal
          showModalHistory={this.state.showModalHistory}
          inHistory={this.state.inHistory}
          loadingUpdate={this.state.loadingUpdate}
          transactionSelected={this.state.transactionSelected}
          toggleModalHistory={this.toggleModalHistory}
          handleClickDetail={this.handleClickDetail}
        />
        <InfoModal
          showModalInfo={this.state.showModalInfo}
          toggleModalInfo={this.toggleModalInfo}
          patientSelected={patientSelected}
        />
        <TransactionDetailModal
          showModalDetail={this.state.showModalDetail}
          toggleModalDetail={this.toggleModalDetail}
          inHistory={this.state.inHistory}
          transactionDetail={this.props.transactionDetail}
          renderTransactionDetail={this.renderTransactionDetail}
        />
      </div>

    )
  }
}
export default Patient
