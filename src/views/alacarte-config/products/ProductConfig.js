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
  Edit3,
  Lock,
  Unlock,
  Check
} from "react-feather"
import { connect } from "react-redux"
import {
  getInitialData,
  filterData,
  updateData,
  publicData
} from "../../../redux/actions/alacarte-config/product"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Sidebar from "./ProductSidebar"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import {colorPrimary} from "../../../assets/color"
import ModalAPIResult from "../../modal/modalAPIResult"
import Spinner from "../../../components/formLoading"
import Moment from 'moment'
import {setSessionUri} from "../../../codes/function"
import ModalPublic from "../../modal/modalPublic"

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
    {
    props.row.IsPublic === true
    ?
    (<Unlock
      className="cursor-pointer text-success"
      size={20}
      onClick={() => {
        return props.currentData(props.row)
      }}
      id="UncontrolledPublic"
    />)
    :
    (<Lock
      className="cursor-pointer text-danger"
      size={20}
      onClick={() => {
        return props.currentData(props.row)
      }}
      id="UncontrolledPublic"
    />)
    }
    <Edit3
      className="cursor-pointer ml-2 text-primary"
      size={20}
      onClick={() => {
        props.editRow(props.row)
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
    <UncontrolledTooltip
      placement="top"
      target="UncontrolledPublic"
      style={{
          backgroundColor: colorPrimary,
          color:"#000"
        }}
    >
      Public!
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

class ProductsConfig extends Component {

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Image",
        selector: "Image",
        minWidth: "100px",
        cell: row => <img className="pt-1 pb-1 pl-1 pr-1" src={ (row.Image !== "" && row.Image !== null) ? ("https://localhost:44351" + row.Image) : require("../../../assets/img/elements/no-image.png")} height="100" alt={row.ProductName} />
      },
      {
        name: "Name",
        selector: "ProductName",
        sortable: true,
        minWidth: "300px",
        cell: row => (
          <p title={row.ReportName} className="text-truncate text-bold-500 mb-0">
            {row.ProductName}
          </p>
        )
      },
      {
        name: "Price A",
        selector: "PriceA",
        sortable: true,
        minWidth: "30px",
        cell: row => (
          <p title={row.PriceA} className="text-truncate text-bold-500 mb-0 text-right">
            {row.PriceA}
          </p>
        )
      },
      {
        name: "Index",
        selector: "Index",
        sortable: true,
        minWidth: "30px",
        cell: row => (
          <p title={row.Index} className="text-truncate text-bold-500 mb-0 text-right">
            {row.Index}
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
            currentData={this.handlePublic}
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
    showModalPublic: false,
    messagePublic: "",
    loadingPublic: false
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.product.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.product.data,
        allData: props.product.filteredData,
        totalPages: props.product.totalPages,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.product.totalRecords,
        sortIndex: props.product.sortIndex,
        statusAPI: props.product.statusAPI,
        showModalApi: props.product.showModalApi,
        messageAPI: props.product.messageAPI,
        timeAPI: props.product.timeAPI,
        translations: props.product.translations
      }
    }
    // Return null if the state hasn't changed
    return null
  }

  componentDidMount() {
    setSessionUri(window.location.pathname);
    this.initalData(100, this.state.currentPage);
  }
  initalData = async (page,num) => {
    this.setState({loading: true});
    await this.props.getInitialData(page, num);
    this.setState({loading: false});
    window.scrollTo(0, 0);
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
  handlePagination = (num) => {
    this.initalData(100, num);
  }
  toggleModalPublic = () => {
    this.setState({showModalPublic: !this.state.showModalPublic, loadingPublic: false})
  }
  editData = async (obj) => {
    this.setState({loadingUpdate: true});
    await this.props.updateData(obj, this.state.data);
    this.setState({loadingUpdate: false});
    if(this.state.statusAPI === 200){
      this.handleSidebar(false);
    }
  }
  handlePublic = obj => {
    let msg = "";
    if(this.state.selected.length === 0){
      msg = (obj.IsPublic ? "Un Public: " : " Public: ") + obj.ProductName;
    }else{
      msg = "";
      this.state.selected.forEach(element => {
        msg += (element.IsPublic ? "Un Public: " : " Public: ") + element.ProductName + ", ";
      });
    }

    this.setState({showModalPublic: true, messagePublic: msg, currentData: obj})
  }
  confirmPublic = async () => {
    this.setState({loadingPublic: true});
    let dataPublic = this.state.selected.length ? this.state.selected : [this.state.currentData];
    await this.props.publicData(dataPublic, this.state.data);
    this.setState({selected: [], currentData: []});
    this.toggleModalPublic();
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
                this.state.currentPage
              }
              onPageChange={page => {
                this.setState({currentPage: page.selected})
                this.handlePagination(page.selected)
                }}
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
          translations={translations}
          loadingUpdate={loadingUpdate}
        />
        <ModalAPIResult
          show={this.state.showModalApi}
          status={this.state.statusAPI}
          msg={this.state.messageAPI}
          time={this.state.timeAPI}
        />
        <ModalPublic
          show={this.state.showModalPublic}
          msg={this.state.messagePublic}
          toggleModal={this.toggleModalPublic}
          handelConfirm={this.confirmPublic}
          loading={this.state.loadingPublic}
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
    product: state.dataPOSProduct
  }
}

export default connect(mapStateToProps, {
  getInitialData,
  filterData,
  updateData,
  publicData
})(ProductsConfig)
