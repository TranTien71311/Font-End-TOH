import React from "react"
import Sidebar from "react-sidebar"
import { ContextLayout } from "../../../../utility/context/Layout"
import Ward from "./Ward"
import Patient from "./Patient"
import TaskSidebar from "./TaskSidebar"
import "../../../../assets/scss/pages/app-todo.scss"
import {
  getInitialData,
  setPatientSelected,
  updateShipTransaction,
  getTransactionDetail,
  getPatientByRoom,
  setRoomSelected,
  setWardSelected
} from "../../../../redux/actions/alacarte-order/get-data"
import { connect } from "react-redux"
import {setSessionUri} from "../../../../codes/function"
import Spinner from "../../../../components/formLoading"
import ModalAPIResult from "../../../modal/modalAPIResult"
const mql = window.matchMedia(`(min-width: 992px)`)

class Config extends React.Component {
  state = {
    addTask: false,
    sidebarDocked: mql.matches,
    sidebarOpen: false,
    taskToUpdate: null,
    prevState: null,
    dataWard: [],
    dataRoom: [],
    dataPatient: [],
    dataPatientFilter:[],
    showModalApi: false,
    loading: true,
    statusAPI: 0,
    messageAPI: "",
    loadingUpdate: false,
    timeAPI: "",
    transactionDetail: [],
    wardSelected : {},
    roomSelected: {},
    dataRoomShow: []
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataOrders.dataWard.length !== state.dataWard.length
      || props.dataOrders.dataRoom.length !== state.dataRoom.length
      || props.dataOrders.dataPatient !== state.dataPatient
      || props.dataOrders.transactionDetail !== state.transactionDetail
      || props.dataOrders.wardSelected !== state.wardSelected
      || props.dataOrders.roomSelected !== state.roomSelected
    ) {
      return {
        dataWard: props.dataOrders.dataWard,
        dataRoom: props.dataOrders.dataRoom,
        dataPatient: props.dataOrders.dataPatient,
        transactionDetail: props.dataOrders.transactionDetail,
        wardSelected: props.dataOrders.wardSelected,
        roomSelected: props.dataOrders.roomSelected
      }
    }
    return null
  }

  initalData = async () => {

    this.setState({loading: true});
    await this.props.getInitialData();
    if(this.state.dataWard.length !== 0 && Object.keys(this.state.wardSelected).length === 0){
      this.setWardSelected(this.state.dataWard[0])
    }
    else{
      let dataShow = this.state.dataRoom.filter(x=>x.WardID === this.state.wardSelected.WardID);
      this.setState({dataRoomShow: dataShow});
    }
    if(this.state.dataRoom.length !== 0 && Object.keys(this.state.roomSelected).length !== 0){
      this.getPatient(this.state.roomSelected.RoomID);
    }
    this.setState({loading: false});
  }
  setWardSelected = (obj) => {
    this.props.setWardSelected(obj);
    let dataShow = this.state.dataRoom.filter(x=>x.WardID === obj.WardID);
    this.setState({dataRoomShow: dataShow});
    // if(dataShow.length !== 0 && Object.keys(this.state.roomSelected).length === 0){
    //   this.setRoomSelected(dataShow[0]);
    // }
  }
  setRoomSelected = (obj) => {
    this.props.setRoomSelected(obj);
  }
  getPatient = async (roomID) => {
    await this.props.getPatientByRoom(roomID);
    this.setState({dataPatientFilter: this.state.dataPatient})
  }
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged)
    setSessionUri(window.location.pathname);
    this.initalData();
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
  }

  handleUndoChanges = arr => {
    this.setState({
      prevState: arr
    })
  }

  filterPatient = (roomID) => {
    if(roomID !== null && roomID === "" && typeof roomID === 'undefined')
    {
      this.setState({dataPatientFilter: []})
      return
    }
    let dataFilter = this.state.dataPatient.filter(x=>x.RoomID === roomID);
    this.setState({dataPatientFilter: dataFilter})
  }
  seachPatient = (value) => {
    let dataFilter = this.state.dataPatient.filter(item => {
      let startsWithCondition =
        item.PatientFullName.toLowerCase().startsWith(value.toLowerCase());
      let includesCondition =
        item.PatientFullName.toLowerCase().includes(value.toLowerCase());

      if (startsWithCondition) {
        return startsWithCondition
      } else if (!startsWithCondition && includesCondition) {
        return includesCondition
      } else return null
    })
    this.setState({dataPatientFilter: dataFilter})
  }
  handlePatientOrder = (obj) => {
    this.props.setPatientSelected(obj);
  }
  showModalAPI = (status, show, message, time) => {
    this.setState({statusAPI: status, showModalApi: show, messageAPI: message, timeAPI: time})
  }
  render() {
    return (
      this.state.loading === true ?
      (
        <Spinner />
      )
      :
      (
      <div className="todo-application position-relative">
        <div
          className={`app-content-overlay ${
            this.state.addTask || this.state.sidebarOpen ? "show" : ""
          }`}
          onClick={() => {
            this.onSetSidebarOpen(false)
          }}
        />
        <ContextLayout.Consumer>
          {context => (
            <Sidebar
              sidebar={
                <Ward
                  routerProps={this.props}
                  addTask={this.handleAddTask}
                  mainSidebar={this.onSetSidebarOpen}
                  dataWards={this.state.dataWard}
                  dataRooms={this.state.dataRoom}
                  filterPatient={this.filterPatient}
                  getPatient={this.getPatient}
                  wardSelected={this.state.wardSelected}
                  roomSelected={this.state.roomSelected}
                  setWardSelected={this.setWardSelected}
                  setRoomSelected={this.setRoomSelected}
                  dataRoomShow={this.state.dataRoomShow}
                />
              }
              docked={this.state.sidebarDocked}
              open={this.state.sidebarOpen}
              sidebarClassName="sidebar-content todo-sidebar d-flex"
              touch={false}
              contentClassName="sidebar-children d-none"
              pullRight={context.state.direction === "rtl"}>
              ""
            </Sidebar>
          )}
        </ContextLayout.Consumer>
        <Patient
          routerProps={this.props}
          handleUpdateTask={this.handleUpdateTask}
          mainSidebar={this.onSetSidebarOpen}
          prevState={this.state.prevState}
          dataPatients={this.state.dataPatientFilter}
          seachPatient={this.seachPatient}
          handlePatientOrder={this.handlePatientOrder}
          updateShipTransaction={this.props.updateShipTransaction}
          showModalAPI={this.showModalAPI}
          transactionDetail={this.state.transactionDetail}
          getTransactionDetail={this.props.getTransactionDetail}
        />
        <TaskSidebar
          addTask={this.handleAddTask}
          addTaskState={this.state.addTask}
          taskToUpdate={this.state.taskToUpdate}
          newTask={this.state.newTask}
          mainSidebar={this.onSetSidebarOpen}
          handleUndoChanges={this.handleUndoChanges}
        />
        <ModalAPIResult
          show={this.state.showModalApi}
          status={this.state.statusAPI}
          msg={this.state.messageAPI}
          time={this.state.timeAPI}
        />
      </div>
      )
    )
  }
}
const mapStateToProps = state => {

  return {
    dataOrders: state.dataOrder
  }
}
export default connect(mapStateToProps,
  {
    getInitialData,
    setPatientSelected,
    updateShipTransaction,
    getTransactionDetail,
    getPatientByRoom,
    setRoomSelected,
    setWardSelected
  }
  )(Config)
