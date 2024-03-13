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
  Label,
  Spinner
} from "reactstrap"
import Select from "react-select"

class POSSettingConfig extends React.Component {
  state = {
    products: this.props.products,
    saleTypes: this.props.saleTypes,
    SaleType: this.props.dataPOSSetting.SaleType,
    saleTypeSelected: this.props.saleTypes.find(x=>x.value === this.props.dataPOSSetting.SaleType),
    productSelected: this.props.products.find(x=>x.value === this.props.dataPOSSetting.ProductComment),
    ProductComment: this.props.dataPOSSetting.ProductComment,
    StationNum: this.props.dataPOSSetting.StationNum,
    RevCenter: this.props.dataPOSSetting.RevCenter,
    TableNum: this.props.dataPOSSetting.TableNum,
    MemberCode: this.props.dataPOSSetting.MemberCode,
    dataPOSSetting: this.props.dataPOSSetting,
    SectionNum: this.props.dataPOSSetting.SectionNum,
    loadingUpdate: false
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
          saleTypeSelected: this.props.saleTypes[0]
        }
      );
    }
    if ((this.props.dataPOSSetting !== null && prevProps.dataPOSSetting === null)
    || ( this.props.dataPOSSetting !== prevState.dataPOSSetting)
    ) {
      this.setState(
        {
          dataPOSSetting: this.props.dataPOSSetting,
          SaleType: this.props.dataPOSSetting.SaleType,
          ProductComment: this.props.dataPOSSetting.ProductComment,
          StationNum: this.props.dataPOSSetting.StationNum,
          RevCenter: this.props.dataPOSSetting.RevCenter,
          TableNum: this.props.dataPOSSetting.TableNum,
          MemberCode: this.props.dataPOSSetting.MemberCode,
          saleTypeSelected: this.props.saleTypes.find(x=>x.value === this.props.dataPOSSetting.SaleType)
        }
      );
    }

  }
  handleSaveUpdata = async () => {
    this.setState({loadingUpdate: true});
    let obj = {
      SaleType: this.state.SaleType,
      ProductComment : this.state.ProductComment,
      StationNum: this.state.StationNum,
      RevCenter: this.state.RevCenter,
      TableNum: this.state.TableNum,
      MemberCode: this.state.MemberCode,
      SectionNum: this.state.SectionNum
    }
    await this.props.updatePOSSettings(obj);
    this.setState({loadingUpdate: false});
  }
  render() {
    let { products , saleTypes,saleTypeSelected,productSelected, StationNum,SectionNum, RevCenter, TableNum, MemberCode, loadingUpdate} = this.state
    return (
      <Card>
        <CardBody>
          <Form className="mt-2">
            <Row>
              <Col md="6" sm="12">
                <Label for="nameMulti">Station Num</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="number"
                    name="name"
                    id={StationNum}
                    placeholder="Station Num"
                    value={StationNum}
                    onChange={
                      (e)=>{
                        this.setState({StationNum: e.target.value})
                      }
                    }
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="lastNameMulti">Sale type</Label>
                <FormGroup className="form-label-group">
                  <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={saleTypeSelected}
                  name="color"
                  options={saleTypes}
                  onChange={
                    (selected) => {
                      this.setState({SaleType: selected.value})
                    }
                  }
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="cityMulti">Member default (code)</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="number"
                    name="city"
                    id={MemberCode}
                    placeholder="Member default (code)"
                    value={MemberCode}
                    onChange={(e)=>{
                      this.setState({MemberCode: e.target.value})
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="lastNameMulti">Product comment</Label>
                <FormGroup className="form-label-group">
                  <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={productSelected}
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
                <Label for="CompanyMulti">RevCenter</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="number"
                    name="company"
                    id="RevCenter"
                    placeholder="RevCenter"
                    value={RevCenter}
                    onChange={(e)=>{
                      this.setState({RevCenter: e.target.value})
                    }}
                  />

                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="CompanyMulti">Table Num</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="number"
                    name="company"
                    id="tableNum"
                    placeholder="Table Num"
                    value={TableNum}
                    onChange={(e)=>{
                      this.setState({TableNum: e.target.value})
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Label for="CompanyMulti">Section Num</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="number"
                    name="company"
                    id="sectionNum"
                    placeholder="Section Num"
                    value={SectionNum}
                    onChange={(e)=>{
                      this.setState({SectionNum: e.target.value})
                    }}
                  />

                </FormGroup>
              </Col>
              <Col md="6" sm="12">

              </Col>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    color="primary"
                    className="mr-1 mb-1"
                    onClick={() => {
                      if(!loadingUpdate){
                        this.handleSaveUpdata();
                      }
                    }}
                  >
                    {
                      loadingUpdate ?
                      (
                        <Spinner color="white" size="sm" type="grow" className="mr-1"/>
                      ): null
                    }
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
