import React, { Component } from "react"
import {
  Input,
  UncontrolledTooltip
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3
} from "react-feather"
import { connect } from "react-redux"
import {
  getInitialData,
  filterData,
  updateData
} from "../../../redux/actions/alacarte-config/question"
import Sidebar from "./QuestionSidebar"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import {colorPrimary} from "../../../assets/color"
import ModalAPIResult from "../../modal/modalAPIResult"
import Spinner from "../../../components/formLoading"
import Moment from 'moment';
import {setSessionUri} from "../../../codes/function"


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
  return (
    <div className="data-list-action">
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
      target="UncontrolledEdit"
      style={{
          backgroundColor: colorPrimary,
          color:"#000"
        }}
    >
      Edit!
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

class QuestionConfig extends Component {

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Question Name",
        selector: "Question",
        sortable: true,
        minWidth: "300px",
        cell: row => (
          <p title={row.Question} className="text-truncate text-bold-500 mb-0">
            {row.Question}
          </p>
        )
      },
      {
        name: "Forced",
        selector: "Forced",
        sortable: true,
        minWidth: "30px",
        cell: row => (
          <p title={row.Forced} className="text-truncate text-bold-500 mb-0 text-right">
            {row.Forced}
          </p>
        )
      },
      {
        name: "NumChoice",
        selector: "NumChoice",
        sortable: true,
        minWidth: "30px",
        cell: row => (
          <p title={row.NumChoice} className="text-truncate text-bold-500 mb-0 text-right">
            {row.NumChoice}
          </p>
        )
      },
      {
        name: "Modified Date",
        selector: "ModifiedDate",
        sortable: true,
        minWidth: "30px",
        cell: row => (
          <p title={row.DateModified} className="text-truncate text-bold-500 mb-0">
            {Moment(row.DateModified).format("MM-DD-YYYY HH:mm")}
          </p>
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
    loadingUpdate: false,
    timeAPI: "",

  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.questions.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {

      return {
        data: props.questions.data,
        allData: props.questions.filteredData,
        totalPages: props.questions.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.questions.totalRecords,
        sortIndex: props.questions.sortIndex,
        statusAPI: props.questions.statusAPI,
        showModalApi: props.questions.showModalApi,
        messageAPI: props.questions.messageAPI,
        timeAPI: props.questions.timeAPI,
        translations: props.questions.translations
      }
    }
    // Return null if the state hasn't changed
    return null
  }

  componentDidMount() {
    setSessionUri(window.location.pathname);
    this.initalData(1000);
  }
  initalData = async (page) => {
    this.setState({loading: true});
    await this.props.getInitialData(page);
    this.setState({loading: false});
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
  handleEdit = obj => {
    this.setState({currentData: obj})
    this.handleSidebar(true);
  }
  handlePagination = (page) => {
    this.props.getInitialData(1000);
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
      loadingUpdate,
      translations
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
          responsive
          pointerOnHover
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
        />
        <Sidebar
          handleSidebar={this.handleSidebar}
          editData={this.editData}
          show={sidebar}
          data={currentData}
          translations={translations}
          loadingUpdate={loadingUpdate}
        />
        <ModalAPIResult
          show={this.state.showModalApi}
          status={this.state.statusAPI}
          msg={this.state.messageAPI}
          time={this.state.timeAPI}
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
    questions: state.dataPOSQuestion
  }
}

export default connect(mapStateToProps, {
  getInitialData,
  filterData,
  updateData
})(QuestionConfig)
