import React from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  Spinner
} from "reactstrap"
import Moment from 'moment';

class HistoryOrderModal extends React.Component {
  state = {
    show: this.props.showModalHistory,
    data: this.props.inHistory,
    loading: this.props.loadingUpdate,
    transaction: this.props.transactionSelected,
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.showModalHistory !== null && prevProps.showModalHistory === null)
    || (this.props.showModalHistory !== null && prevState !== null && this.props.showModalHistory !== prevState.show)
    || (this.props.inHistory !== null && prevProps.inHistory === null)
    || (this.props.inHistory !== null && prevState !== null && this.props.inHistory !== prevState.data)
    || (this.props.loadingUpdate !== null && prevProps.loadingUpdate === null)
    || (this.props.loadingUpdate !== null && prevState !== null && this.props.loadingUpdate !== prevState.loading)
    || (this.props.transactionSelected !== null && prevProps.transactionSelected === null)
    || (this.props.transactionSelected !== null && prevState !== null && this.props.transactionSelected !== prevState.transaction)
    ) {
      this.setState({
        show: this.props.showModalHistory,
        data: this.props.inHistory,
        loading: this.props.loadingUpdate,
        transaction: this.props.transactionSelected
      });
    }
  }
  render() {
    let {show, data, loading, transaction} = this.state
    return (
      <Modal
      isOpen={show}
      toggle={this.props.toggleModalHistory}
      className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          toggle={this.props.toggleModalHistory}
          className={"bg-info"}
        >
        History Orders
        </ModalHeader>
        <ModalBody className="modal-dialog-centered ecommerce-application">
          {this.state.data.length > 0 ?
           (
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Transaction</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                data.map((el,i) => {
                  return (
                    <tr key={i}>
                      <td>{el.Status === 0 ? "New" : "Shiped"}</td>
                      <td>Transaction: {el.TransactionCode} , Time Order: {Moment(el.TimeOrder).format("MM-DD-YYYY HH:mm")}</td>
                      <td className="text-left">
                      <Button.Ripple outline color= "primary mr-1"
                      onClick={ async () => {
                        await this.props.handleClickDetail(el);
                      }}>
                        Detail
                      </Button.Ripple>
                      {
                        el.Status === 0 ?
                        (

                          <Button.Ripple color= "success" onClick={
                            () => {
                              this.props.handleClickShiped(true, el);
                            }}>
                            {(loading && transaction.TransactionCode === el.TransactionCode) ?<Spinner color="white" size="sm" type="grow" /> : ""}
                            Shiped
                          </Button.Ripple>
                        )
                        : null
                      }

                      </td>
                    </tr>
                  )
                })
                }

              </tbody>
            </Table>
           ) : "No History Order"
          }

        </ModalBody>
        <ModalFooter>
          <Button.Ripple outline color= "danger" onClick={this.props.toggleModalHistory}>
            Close
          </Button.Ripple>{" "}
        </ModalFooter>
      </Modal>
    )

  }
}
export default HistoryOrderModal
