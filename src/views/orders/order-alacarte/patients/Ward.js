import React from "react"
import { ListGroup, ListGroupItem } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import { X, MapPin } from "react-feather"
import { connect } from "react-redux"
import { changeFilter } from "../../../../redux/actions/todo/index"

class Ward extends React.Component {
  state = {
    wards: this.props.dataWards,
    wardSelected: this.props.wardSelected,
    rooms: this.props.dataRooms,
    roomSelected: this.props.roomSelected,
    dataRoomShow: this.props.dataRoomShow
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.dataWards !== null && prevProps.dataWards === null)
    || (this.props.dataWards !== null && prevState !== null && this.props.dataWards !== prevState.wards)
    ) {
      this.setState({ wards: this.props.dataWards});
    }
    if ((this.props.wardSelected !== null && prevProps.wardSelected === null)
    || (this.props.wardSelected !== null && prevState !== null && this.props.wardSelected !== prevState.wardSelected)
    ) {
      let dataShow = this.props.dataRooms.filter(x=>x.WardID === this.props.wardSelected.WardID);
      this.setState({ wardSelected: this.props.wardSelected, dataRoomShow: dataShow});
    }
    if ((this.props.dataRooms !== null && prevProps.dataRooms === null)
    || (this.props.dataRooms !== null && prevState !== null && this.props.dataRooms !== prevState.rooms)
    ) {
      this.setState({ rooms: this.props.dataRooms});
    }
    if ((this.props.roomSelected !== null && prevProps.roomSelected === null)
    || (this.props.roomSelected !== null && prevState !== null && this.props.roomSelected !== prevState.roomSelected)
    ) {
      this.setState({ roomSelected: this.props.roomSelected});
    }
  }
  render() {
    let renderWards = this.state.wards.map((ward, i) => {
      return (
        <ListGroupItem
          className={"border-0 "+ (this.state.wardSelected.WardID === ward.WardID ? "text-primary" : "")}
          key={i}
          onClick={()=>{
            // let roomShow = this.state.rooms.filter(x => x.WardID === ward.WardID);
            // this.setState({wardSelected: ward, dataRoomShow: roomShow})
            this.props.setWardSelected(ward);
            // if(roomShow.length !== 0){
            //   this.props.getPatient(roomShow[0].RoomID);
            // }
          }}
        >
          <MapPin size={22} />
          <span className="align-middle ml-1">{ward.WardNameEn}</span>
        </ListGroupItem>
      );
    })
    let renderRooms = this.state.dataRoomShow.map((room, i) => {
      return (
        <ListGroupItem
          className={"border-0 "+ (this.state.roomSelected.RoomID === room.RoomID ? "text-primary" : "")}
          key={i}
          onClick={()=>{
            //this.setState({roomSelected: room.RoomID})
            this.props.setRoomSelected(room);
            this.props.getPatient(room.RoomID);
          }}
        >
          <span className="bullet bullet-primary align-middle" />
          <span className="align-middle ml-1">{room.RoomNameEn}</span>
        </ListGroupItem>
      );
    })
    return (
      <React.Fragment>
        <span
          className="sidebar-close-icon"
          onClick={() => this.props.mainSidebar(false)}
        >
          <X size={15} />
        </span>
        <div className="todo-app-menu">
          <PerfectScrollbar
            className="sidebar-menu-list"
            options={{
              wheelPropagation: false
            }}
          >
            <h5 className="mt-2 mb-1">Wards</h5>
            <ListGroup className="font-medium-1">
              {renderWards}
            </ListGroup>
            <hr />
            <h5 className="mt-2 mb-1 pt-25">Rooms</h5>
            <ListGroup className="font-medium-1">
              {renderRooms}
            </ListGroup>
          </PerfectScrollbar>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(null, { changeFilter})(Ward)
