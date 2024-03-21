import React from "react"
import { Card, CardBody } from "reactstrap"
import "rc-slider/assets/index.css"
import "../../../assets/scss/plugins/extensions/slider.scss"
import "../../../assets/scss/pages/app-chat.scss"
import PerfectScrollbar from "react-perfect-scrollbar"


class Category extends React.Component {
  state = {
    categories: this.props.dataCategories,
    categorySelected: this.props.dataCategories[0].ReportNo,
    langue: this.props.langue
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.dataCategories !== null && prevProps.dataCategories === null)
    || (this.props.dataCategories !== null && prevState !== null && this.props.dataCategories !== prevState.categories)
    || (this.props.langue !== null && prevState !== null && this.props.langue !== prevState.langue)
    ) {
      let selected = ""
      if(this.props.dataCategories.length !== 0){
        selected = this.props.dataCategories[0].ReportNo
      }
      this.setState({ categories: this.props.dataCategories, categorySelected: selected, langue:  this.props.langue});
      this.props.getProductByReportNo(this.props.dataCategories[0].ReportNo);
    }
  }
  formatLangueCategoryName = (category) => {
    if(category.Translations.length === 0){
      return category.ReportName
    }
    let filter = category.Translations.find(x=>x.TranslationID === this.state.langue.TranslationID);
    if(typeof filter === 'undefined'){
      return category.ReportName
    }
    return filter.TranslationText
  }
  render() {
    let {categories,categorySelected} = this.state
    let renderCategories =
      categories.map((category, i) => {
        return (
          <li
          className="pt-1"
          key={i}
          onClick={()=>{
            this.setState({ categorySelected: category.ReportNo });
            this.props.getProductByReportNo(category.ReportNo);
          }}
          >
            <div className="pr-1" style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
              <span className="avatar avatar-md m-0">
                <img
                  src={category.Image}
                  alt=""
                  height="38"
                  width="38"
                />
              </span>
              <span
              className={"text-bold-600 mb-0 ml-1 " + (categorySelected === category.ReportNo ? "text-primary" : "")}
              >
                {this.formatLangueCategoryName(category)}
              </span>
            </div>
          </li>
        )
      })
    return (
      <React.Fragment>
        <h6 className="filter-heading d-none d-lg-block">Categories</h6>
        <PerfectScrollbar
                className="todo-task-list"
                options={{
                  wheelPropagation: false
                }}
              >
        <Card>
          <CardBody className="p-2">
            <div className="multi-range-price">
              <ul className="list-unstyled price-range">
                {renderCategories}
              </ul>
            </div>
            <hr />
          </CardBody>
        </Card>
        </PerfectScrollbar>
      </React.Fragment>
    )
  }
}
export default Category
