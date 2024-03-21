import React from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table
} from "reactstrap"

class TransactionDetailModal extends React.Component {
  state = {
    show: this.props.showModalDetail,
    data: this.props.inHistory,
    transactionDetail: this.props.transactionDetail
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.showModalDetail !== null && prevProps.showModalDetail === null)
    || (this.props.showModalDetail !== null && prevState !== null && this.props.showModalDetail !== prevState.show)
    || (this.props.inHistory !== null && prevProps.inHistory === null)
    || (this.props.inHistory !== null && prevState !== null && this.props.inHistory !== prevState.data)
    || (this.props.transactionDetail !== null && prevProps.transactionDetail === null)
    || (this.props.transactionDetail !== null && prevState !== null && this.props.transactionDetail !== prevState.transactionDetail)
    ) {
      this.setState({
        show: this.props.showModalDetail,
        data: this.props.inHistory,
        transactionDetail: this.props.transactionDetail
      });
    }
  }
  render() {
    let {show, data, transactionDetail} = this.state
    return (
      <Modal
          isOpen={show}
          toggle={this.props.toggleModalDetail}
          className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              toggle={this.props.toggleModalDetail}
              className={"bg-info"}
            >
            Transaction Detail
            </ModalHeader>
            <ModalBody className="modal-dialog-centered ecommerce-application">
              {data.length > 0 ?
               (
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>VAT + SVC</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  {this.props.renderTransactionDetail(transactionDetail)}
                </Table>
               ) : "No History Order"
              }

            </ModalBody>
            <ModalFooter>
              <Button.Ripple outline color= "danger" onClick={this.props.toggleModalDetail}>
                Close
              </Button.Ripple>{" "}
            </ModalFooter>
      </Modal>
    )

  }
}
export default TransactionDetailModal
