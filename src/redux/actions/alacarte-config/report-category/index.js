
import {fetchAPI, putAPI} from "../../../../Api/SiteApi/api"
import {history} from "../../../../history"
import {setSession} from "../../../../codes/function"

const updateAction = (element, stateData) => {
  let index = stateData.findIndex(x=>x.ReportNo === element.ReportNo);
  if(index === -1){
    return stateData;
  }
  if(stateData[index].Image !== element.Image){
    stateData[index]["Image"] = element.Image;
  }
  if(stateData[index].Translations !== element.Translations){
    stateData[index]["Translations"] = element.Translations;
  }
  if(stateData[index].Index !== element.Index){
    stateData[index]["Index"] = element.Index;
  }
  return stateData;
}

const updatePublic = (arr, stateData) => {
  arr.forEach(element => {
      let index = stateData.findIndex(x=>x.ReportNo === element.ReportNo);
      if(index === -1){
        return stateData;
      }
      if(stateData[index].IsPublic !== element.IsPublic){
        stateData[index]["IsPublic"] = element.IsPublic;
      }
    });

  return stateData;
}

export const getInitialData = (pageSize) => {
  return async dispatch => {
    await Promise.all([
      fetchAPI("/api/POSReportCats?PageSize="+ pageSize +"&PageNum=0"),
      fetchAPI("/api/Translations")
    ]).then(
      response => {
        let i = 0;
        for (const result of response) {
          if(result.Status !== 200){
            dispatch({type: "SHOW_ERROR_API_REPORTCAT", status: result.Status, message: result.Message})
          }else{
            if(i === 0){
              dispatch({ type: "APPEND_DATA_REPORTCAT", data: result })
            }else{
              dispatch({ type: "APPEND_DATA_TRANSLATION", data: result })
            }
          }
          i++;
        }
      }
    )
    .catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_REPORTCAT", status: -1, message: error.message})
      }
    );
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_REPORTCAT", value })
}


export const updateData = (obj, dataState) => {
  if(obj.ReportNo === null || obj.ReportNo === ""){
    return dispatch => {
      dispatch({type: "SHOW_ERROR_API_REPORTCAT", status: -1, message: "ReportNo can not be empty"})
    }
  }
  return async dispatch => {
    await putAPI("/api/POSReportCats",[obj]).then(
      response => {
        if(response.Status === 200){
          let dataResult = updateAction(response.Data[0], dataState);
          dispatch({ type: "UPDATE_DATA_REPORTCAT", data: dataResult, status: response.Status, message: response.Message })
        }
        else{
          dispatch({type: "SHOW_ERROR_API_REPORTCAT", status: response.Status, message: response.Error[0].Message.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_REPORTCAT", status: -1, message: error.message})
      }
    )
  }
}

export const publicData = (arrPublic, dataState) => {
  let dataPublic = [];
  arrPublic.forEach((el) => {
    el["IsPublic"] = !el.IsPublic;
    dataPublic.push({
      IsPublic: el.IsPublic,
      ReportNo: el.ReportNo
    });
  })
  return async dispatch => {
    await putAPI("/api/POSReportCats",dataPublic).then(
      response => {
        if(response.Status === 200){
          let dataResult = updatePublic(dataPublic, dataState);
          dispatch({ type: "UPDATE_DATA_REPORTCAT", data: dataResult, status: response.Status, message: response.Message })
        }
        else{
          dispatch({type: "SHOW_ERROR_API_REPORTCAT", status: response.Status, message: response.Error[0].Message.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_REPORTCAT", status: -1, message: error.message})
      }
    )
  }
}

export const updateCurrentReport = (obj) => {
  return async dispatch => {
    await dispatch({ type: "UPDATE_CURRENT_REPORTCAT", dataSelected: obj });
    setSession("reportCat",JSON.stringify(obj));
    history.push("/alacate-config/setup-product");
  }
}
