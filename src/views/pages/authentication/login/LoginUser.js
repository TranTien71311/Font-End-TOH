import React from "react"
import { CardBody, FormGroup, Form, Input, Button, Label, Spinner } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Lock, Check, User } from "react-feather"
import { connect } from "react-redux"
import {
  loginWithUsername,
  loginWithSession
} from "../../../../redux/actions/auth/loginActions"
import { history } from "../../../../history"

class LoginUser extends React.Component {
  state = {
    username: "",
    password: "",
    remember: false,
    loadingLogin: false,
  }
  checkSession = async () => {

    if(localStorage.getItem('loginSession') !== '' && localStorage.getItem('loginSession') !== null){
      await this.props.loginWithSession();
    }
  }
  componentDidMount(){
    this.checkSession();
  }
  handleLogin = async e => {
    e.preventDefault()
    if(!this.state.loadingLogin){
      this.handleLoadingLogin();
      await this.props.loginWithUsername(this.state);
      this.handleLoadingLogin();
      this.props.handleAuthLogin(this.props.values.loginStatus,this.props.values.loginMessage);
      if(this.props.values.loginStatus === 200){
        history.push("/");
      }
    }
  }
  handleLoadingLogin = () => {
    this.setState({loadingLogin: !this.state.loadingLogin});
  }
  handleRemember = e => {
    this.setState({
      remember: e.target.checked
    })
  }

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                required
              />
              <div className="form-control-position">
                <User size={15} />
              </div>
              <Label>Username</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
            </FormGroup>
            <div className="d-flex justify-content-end">
              <Button.Ripple color="primary" type="submit">
                {this.state.loadingLogin ? <Spinner className="mr-1" color="white" size="sm" type="grow" /> : ""}
                Login
              </Button.Ripple>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}

export default connect(mapStateToProps, {
  loginWithUsername,
  loginWithSession
})(LoginUser)
