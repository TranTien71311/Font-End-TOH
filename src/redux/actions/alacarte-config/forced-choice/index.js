
import {fetchAPI, putAPI} from "../../../../Api/SiteApi/api"

const updateAction = (updateObj, stateData) => {
  let index = stateData.findIndex(x=>x.UniqueID === updateObj.UniqueID);
  if(index === -1){
    return stateData;
  }
  if(stateData[index].Translations !== updateObj.Translations){
    stateData[index]["Translations"] = updateObj.Translations;
  }
  return stateData;
}

export const getInitialData = (pageSize) => {
  return async dispatch => {
    await Promise.all([
      fetchAPI("/api/POSForcedChoices?PageSize="+ pageSize +"&PageNum=0"),
      fetchAPI("/api/Translations")
    ]).then(
      response => {
        let i = 0;
        for (const result of response) {
          if(result.Status !== 200){
            dispatch({type: "SHOW_ERROR_API_FORCEDCHOICE", status: result.Status, message: result.Message})
          }else{
            if(i == 0){
              dispatch({ type: "APPEND_DATA_FORCEDCHOICE", data: result })
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
        dispatch({type: "SHOW_ERROR_API_FORCEDCHOICE", status: -1, message: error.message})
      }
    );
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_FORCEDCHOICE", value })
}


export const updateData = (obj, dataState) => {
  if(obj.UniqueID === null || obj.UniqueID === ""){
    return dispatch => {
      dispatch({type: "SHOW_ERROR_API_FORCEDCHOICE", status: -1, message: "UniqueID can not be empty"})
    }
  }
  return async dispatch => {
    dispatch({ type: "PENDING_API_FORCEDCHOICE"})
    await putAPI("/api/POSForcedChoices",[obj]).then(
      response => {
        if(response.Status === 200){
          let dataResult = updateAction(response.Data[0], dataState);
          dispatch({ type: "UPDATE_DATA_FORCEDCHOICE", data: dataResult, status: response.Status, message: response.Message })
        }
        else{
          dispatch({type: "SHOW_ERROR_API_FORCEDCHOICE", status: response.Status, message: response.Error[0].Message.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_FORCEDCHOICE", status: -1, message: error.message})
      }
    )
  }
}
