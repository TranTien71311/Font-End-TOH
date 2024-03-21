import { combineReducers } from "redux"
import calenderReducer from "./calendar/"
import emailReducer from "./email/"
import chatReducer from "./chat/"
import todoReducer from "./todo/"
import customizer from "./customizer/"
import auth from "./auth/"
import navbar from "./navbar/Index"
import dataSync from "./sync-data/"
import dataPOSQuestion from "./alacarte-config/question/"
import dataPOSForcedChoice from "./alacarte-config/forced-choice/"
import dataPOSReportCat from "./alacarte-config/report-category/"
import dataPOSProduct from "./alacarte-config/product/"
import dataPOSSetting from "./alacarte-config/pos-setting/"
import dataWard from "./app-data/ward"
import dataOrder from "./alacarte-order"
import dataTranslation from "./app-data/translation"

const rootReducer = combineReducers({
  calendar: calenderReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataSync: dataSync,
  dataPOSQuestion: dataPOSQuestion,
  dataPOSForcedChoice: dataPOSForcedChoice,
  dataPOSReportCat: dataPOSReportCat,
  dataPOSProduct: dataPOSProduct,
  dataPOSSetting: dataPOSSetting,
  dataWard: dataWard,
  dataOrder: dataOrder,
  dataTranslation: dataTranslation
})

export default rootReducer
