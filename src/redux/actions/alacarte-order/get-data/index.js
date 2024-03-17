
import {fetchAPI, putAPI} from "../../../../Api/SiteApi/api"

export const getInitialData = () => {
  return async dispatch => {
    await Promise.all([
      fetchAPI("/api/Wards?IsActive=true"),
      fetchAPI("/api/Rooms?IsActive=true")
    ]).then(
      response => {

        let i = 0;
        let types = ["APPEND_DATA_WARD_ALACARTE", "APPEND_DATA_ROOM_ALACARTE"]
        for (const result of response) {
          if(result.Status !== 200){
            dispatch({type: "SHOW_ERROR_API_ALACARTE", status: result.Status, message: result.Message})
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

export const setPatientSelected = obj => {
  return dispatch => dispatch({ type: "SET_PATIENT_SELECTED", obj })
}

export const updateShipTransaction = (obj) => {
  return async dispatch => {
    await putAPI("/api/TransactionAlacarte", obj).then(
      reponse => {
        dispatch({type:"UPDATE_DATA_TRANSACTION_ALACARTE",data: obj})
        //dispatch({type: "SHOW_ERROR_API_ALACARTE", status: reponse.Status, message: "Update status successfully!"})
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_ALACARTE", status: -1, message: error.message})
      }
    )
  }
}

export const getTransactionDetail = (transCode) => {
  return async dispatch => {
    await fetchAPI("/api/TransactionDetailAlacarte?TransactionCode="+ transCode +"").then(
      result => {
        dispatch({type:"UPDATE_TRANSACTION_DETAIL_ALACARTE",data: result})
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }
}

export const getPatientByRoom = (roomID) => {
  return async dispatch => {
    await fetchAPI("/api/PatientDemographics?RoomID="+roomID+"").then(
      result => {
        dispatch({type:"APPEND_DATA_PATIENT_ALACARTE", data: result})
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }
}

export const setRoomSelected = obj => {
  return dispatch => dispatch({ type: "UPDATE_ROOM_SELECTED", obj })
}

export const setWardSelected = obj => {
  return dispatch => dispatch({ type: "UPDATE_WARD_SELECTED", obj })
}
