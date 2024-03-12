import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListViewConfig from "./ReportCategoryConfig"
import queryString from "query-string"

class ReportCategories extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Categories"
          breadCrumbParent="Alacarte Config"
          breadCrumbActive="Setup Menu"
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
export default ReportCategories
