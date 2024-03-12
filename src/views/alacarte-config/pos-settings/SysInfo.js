import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Toggle from "react-toggle"

class SysInfo extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Info</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-inline-block">
            <label className="react-toggle-wrapper">
              <Toggle defaultChecked={true} disabled={true} />
              <span className="label-text">Diabled, Checked</span>
            </label>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default SysInfo
