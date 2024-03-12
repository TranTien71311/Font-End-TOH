import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListViewConfig from "./ProductConfig"
import queryString from "query-string"
import {getSession} from "../../../codes/function"

class Products extends React.Component {

  appendCrumbActive = () => {
    let reportCatStr = getSession("reportCat");
    if(reportCatStr !== "" && reportCatStr !== null){
      let reportCat = JSON.parse(reportCatStr);
      return reportCat.ReportName;
    }
    return "";
  }
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Products"
          breadCrumbParent="Alacarte Config"
          breadCrumbParent2="Setup Menu"
          linkCrumbParent2="/alacate-config/setup-report-category"
          breadCrumbActive={this.appendCrumbActive()}
        />
        <Row>
          <Col sm="12">
            <ListViewConfig
            parsedFilter={queryString.parse(this.props.location.search)}/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Products
