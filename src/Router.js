import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
//import { Redirect } from "react-router-dom"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"
//mr.Tien
const syncData = lazy(() => import("./views/alacarte-config/sync/Sync"))
const comingSoon = lazy(() => import("./views/pages/misc/ComingSoon"))
const login = lazy(() => import("./views/pages/authentication/login/Login"))
const error404 = lazy(() => import("./views/pages/misc/error/404"))
const error500 = lazy(() => import("./views/pages/misc/error/500"))
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"))
const maintenance = lazy(() => import("./views/pages/misc/Maintenance"))
const setupQuestion = lazy(() => import("./views/alacarte-config/questions/Question"))
const setupForceChoice = lazy(() => import("./views/alacarte-config/forced-choices/ForcedChoice"))
const setupReportCategory = lazy(() => import("./views/alacarte-config/report-categories/ReportCategory"))
const setupProductAlacart = lazy(() => import("./views/alacarte-config/products/Product"))
const posSetting = lazy(() => import("./views/alacarte-config/pos-settings/POSSetting"))
const menuAlacarte = lazy(() => import("./views/orders/order-alacarte/Menu"))
const listPatientAlacarte = lazy(() => import("./views/orders/order-alacarte/patients/Config"))
// Route-based code splitting
const analyticsDashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
)
const ecommerceDashboard = lazy(() =>
  import("./views/dashboard/ecommerce/EcommerceDashboard")
)

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
        <AppRoute exact path="/" component={analyticsDashboard} />
          <AppRoute
            path="/ecommerce-dashboard"
            component={ecommerceDashboard}
          />
          <AppRoute path="/alacate-config/sync-data" component={syncData} />
          <AppRoute path="/alacate-config/setup-question" component={setupQuestion} />
          <AppRoute path="/alacate-config/setup-forced-choice" component={setupForceChoice} />
          <AppRoute path="/alacate-config/setup-report-category" component={setupReportCategory} />
          <AppRoute path="/alacate-config/setup-product" component={setupProductAlacart} />
          <AppRoute path="/alacate-config/pos-setting" component={posSetting} />
          <AppRoute path="/orders/menu-alacarte" component={menuAlacarte} />
          <AppRoute path="/orders/patient-list-alacarte" component={listPatientAlacarte} />
          <AppRoute
            path="/misc/coming-soon"
            component={comingSoon}
            fullLayout
          />
          <AppRoute path="/misc/error/404" component={error404} fullLayout />
          <AppRoute path="/pages/login" component={login} fullLayout />
          <AppRoute path="/misc/error/500" component={error500} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute
            path="/misc/maintenance"
            component={maintenance}
            fullLayout
          />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
