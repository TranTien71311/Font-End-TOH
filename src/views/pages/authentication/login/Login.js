import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import loginImg from "../../../../assets/img/logo/logofv.png"
import "../../../../assets/scss/pages/authentication.scss"
import LoginEmployeeCode from "./LoginEmployeeCode"
import LoginUser from "./LoginUser"
import LoginEmail from "./LoginEmail"

class Login extends React.Component {
  state = {
    activeTab: "1",
    authTitle: "Welcome back, please login to your account.",
    authStatus: 200
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  handleAuthLogin = (status, title) => {
    this.setState({authTitle: title});
    this.setState({authStatus: status});
  }
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Login</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className={"px-2 auth-title " + (this.state.authStatus !== 200 ? "text-danger" : "")}>
                    {this.state.authTitle}
                  </p>
                  <Nav tabs className="px-2">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
                      >
                        Username
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2")
                        }}
                      >
                        Email
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "3"
                        })}
                        onClick={() => {
                          this.toggle("3")
                        }}
                      >
                        Employee Code
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <LoginUser
                        handleAuthLogin={this.handleAuthLogin}
                      />
                    </TabPane>
                    <TabPane tabId="2">
                      <LoginEmail
                        handleAuthLogin={this.handleAuthLogin}
                      />
                    </TabPane>
                    <TabPane tabId="3">
                      <LoginEmployeeCode
                        handleAuthLogin={this.handleAuthLogin}
                      />
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Login
