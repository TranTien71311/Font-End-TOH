import React from "react"
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label
} from "reactstrap"
import Select from "react-select"

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" }
]

class POSSettingConfig extends React.Component {
  state = {
    products: this.props.products,
    saleTypes: this.props.saleTypes,
    SaleType: 1,
    ProductComment: 1,
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.products !== null && prevProps.products === null)
    || ( this.props.products !== prevState.products)
    ) {
      this.setState(
        {
          products: this.props.products,
        }
      );
    }
    if ((this.props.saleTypes !== null && prevProps.saleTypes === null)
    || ( this.props.saleTypes !== prevState.saleTypes)
    ) {
      this.setState(
        {
          saleTypes: this.props.saleTypes,
        }
      );
    }
  }
  render() {
    let { products , saleTypes} = this.state
    return (
      <Card>
        <CardBody>
          <Form className="mt-2">
            <Row>
              <Col md="6" sm="12">
                <Label for="nameMulti">Station Num</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="name"
                    id="nameMulti"
                    placeholder="Station Num"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="lastNameMulti">Sale type</Label>
                <FormGroup className="form-label-group">
                  <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={saleTypes[0]}
                  name="color"
                  options={saleTypes}
                  onChange={
                    (selected) => {
                      this.setState({SaleType: selected.value});
                    }
                  }
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="cityMulti">Who start</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="city"
                    id="whoStart"
                    placeholder="Who start"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="lastNameMulti">Order type</Label>
                <FormGroup className="form-label-group">
                  <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  name="color"
                  options={colourOptions}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="CompanyMulti">RevCenter</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="company"
                    id="RevCenter"
                    placeholder="RevCenter"
                  />

                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="lastNameMulti">Product comment</Label>
                <FormGroup className="form-label-group">
                  <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={products[0]}
                  name="color"
                  options={products}
                  onChange={
                    (selected) => {
                      this.setState({ProductComment: selected.value});
                    }
                  }
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="CompanyMulti">Section Num</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="company"
                    id="sectionNum"
                    placeholder="Section Num"
                  />

                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="CompanyMulti">Table Num</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="company"
                    id="tableNum"
                    placeholder="Table Num"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={e => e.preventDefault()}
                  >
                    Save
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    )
  }
}
export default POSSettingConfig
