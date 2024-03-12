
import {fetchAPI} from "../../../Api/SiteApi/api"

export const getInitialData = () => {
  return async dispatch => {
    dispatch({type: "LOADING_DATA"})
    await fetchAPI("/api/SyncData?PageSize="+ pageSize +"&PageNum=0").then(
      response => {
        if(response.Status === 200){
          dispatch({ type: "APPEND_DATA", data: response })
        }
        else{
          dispatch({type: "SHOW_ERROR_API", status: response.Status, message: response.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API", status: -1, message: error.message})
      }
    )
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_DATA", value })
}

