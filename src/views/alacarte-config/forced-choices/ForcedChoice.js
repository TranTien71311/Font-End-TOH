import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListViewConfig from "./ForcedChoiceConfig"
import queryString from "query-string"

class ForcedChoices extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Forced Choices"
          breadCrumbParent="Alacarte Config"
          breadCrumbActive="Setup Forced Choices"
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
export default ForcedChoices
