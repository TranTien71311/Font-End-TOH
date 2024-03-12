import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListViewConfig from "./SyncConfig"
import queryString from "query-string"

class SyncDatas extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Sync"
          breadCrumbParent="Alacarte Config"
          breadCrumbActive="Sync Data"
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
export default SyncDatas
