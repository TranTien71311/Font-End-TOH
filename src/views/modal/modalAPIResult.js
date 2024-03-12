import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap"

  class ModalAPIResult extends React.Component {

    state = {
      show: this.props.show,
      status: this.props.status,
      msg: this.props.msg,
      time: this.props.time
    }
    componentDidUpdate(prevState) {
      if(this.props.show !== prevState.show || (this.props.show === true && this.props.time !== prevState.time)){
        this.setState({ show:  this.props.show, status:  this.props.status, msg:  this.props.msg})
      }
    }
    toggleModal = () => {
      this.setState(prevState => ({
        show: !prevState.show
      }))
    }

   refreshPage = () => {
      window.location.reload(false);
    }

    render() {
      return(

        <><Modal
          isOpen={this.state.show}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
            <ModalHeader
              toggle={this.toggleModal}
              className={this.state.status === 200 ? "bg-success" : "bg-danger"}
            >
              {this.state.status === 200 ? "Success" : "Error"}
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
              {this.state.msg}
            </ModalBody>
            <ModalFooter>
              <Button.Ripple outline color={this.state.status === 200 ? "success" : "info"}
                onClick={this.state.status === -1 ? this.refreshPage : this.toggleModal}>
                {this.state.status === -1 ? "Refresh" : "Ok"}
              </Button.Ripple>{" "}
            </ModalFooter>
          </Modal></>
      )
    }
  }
  export default ModalAPIResult
