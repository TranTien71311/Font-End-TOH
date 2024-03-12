
import {fetchAPI, putAPI, postAPI} from "../../../Api/SiteApi/api"
import {fetchAPIPOS} from "../../../Api/POSApi/api"

const updateAction = (updateObj, stateData) => {
  let index = stateData.findIndex(x=>x.SyncID === updateObj.SyncID);
  if(index === -1){
    return stateData;
  }
  if(stateData[index].SyncName !== updateObj.SyncName){
    stateData[index]["SyncName"] = updateObj.SyncName;
  }
  if(stateData[index].SyncValue !== updateObj.SyncValue){
    stateData[index]["SyncValue"] = updateObj.SyncValue;
  }
  if(stateData[index].APIGetLink !== updateObj.APIGetLink){
    stateData[index]["APIGetLink"] = updateObj.APIGetLink;
  }
  if(stateData[index].APIPostLink !== updateObj.APIPostLink){
    stateData[index]["APIPostLink"] = updateObj.APIPostLink;
  }
  // if(stateData[index].Progress !== updateObj.Progress){
  //   stateData[index]["Progress"] = updateObj.Progress;
  // }
  // if(stateData[index].Status !== updateObj.Status){
  //   stateData[index]["Status"] = updateObj.Status;
  // }
  return stateData;
}
const updateAllStatusSync = (dataSync, stateData, status, progress) => {
  dataSync.forEach(element => {
    let index = stateData.findIndex(x=>x.SyncID === element.SyncID);
    stateData[index]["Progress"] = progress;
    stateData[index]["Status"] = status;
  });
  return stateData;
}

export const getInitialData = (pageSize) => {
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

export const getData = params => {
  return async dispatch => {
      dispatch({
        type: "GET_DATA",
        params
      })
  }
}

export const updateData = (obj, dataState) => {
  if(obj.SyncID === null || obj.SyncID === ""){
    return dispatch => {
      dispatch({type: "SHOW_ERROR_API", status: -1, message: "SyncID can not be empty"})
    }
  }
  return async dispatch => {
    dispatch({ type: "PENDING_API"})
    await putAPI("/api/SyncData",obj).then(
      response => {
        if(response.Status === 200){
          let dataResult = updateAction(response.Data, dataState);
          dispatch({ type: "UPDATE_DATA", data: dataResult, status: response.Status, message: response.Message })
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
export const startSync = (listSync, dataState) => {
  return async dispatch => {
    dispatch({ type: "PENDING_API"});
    let dataSync = updateAllStatusSync(listSync,dataState,1,10);
    dispatch({ type: "UPDATE_STATUS_SYNC", data: dataSync});
    let dataPost = [];
    //GET
    let requestGets = listSync.map(x => fetchAPIPOS(x.APIGetLink));
    await Promise.all(requestGets).then(
      response => {
        let i = 0;
        for (const result of response) {
          if(result.Status !== 200){
            let dataError = updateAllStatusSync([listSync[i]],dataState,4,result.Message);
            dispatch({ type: "UPDATE_STATUS_SYNC", data: dataError});
          }else{
            let dataUp = updateAllStatusSync([listSync[i]],dataState,2,50);
            dispatch({ type: "UPDATE_STATUS_SYNC", data: dataUp});
            let dataPostDetail = [];
            let syncValueStr = listSync[i].SyncValue;
            console.log(listSync[i].SyncValue);
            let syncValue = JSON.parse(syncValueStr);
            let arrValue = Object.entries(syncValue);
            result.Data.forEach(el => {
              let detail = {};
              arrValue.forEach(v=>{
                detail[v[0]] = el[v[1]]
              })
              dataPostDetail.push(detail);
            });
            let dataResult = {
              "APIPostLink": listSync[i].APIPostLink,
              "SyncID": listSync[i].SyncID,
              "data": dataPostDetail
            }

            dataPost.push(dataResult);
          }
          i++;
        }
      }
    )
    .catch(
      error => {
        let dataError = updateAllStatusSync(listSync,dataState,4,error.message);
        dispatch({ type: "UPDATE_STATUS_SYNC", data: dataError});
      }
    );
    // //POST
    let requestPosts = dataPost.map(x => postAPI(x.APIPostLink,x.data));
    await Promise.all(requestPosts).then(
      response => {
        let i = 0;
        for (const result of response) {
          if(result.Status !== 200){
            let error = "row: " + result.Error[0].row + ", Status:" + result.Error[0].Message.Status + ", Message:" + result.Error[0].Message.Message;
            let dataError = updateAllStatusSync([dataPost[i]],dataState,4,error);
            dispatch({ type: "UPDATE_STATUS_SYNC", data: dataError});
          }else{
            let dataUp = updateAllStatusSync([dataPost[i]],dataState,3,100);
            dispatch({ type: "UPDATE_STATUS_SYNC", data: dataUp});
          }
          i++;
        }
      }
    )
    .catch(
      error => {
        let dataError = updateAllStatusSync(listSync,dataState,4,error.message);
        dispatch({ type: "UPDATE_STATUS_SYNC", data: dataError});
      }
    );
  }
}
