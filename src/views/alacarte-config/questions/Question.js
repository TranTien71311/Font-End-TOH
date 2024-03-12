import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListViewConfig from "./QuestionConfig"
import queryString from "query-string"

class Questions extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Questions"
          breadCrumbParent="Alacarte Config"
          breadCrumbActive="Setup Questions"
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
export default Questions
