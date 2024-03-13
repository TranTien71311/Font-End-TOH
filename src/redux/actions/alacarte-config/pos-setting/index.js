
import {fetchAPI, putAPI} from "../../../../Api/SiteApi/api"


export const getInitialData = () => {
  return async dispatch => {
    await Promise.all([
      fetchAPI("/api/POSProducts"),
      fetchAPI("/api/POSSysInfo"),
      fetchAPI("/api/POSSaleTypes"),
      fetchAPI("/api/POSSettings")
    ]).then(
      response => {
        let i = 0;
        for (const result of response) {
          if(result.Status !== 200){
            dispatch({type: "SHOW_ERROR_API_POSSETTING", status: result.Status, message: result.Message})
          }else{
            let type = ["APPEND_DATA_PRODUCT_POSSETTING", "APPEND_DATA_SYSINFO", "APPEND_DATA_SALETYPE", "APPEND_DATA_POSSETTING"];
            dispatch({ type: type[i], data: result })
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

export const updateData = (obj) => {
  return async dispatch => {
    await putAPI("/api/POSSettings",obj).then(
      response => {
        if(response.Status === 200){
          dispatch({ type: "UPDATE_DATA_POSSETTING", data: response.Data, status: response.Status, message: "Update successfully!"});
        }
        else{
          dispatch({type: "SHOW_ERROR_API_POSSETTING", status: response.Status, message: response.Error[0].Message.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_POSSETTING", status: -1, message: error.message})
      }
    )
  }
}
