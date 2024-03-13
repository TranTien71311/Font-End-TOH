import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Toggle from "react-toggle"

class SysInfo extends React.Component {
  state = {
    TaxDes1: this.props.dataSysInfo.TaxDes1,
    TaxDes2: this.props.dataSysInfo.TaxDes2,
    TaxDes3: this.props.dataSysInfo.TaxDes3,
    TaxDes4: this.props.dataSysInfo.TaxDes4,
    TaxDes5: this.props.dataSysInfo.TaxDes5,
    TaxRate1: this.props.dataSysInfo.TaxRate1,
    TaxRate2: this.props.dataSysInfo.TaxRate2,
    TaxRate3: this.props.dataSysInfo.TaxRate3,
    TaxRate4: this.props.dataSysInfo.TaxRate4,
    TaxRate5: this.props.dataSysInfo.TaxRate5,
    UseVAT: this.props.dataSysInfo.UseVAT,
    dataSysInfo: this.props.dataSysInfo
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.products !== null && prevProps.products === null)
    || ( this.props.dataSysInfo !== prevState.dataSysInfo)
    ) {
      this.setState(
        {
          TaxDes1: this.props.dataSysInfo.TaxDes1,
          TaxDes2: this.props.dataSysInfo.TaxDes2,
          TaxDes3: this.props.dataSysInfo.TaxDes3,
          TaxDes4: this.props.dataSysInfo.TaxDes4,
          TaxDes5: this.props.dataSysInfo.TaxDes5,
          TaxRate1: this.props.dataSysInfo.TaxRate1,
          TaxRate2: this.props.dataSysInfo.TaxRate2,
          TaxRate3: this.props.dataSysInfo.TaxRate3,
          TaxRate4: this.props.dataSysInfo.TaxRate4,
          TaxRate5: this.props.dataSysInfo.TaxRate5,
          UseVAT: this.props.dataSysInfo.UseVAT,
          dataSysInfo: this.props.dataSysInfo
        }
      );
    }
  }
  render() {
    let {TaxDes1,TaxDes2,TaxDes3,TaxDes4,TaxDes5,TaxRate1,TaxRate2,TaxRate3,TaxRate4,TaxRate5} = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Info</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-inline-block">
            <label className="react-toggle-wrapper">
              <Toggle defaultChecked={true} disabled={true} />
              <span className="label-text">{TaxDes1}, Rate: {TaxRate1}</span>
            </label>
          </div>
          <div className="d-inline-block">
            <label className="react-toggle-wrapper">
              <Toggle defaultChecked={true} disabled={true} />
              <span className="label-text">{TaxDes2}, Rate: {TaxRate2}</span>
            </label>
          </div>
          <div className="d-inline-block">
            <label className="react-toggle-wrapper">
              <Toggle defaultChecked={true} disabled={true} />
              <span className="label-text">{TaxDes3}, Rate: {TaxRate3}</span>
            </label>
          </div>
          <div className="d-inline-block">
            <label className="react-toggle-wrapper">
              <Toggle defaultChecked={true} disabled={true} />
              <span className="label-text">{TaxDes4}, Rate: {TaxRate4}</span>
            </label>
          </div>
          <div className="d-inline-block">
            <label className="react-toggle-wrapper">
              <Toggle defaultChecked={true} disabled={true} />
              <span className="label-text">{TaxDes5}, Rate: {TaxRate5}</span>
            </label>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default SysInfo
