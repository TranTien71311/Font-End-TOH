import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Spinner
  } from "reactstrap"

  class ModalPublic extends React.Component {

    render() {
      return(

        <><Modal
          isOpen={this.props.show}
          toggle={this.props.toggleModal}
          className="modal-dialog-centered"
        >
            <ModalHeader
              toggle={this.props.toggleModal}
              className={"bg-info"}
            >
              Public
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
              {this.props.msg}
            </ModalBody>
            <ModalFooter>
              <Button.Ripple outline color= "info"
              onClick={() => {
                if(!this.props.loading)
                this.props.handelConfirm()
              }}
              >
              {this.props.loading ?<Spinner color="primary" size="sm" type="grow" /> : ""}
                {" Confirm"}
              </Button.Ripple>{" "}
              <Button.Ripple outline color= "danger" onClick={this.props.toggleModal}>
                Cancel
              </Button.Ripple>{" "}
            </ModalFooter>
          </Modal></>
      )
    }
  }
  export default ModalPublic
