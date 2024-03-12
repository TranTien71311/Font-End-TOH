import React from "react"
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "reactstrap"

  class ModalQuestion extends React.Component {
    state = {
      show: false,
    }
    componentDidUpdate(prevProps,prevState) {
      if(
        (this.props.showModalQuestion !== null && prevProps.showModalQuestion === null)
        || (this.props.showModalQuestion !== null && prevState !== null && this.props.showModalQuestion !== prevState.show)
        ){
        this.setState({ show:  this.props.showModalQuestion})
      }
    }
    toggleModal = () => {
      this.setState(prevState => ({
        show: !prevState.show
      }))
      if(this.state.show === false){
        this.props.handleHideModalQues();
      }
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
              className={"bg-info"}
            >
              Question
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
              {this.props.msg}
            </ModalBody>
            <ModalFooter>
              <Button.Ripple outline color= "danger" onClick={this.toggleModal}>
                Cancel
              </Button.Ripple>{" "}
            </ModalFooter>
          </Modal></>
      )
    }
  }
  export default ModalQuestion
