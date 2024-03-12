import React from "react"
import { Card, CardBody, Button } from "reactstrap"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import "../../../assets/scss/plugins/extensions/slider.scss"
import "../../../assets/scss/pages/app-chat.scss"
import PerfectScrollbar from "react-perfect-scrollbar"
const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)


class Category extends React.Component {
  state = {
    categories: this.props.dataCategories,
    categorySelected: this.props.dataCategories[0].ReportNo
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.dataCategories !== null && prevProps.dataCategories === null)
    || (this.props.dataCategories !== null && prevState !== null && this.props.dataCategories !== prevState.categories)
    ) {
      let selected = ""
      if(this.props.dataCategories.length !== 0){
        selected = this.props.dataCategories[0].ReportNo
      }
      this.setState({ categories: this.props.dataCategories, categorySelected: selected });
      this.props.getProductByReportNo(this.props.dataCategories[0].ReportNo);
    }
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
                {category.ReportName}
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
