import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap"

  class ModalSync extends React.Component {

    render() {
      return(

        <><Modal
          isOpen={this.props.show}
          toggle={this.props.toggleModalSync}
          className="modal-dialog-centered"
        >
            <ModalHeader
              toggle={this.props.toggleModalSync}
              className={"bg-info"}
            >
              Sync Data
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
              {this.props.msg}
            </ModalBody>
            <ModalFooter>
              <Button.Ripple outline color= "info" onClick={this.props.startSync}>
                Confirm
              </Button.Ripple>{" "}
              <Button.Ripple outline color= "danger" onClick={this.props.toggleModalSync}>
                Cancel
              </Button.Ripple>{" "}
            </ModalFooter>
          </Modal></>
      )
    }
  }
  export default ModalSync
