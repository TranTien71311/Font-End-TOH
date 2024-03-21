import React from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap"
import Moment from 'moment';

class InfoModal extends React.Component {
  state = {
    show: this.props.showModalInfo,
    data: this.props.patientSelected
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('bcjasi')
    if ((this.props.showModalInfo !== null && prevProps.showModalInfo === null)
    || (this.props.showModalInfo !== null && prevState !== null && this.props.showModalInfo !== prevState.show)
    || (this.props.patientSelected !== null && prevProps.patientSelected === null)
    || (this.props.patientSelected !== null && prevState !== null && this.props.patientSelected !== prevState.data)
    ) {
      this.setState({
        show: this.props.showModalInfo,
        data: this.props.patientSelected
      });
    }
  }
  render() {
    let {show, data} = this.state
    return (
      <Modal
      isOpen={show}
      toggle={this.props.toggleModalInfo}
      className="modal-dialog-centered"
      >
        <ModalHeader
          toggle={this.props.toggleModalInfo}
          className={"bg-info"}
        >
        Information
        </ModalHeader>
        <ModalBody className="modal-dialog-centered ecommerce-application">
        {

          Object.keys(data).length ?
          (
            <div className="users-page-view-table">
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                 Full name:
                </div>
                <div className="float-right">{data.PatientFullName}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                  DoB:
                </div>
                <div>{Moment(data.DoB).format("MM-DD-YYYY")}</div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                Nationality:
                </div>
                <div className="text-truncate">
                  <span>{data.Nationality}</span>
                </div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                Primary doctor:
                </div>
                <div className="text-truncate">
                  <span>{data.PrimaryDoctor}</span>
                </div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                Length of stay:
                </div>
                <div className="text-truncate">
                  <span>{data.LengthOfStay}</span>
                </div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                Fasting from:
                </div>
                <div className="text-truncate">
                  <span>{data.FastingFrom != null ? Moment(data.FastingFrom).format("MM-DD-YYYY HH:mm") : ""}</span>
                </div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                Fasting to:
                </div>
                <div className="text-truncate">
                  <span>{data.FastingTo != null ? Moment(data.FastingTo).format("MM-DD-YYYY HH:mm") : ""}</span>
                </div>
              </div>
              <div className="d-flex user-info">
                <div className="user-info-title font-weight-bold">
                Dietary:
                </div>
                <div className="text-truncate">
                  <span>Ít muối</span>
                </div>
              </div>
            </div>
          ): null
        }

        </ModalBody>
        <ModalFooter>
          <Button.Ripple outline color= "danger" onClick={this.props.toggleModalInfo}>
            Close
          </Button.Ripple>{" "}
        </ModalFooter>
    </Modal>
    )

  }
}
export default InfoModal
