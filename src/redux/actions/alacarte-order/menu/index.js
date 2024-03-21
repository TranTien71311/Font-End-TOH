
import {fetchAPI, postAPI} from "../../../../Api/SiteApi/api"
import {pushAPIPOS} from "../../../../Api/POSApi/api"

export const getInitialData = () => {
  return async dispatch => {
    await Promise.all([
      fetchAPI("/api/POSReportCats?IsActive=true&IsPublic=true"),
      fetchAPI("/api/POSQuestions?IsActive=true"),
      fetchAPI("/api/POSForcedChoices?IsActive=true"),
      fetchAPI("/api/POSSysInfo"),
      fetchAPI("/api/POSProducts?IsActive=true&PageSize=10000&IsPublic=true")
    ]).then(
      response => {
        let i = 0;
        let types = ["APPEND_DATA_CATEGORY_ALACARTE","APPEND_DATA_QUESTION_ALACARTE","APPEND_DATA_FORCEDCHOICE_ALACARTE","APPEND_DATA_SYSINFO_ALACARTE","APPEND_DATA_PRODUCT_ALACARTE"]
        for (const result of response) {
          if(result.Status !== 200){
            dispatch({type: "SHOW_ERROR_API_ORDER_ALACARTE", status: result.Status, message: result.Message})
          }else{

            dispatch({ type: types[i], data: result })
          }
          i++;
        }
      }
    )
    .catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_ALACARTE", status: -1, message: error.message})
      }
    );
  }
}

export const getProductByReportNo = (reportNo) => {
  return async dispatch => {
    await dispatch({ type: "GET_PRODUCT_IN_REPORT_ALACARTE", ReportNo: reportNo })
  }
}
export const postOrder = (data, patient) => {

  let posHeader = {
    TABLENUM: 30001,
    SecNum: 0,
    NUMCUST: 1,
    NETTOTAL: 0,
    TAX1: 0,
    TAX2: 0,
    TAX3: 0,
    TAX4: 0,
    TAX5: 0,
    FINALTOTAL: 0,
    MemCode: 2245,
    WHOSTART: 999,
    StatNumStart: 1,
    ISDelivery: 0,
    RefId: '',
    LABEL: '',
    SALETYPEINDEX: 1002,
    TIMESTART: '2024/03/04'
  }

  let msg = {
    "Text": "Table: 30001 New Order ( patient: " + patient.PatientFullName +", W:" + patient.WardName + ", R: " + patient.RoomName + ", B: " + patient.BedName + " )",
    "RevCenter": 0,
  }
  let noteStr = patient.PatientFullName + ", W:" + patient.WardName + ", R: " + patient.RoomName + ", B: " + patient.BedName + "";
  let note = {
    UNIQUEID: data.length + 1,
    PRODNUM: 2004,
    PRODTYPE: 0,
    COSTEACH:0,
    OrigCostEach: 0,
    NetCostEach: 0,
    QUAN: 1,
    QuestionId: 1,
    MasterItem: 1,
    StoreNum: 0, //MasterIndex
    LineDes: noteStr,
    WHOORDER: 999,
    STATNUM: 1
  }
  data.push(note);
  let transaction = {
    UserOrder: 1,
    PatientID: patient.PatientID
  }
  let dataPost = {
    POSHeader: posHeader,
    POSDetails: data,
    Transaction: transaction
  }
  console.log(dataPost)
  return async dispatch => {
    let apiResult = 0;
    await postAPI('/api/OrderAlacarte', dataPost).then(
      response => {
        apiResult = response.Status;
        dispatch({type: "SHOW_ERROR_API_ORDER_ALACARTE", status: response.Status, message: "Order Successfully"})
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
    if(apiResult === 200){
      await pushAPIPOS('/api/MsgMgr',msg).then(
        response => {
          console.log(response);
        }
      ).catch(
        error => {
          console.log(error);
        }
      )
    }

  }
}
export const getAlacarte = () => {
  return async dispatch => {
    await fetchAPI("/api/TransactionAlacarte?OrderBy=DESC").then(
      response => {
        console.log(response);
        dispatch({ type: "APPEND_DATA_TRANSACTION_ALACARTE", data: response })
      }
    )
  }
}
