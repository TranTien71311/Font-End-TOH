import React from "react"
import Sidebar from "react-sidebar"
import MenuSidebar from "./Category"
import MenuContent from "./MenuContent"
import { connect } from "react-redux"
import {updateShowCart} from "../../../redux/actions/navbar/Index"
import {getInitialData,getProductByReportNo,postOrder,getAlacarte} from "../../../redux/actions/alacarte-order/menu"
import "../../../assets/scss/pages/app-ecommerce-shop.scss"
import Spinner from "../../../components/formLoading"
import ModalAPIResult from "../../modal/modalAPIResult"

const mql = window.matchMedia(`(min-width: 992px)`)
class MenuAlacarte extends React.Component {
  state = {
    sidebarDocked: mql.matches,
    sidebarOpen: false,
    patientSelected: {},
    sysInfo: {},
    dataCategories: [],
    dataProducts: [],
    dataQuestions: [],
    dataForcedChoices: [],
    dataProductInReport: [],
    showModalApi: false,
    loading: true,
    statusAPI: 0,
    messageAPI: "",
    loadingUpdate: false,
    timeAPI: "",
    loadingGetProduct: false,
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataOrders.patientSelected !== state.patientSelected
      || props.dataOrders.dataCategories !== state.dataCategories
      || props.dataOrders.dataProducts !== state.dataProducts
      || props.dataOrders.dataQuestions !== state.dataQuestions
      || props.dataOrders.dataForcedChoices !== state.dataForcedChoices
      || props.dataOrders.dataSysInfo !== state.sysInfo
      || props.dataOrders.dataProductInReport !== state.dataProductInReport
    ) {
      return {
        patientSelected: props.dataOrders.patientSelected,
        sysInfo: props.dataOrders.dataSysInfo,
        dataCategories: props.dataOrders.dataCategories,
        dataProducts: props.dataOrders.dataProducts,
        dataQuestions: props.dataOrders.dataQuestions,
        dataForcedChoices: props.dataOrders.dataForcedChoices,
        dataProductInReport: props.dataOrders.dataProductInReport
      }
    }
    return null
  }
  componentDidMount() {
    this.props.updateShowCart(true)
    mql.addListener(this.mediaQueryChanged)
    this.initalData()

  }
  initalData = async () => {
    this.setState({loading: true});
    await this.props.getInitialData();
    if(this.state.dataCategories.length !== 0){
      this.getProductByReportNo(this.state.dataCategories[0].ReportNo);
    }
    this.setState({loading: false});
  }
  getProductByReportNo = async (reportNo) => {
    this.setState({loadingGetProduct: true});
    await this.props.getProductByReportNo(reportNo)
    this.setState({loadingGetProduct: false});
  }
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
  }
  confirmOrder = async (data, patient) => {
    await this.props.postOrder(data,patient);
    await this.props.getAlacarte();
  }
  showModalAPI = (status, show, message, time) => {
    this.setState({statusAPI: status, showModalApi: show, messageAPI: message, timeAPI: time})
  }
  render() {
    let {
      patientSelected,
      dataCategories,
      dataProducts,
      loadingGetProduct,
      dataQuestions,
      dataForcedChoices,
      sysInfo,
      dataProductInReport,
      statusAPI
    } = this.state
    return (

      <React.Fragment>
        {
          this.state.loading === true ?
          (
            <Spinner />
          )
          :
          (
            <div className="ecommerce-application ">
              <div
                className={`shop-content-overlay ${
                  this.state.sidebarOpen ? "show" : ""
                }`}
                onClick={() => this.onSetSidebarOpen(false)}></div>
              <div className="sidebar-section ">
                <Sidebar
                  sidebar={
                  <MenuSidebar
                    dataCategories={dataCategories}
                    getProductByReportNo={this.getProductByReportNo}
                  />}
                  docked={this.state.sidebarDocked}
                  open={this.state.sidebarOpen}
                  sidebarClassName="sidebar-shop"
                  touch={true}
                  contentClassName="sidebar-children d-none">
                  ""
                </Sidebar>
              </div>
              <MenuContent
                mainSidebar={this.onSetSidebarOpen}
                sidebar={this.state.sidebarOpen}
                dataProducts={dataProducts}
                patientSelected={patientSelected}
                loadingGetProduct={loadingGetProduct}
                dataQuestions={dataQuestions}
                dataForcedChoices={dataForcedChoices}
                sysInfo={sysInfo}
                dataProductInReport={dataProductInReport}
                confirmOrder={this.confirmOrder}
                showModalAPI={this.showModalAPI}
              />
              <ModalAPIResult
                show={this.state.showModalApi}
                status={this.state.statusAPI}
                msg={this.state.messageAPI}
                time={this.state.timeAPI}
              />
            </div>
          )
        }

      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {

  return {
    dataOrders: state.dataOrder
  }
}
export default connect(mapStateToProps,{updateShowCart,getInitialData,getProductByReportNo,postOrder,getAlacarte})(MenuAlacarte)
