
import {fetchAPI, putAPI} from "../../../../Api/SiteApi/api"

const updateAction = (updateObj, stateData) => {
  let index = stateData.findIndex(x=>x.OptionIndex === updateObj.OptionIndex);
  if(index === -1){
    return stateData;
  }
  if(stateData[index].Tranlations !== updateObj.Translations){
    stateData[index]["Tranlations"] = updateObj.Translations;
  }
  return stateData;
}

export const getInitialData = (pageSize) => {
  return async dispatch => {
    await Promise.all([
      fetchAPI("/api/POSQuestions?PageSize="+ pageSize +"&PageNum=0"),
      fetchAPI("/api/Translations")
    ]).then(
      response => {
        let i = 0;
        for (const result of response) {
          if(result.Status !== 200){
            dispatch({type: "SHOW_ERROR_API_QUESTION", status: result.Status, message: result.Message})
          }else{
            if(i == 0){
              dispatch({ type: "APPEND_DATA_QUESTION", data: result })
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
        dispatch({type: "SHOW_ERROR_API_QUESTION", status: -1, message: error.message})
      }
    );
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_QUESTION", value })
}


export const updateData = (obj, dataState) => {
  if(obj.OptionIndex === null || obj.OptionIndex === ""){
    return dispatch => {
      dispatch({type: "SHOW_ERROR_API_QUESTION", status: -1, message: "OptionIndex can not be empty"})
    }
  }
  return async dispatch => {
    dispatch({ type: "PENDING_API_QUESTION"})
    await putAPI("/api/POSQuestions",[obj]).then(
      response => {
        if(response.Status === 200){
          let dataResult = updateAction(response.Data[0], dataState);
          dispatch({ type: "UPDATE_DATA_QUESTION", data: dataResult, status: response.Status, message: response.Message })
        }
        else{
          dispatch({type: "SHOW_ERROR_API_QUESTION", status: response.Status, message: response.Error[0].Message.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_QUESTION", status: -1, message: error.message})
      }
    )
  }
}
