import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ViewConfig from "./POSSettingConfig"
import SysInfo from "./SysInfo"
import queryString from "query-string"
import "react-toggle/style.css"
import "../../../assets/scss/plugins/forms/switch/react-toggle.scss"
import { connect } from "react-redux"
import {
  getInitialData,
  updateData
} from "../../../redux/actions/alacarte-config/pos-setting"
import {setSessionUri} from "../../../codes/function"
import Spinner from "../../../components/formLoading"
import ModalAPIResult from "../../modal/modalAPIResult"

class POSSettings extends React.Component {
  state = {
    dataSysInfo: [],
    dataPOSSetting: [],
    dataProduct: [],
    dataSaleType: [],
    showModalApi: false,
    statusAPI: 0,
    messageAPI: "",
    timeAPI: "",
    loading: false
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.possetting.dataSysInfo !== state.dataSysInfo ||
      props.possetting.dataPOSSetting !== state.dataPOSSetting ||
      props.possetting.dataProduct.length !== state.dataProduct.length ||
      props.possetting.dataSaleType.length !== state.dataSaleType.length
    ) {
      return {
        dataSysInfo: props.possetting.dataSysInfo,
        dataPOSSetting: props.possetting.dataPOSSetting,
        dataProduct: props.possetting.dataProduct,
        dataSaleType: props.possetting.dataSaleType,
        showModalApi: props.possetting.showModalApi,
        statusAPI: props.possetting.statusAPI,
        messageAPI: props.possetting.messageAPI,
        timeAPI: props.possetting.timeAPI
      }
    }
    // Return null if the state hasn't changed
    return null
  }
  componentDidMount() {
    setSessionUri(window.location.pathname);
    this.initalData();
  }
  initalData = async () => {
    this.setState({loading: true});
    await this.props.getInitialData();
    this.setState({loading: false});
  }
  updatePOSSettings = async (obj) => {
    await this.props.updateData(obj);
  }
  render() {
    let {
      dataSysInfo,
      dataPOSSetting,
      dataProduct,
      dataSaleType,
      showModalApi,
      statusAPI,
      messageAPI,
      timeAPI,
      loading
    } = this.state
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="POS Settings"
          breadCrumbParent="Alacarte Config"
          breadCrumbActive="Setting"
        />
        <Row>
          <Col sm="12">
          {
            loading === true ?
          (
            <Spinner />
          )
          :
          (
            <>
            <ViewConfig
              parsedFilter={queryString.parse(this.props.location.search)}
              products={dataProduct}
              saleTypes={dataSaleType}
              dataPOSSetting={dataPOSSetting}
              updatePOSSettings={this.updatePOSSettings}
            />
            <SysInfo
              dataSysInfo={dataSysInfo}
            />
            <ModalAPIResult
              show={showModalApi}
              status={statusAPI}
              msg={messageAPI}
              time={timeAPI}
            />
            </>
          )
          }
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    possetting: state.dataPOSSetting
  }
}

export default connect(mapStateToProps, {
  getInitialData,
  updateData
})(POSSettings)
