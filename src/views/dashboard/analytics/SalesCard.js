import React from "react"
import { Card, CardBody } from "reactstrap"

class SalesCard extends React.Component {
  render() {
    return (
      <Card className="bg-analytics text-white sales-card">
        <CardBody className="text-center">
          <img src="https://www.fvhospital.com/wp-content/uploads/2024/03/ownership-leadership-banner.jpg" alt="card-img-left" className="img-left" />
        </CardBody>
      </Card>
    )
  }
}
export default SalesCard
