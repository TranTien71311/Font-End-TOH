import React, { Component } from "react"
import {
  Progress,
  Input,
  UncontrolledTooltip
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import {
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3
} from "react-feather"
import { connect } from "react-redux"
import {
  getData,
  getInitialData,
  filterData,
  updateData,
  startSync
} from "../../../redux/actions/sync-data"
import Sidebar from "./SyncSidebar"
import Chip from "../../../components/@vuexy/chips/ChipComponent"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"

import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import {colorPrimary} from "../../../assets/color"
import ModalAPIResult from "../../modal/modalAPIResult"
import ModalSync from "../../modal/modalSync"
import Spinner from "../../../components/formLoading"
import {setSessionUri} from "../../../codes/function"

const chipColors = {
  "on hold": "warning",
  delivered: "success",
  pending: "primary",
  canceled: "danger"
}

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#009bde !important",
      boxShadow: "0 0 1px 0 #009bde !important",
      "&:hover": {
        transform: "translateY(0px) !important"
      }
    }
  }
}

const ActionsComponent = props => {
  if(props.currentUser.includes("EDIT_SYNC")){
    return (
      <div className="data-list-action">
      <Download
        className="cursor-pointer text-primary"
        size={20}
        onClick={() => {
          return props.currentData(props.row)
        }}
        id="UncontrolledSync"
      />
      <Edit3
        className="cursor-pointer ml-2 text-primary"
        size={20}
        onClick={() => {
          return props.editRow(props.row)
        }}
        id="UncontrolledEdit"
      />
      <UncontrolledTooltip
        placement="top"
        target="UncontrolledSync"
        style={{
            backgroundColor: colorPrimary,
            color:"#000"
          }}
      >
        Start Sync!
      </UncontrolledTooltip>
      <UncontrolledTooltip
        placement="top"
        target="UncontrolledEdit"
        style={{
            backgroundColor: colorPrimary,
            color:"#000"
          }}
      >
        Edit Function!
      </UncontrolledTooltip>
    </div>
    )
  }
  return (
    <div className="data-list-action">
    <Download
      className="cursor-pointer text-primary ml-1"
      size={20}
      onClick={() => {
        return props.currentData(props.row)
      }}
      id="UncontrolledSync"
    />
    <UncontrolledTooltip
      placement="top"
      target="UncontrolledSync"
      style={{
          backgroundColor: colorPrimary,
          color:"#000"
        }}
    >
      Start Sync!
    </UncontrolledTooltip>
    </div>
  )
}

const CustomHeader = props => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">

      </div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <div className="filter-section">
          <Input type="text" onChange={e => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  )
}

class SyncConfig extends Component {

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Sync Name",
        selector: "SyncName",
        sortable: true,
        minWidth: "300px",
        cell: row => (
          <p title={row.SyncName} className="text-truncate text-bold-500 mb-0">
            {row.SyncName}
          </p>
        )
      },
      {
        name: "Progress",
        selector: "SyncID",
        sortable: true,
        cell: row => (
          typeof row.Progress === 'number' ?
          <Progress
            className="w-100 mb-10"
            color="success"
            value={row.Progress}
          />
          :
          <p className="text-truncate text-bold-500 mb-0 text-danger">
            {row.Progress}
          </p>

        )
      },
      {
        name: "Status",
        selector: "SyncID",
        sortable: true,
        cell: row => (
          <Chip
            className="m-0"
            color={(row.Status === 0 ? "" : row.Status === 1 ? chipColors.pending : row.Status === 2 ? chipColors["on hold"] : row.Status === 3 ? chipColors.delivered : chipColors.canceled)}
            text={(row.Status === 0 ? "Ready" : row.Status === 1 ? "Start sync..." : row.Status === 2 ? "In sync..." :  row.Status === 3 ? "Successfully" : "Error")}
          />
        )
      },
      {
        name: "Actions",
        sortable: true,
        cell: row => (
          <ActionsComponent
            row={row}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleSyncData}
            editRow={this.handleEdit}
            currentUser={this.props.currentUser}
          />
        )
      }
    ],
    allData: [],
    value: "",
    rowsPerPage: 1,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    showModalApi: false,
    loading: false,
    statusAPI: 0,
    messageAPI: "",
    showModalSync:false,
    messageSync: "",
    loadingUpdate: false,
    timeAPI: ""
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.dataSync.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {

      return {
        data: props.dataSync.data,
        allData: props.dataSync.filteredData,
        totalPages: props.dataSync.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataSync.totalRecords,
        sortIndex: props.dataSync.sortIndex,
        statusAPI: props.dataSync.statusAPI,
        showModalApi: props.dataSync.showModalApi,
        messageAPI: props.dataSync.messageAPI,
        loading: props.dataSync.loading,
        timeAPI: props.dataSync.timeAPI
      }
    }
    // Return null if the state hasn't changed
    return null
  }

  componentDidMount() {
    setSessionUri(window.location.pathname);
    this.props.getInitialData(1000);
  }
  handleFilter = e => {
    this.setState({ value: e.target.value })
    this.props.filterData(e.target.value)
  }

  handleSidebar = (boolean = false) => {
    if(boolean === false && this.state.loadingUpdate === true){
      return;
    }
    this.setState({ sidebar: boolean})
    if(boolean === false){
      this.setState({currentData: null})
    }
  }

  handleSyncData = obj => {
    let msg = "";
    if(this.state.selected.length === 0){
      msg = "Start "+ obj.SyncName;
    }else{
      msg = "Start ";
      this.state.selected.forEach(element => {
        msg += element.SyncName + ", ";
      });
    }

    this.setState({showModalSync: true, messageSync: msg, currentData: obj})
  }
  handleEdit = obj => {
    this.setState({currentData: obj})
    this.handleSidebar(true);
  }
  handlePagination = page => {
    let { parsedFilter, getData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 1
    getData({ page: page.selected + 1, perPage: perPage })
    this.setState({ currentPage: page.selected })
  }
  toggleModalSync = () => {
    this.setState({showModalSync: !this.state.showModalSync})
  }
  editData = async (obj) => {
    this.setState({loadingUpdate: true});
    await this.props.updateData(obj, this.state.data);
    this.setState({loadingUpdate: false});
    if(this.state.statusAPI === 200){
      this.handleSidebar(false);
    }
  }
  startSync = async () => {
    let dataStart = this.state.selected.length ? this.state.selected : [this.state.currentData];
    this.toggleModalSync();
    await this.props.startSync(dataStart, this.state.data);
    this.setState({selected: [], currentData: []});
  }
  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      sidebar,
      totalRecords,
      sortIndex,
      loading,
      loadingUpdate
    } = this.state
    return (
      loading === true ?
      (
        <Spinner />
      )
      :
      (
      <div
        className={"data-list list-view"}>
        <DataTable
          columns={columns}
          data={value.length ? allData : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={page => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={data =>
            this.setState({ selected: data.selectedRows })
          }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              handleSidebar={this.handleSidebar}
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
            />
          }
          sortIcon={<ChevronDown />}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{
            color: "primary",
            icon: <Check className="vx-icon" size={12} />,
            label: "",
            size: "sm"
          }}
        />
        <Sidebar
          handleSidebar={this.handleSidebar}
          editData={this.editData}
          show={sidebar}
          data={currentData}
          loadingUpdate={loadingUpdate}
        />
        <ModalAPIResult
          show={this.state.showModalApi}
          status={this.state.statusAPI}
          msg={this.state.messageAPI}
          time={this.state.timeAPI}
        />
        <ModalSync
          show={this.state.showModalSync}
          msg={this.state.messageSync}
          toggleModalSync={this.toggleModalSync}
          startSync={this.startSync}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false)}
        />
      </div>
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    dataSync: state.dataSync,
    currentUser : state.auth.login.userRole
  }
}

export default connect(mapStateToProps, {
  getData,
  getInitialData,
  filterData,
  updateData,
  startSync
})(SyncConfig)
