import React, { Component } from "react"
import { Label, Input, FormGroup, Button,Spinner } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"

class SyncSidebar extends Component {
  state = {
    SyncID: 0,
    SyncName: "",
    APIGetLink: "",
    APIPostLink: "",
    SyncValue: ""
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.data !== null && prevProps.data === null) || (this.props.data !== null && prevState !== null && this.props.data.SyncID !== prevState.SyncID)) {
      if (this.props.data.SyncID !== prevState.SyncID) {
        this.setState({ SyncID: this.props.data.SyncID })
      }
      if (this.props.data.SyncName !== prevState.SyncName) {
        this.setState({ SyncName: this.props.data.SyncName })
      }
      if (this.props.data.APIGetLink !== prevState.APIGetLink) {
        this.setState({ APIGetLink: this.props.data.APIGetLink })
      }
      if (this.props.data.APIPostLink !== prevState.APIPostLink) {
        this.setState({ APIPostLink: this.props.data.APIPostLink })
      }
      if (this.props.data.SyncValue !== prevState.SyncValue) {
        this.setState({ SyncValue: this.props.data.SyncValue })
      }
    }
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if(!this.props.loadingUpdate){
        this.props.editData(obj);
      }

    }
    // else {
    //   this.addNew = true
    //   this.props.addData(obj)
    // }
  }

  render() {
    let { show, data, handleSidebar, loadingUpdate } = this.props
    let { SyncName, APIGetLink, APIPostLink, SyncValue } = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE FUNCTION SYNC" : "ADD NEW FUNCTION"}</h4>
          <X size={20} onClick={() =>handleSidebar(false)}/>
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          <FormGroup>
            <Label for="data-name">Sync Name</Label>
            <Input
              type="text"
              value={SyncName}
              placeholder="Sync Data "
              onChange={e => this.setState({ SyncName: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-name">API Get Link</Label>
            <Input
              type="text"
              value={APIGetLink}
              placeholder="/api/Products"
              onChange={e => this.setState({ APIGetLink: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-name">API Post Link</Label>
            <Input
              type="text"
              value={APIPostLink}
              placeholder="/api/POSProduct"
              onChange={e => this.setState({ APIPostLink: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-name">Sync Values</Label>
            <Input
              type="textarea"
              value={SyncValue}
              placeholder="[{ProductNum: ProductCode}, {ProducName: ProductName}]"
              onChange={e => this.setState({ SyncValue: e.target.value })}
              id="data-name"
            />
          </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => {this.handleSubmit(this.state)}}>
            {loadingUpdate ?<Spinner color="white" size="sm" type="grow" /> : ""}
            {data !== null ? " Update" : "Create"}
          </Button>
          <Button
            onClick={() => handleSidebar(false)}
            className="ml-1"
            color="danger"
            outline>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}
export default SyncSidebar
