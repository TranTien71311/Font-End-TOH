
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

export const getInitialData = () => {
  return async dispatch => {
    await Promise.all([
      fetchAPI("/api/POSProducts"),
      fetchAPI("/api/POSSysInfo"),
      fetchAPI("/api/POSSaleTypes"),
    ]).then(
      response => {
        let i = 0;
        for (const result of response) {
          if(result.Status !== 200){
            dispatch({type: "SHOW_ERROR_API_POSSETTING", status: result.Status, message: result.Message})
          }else{
            if(i == 0){
              dispatch({ type: "APPEND_DATA_PRODUCT_POSSETTING", data: result })
            }else if(i == 1){
              dispatch({ type: "APPEND_DATA_SYSINFO", data: result })
            }else{
              dispatch({ type: "APPEND_DATA_SALETYPE", data: result })
            }
          }
          i++;
        }
      }
    )
    .catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_POSSETTING", status: -1, message: error.message})
      }
    );
  }
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
