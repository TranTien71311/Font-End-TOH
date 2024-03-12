
import {fetchAPI, putAPI} from "../../../../Api/SiteApi/api"
import { getSession } from "../../../../codes/function"

const updateAction = (element, stateData) => {
  let index = stateData.findIndex(x=>x.ProductNum === element.ProductNum);
  if(index === -1){
    return stateData;
  }
  if(stateData[index].Image !== element.Image){
    stateData[index]["Image"] = element.Image;
  }
  if(stateData[index].Tranlations !== element.Translations){
      stateData[index]["Tranlations"] = element.Translations;
  }
  if(stateData[index].TimeStartOrder !== element.TimeStartOrder){
    stateData[index]["TimeStartOrder"] = element.TimeStartOrder;
  }
  if(stateData[index].TimeEndOrder !== element.TimeEndOrder){
    stateData[index]["TimeEndOrder"] = element.TimeEndOrder;
  }
  if(stateData[index].Index !== element.Index){
    stateData[index]["Index"] = element.Index;
  }
  return stateData;
}

const updatePublic = (arr, stateData) => {
  arr.forEach(element => {
      let index = stateData.findIndex(x=>x.ProductNum === element.ProductNum);
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
  let reportCatStr = getSession("reportCat");
  let reportCat = JSON.parse(reportCatStr);
  if(reportCatStr !== "" && reportCatStr !== null){
    return async dispatch => {
      console.log('a');
      await Promise.all([
        fetchAPI("/api/POSProducts?PageSize="+ pageSize +"&PageNum=0&ReportNo="+ reportCat.ReportNo +""),
        fetchAPI("/api/Translations")
      ]).then(
        response => {
          let i = 0;
          for (const result of response) {
            if(result.Status !== 200){
              dispatch({type: "SHOW_ERROR_API_PRODUCT", status: result.Status, message: result.Message})
            }else{
              if(i === 0){
                dispatch({ type: "APPEND_DATA_PRODUCT", data: result })
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
          dispatch({type: "SHOW_ERROR_API_PRODUCT", status: -1, message: error.message})
        }
      );
    }
  }
  return async dispatch => {
    await dispatch({type: "SHOW_ERROR_API_PRODUCT", status: 0, message: "ReportCat be empty"})
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_PRODUCT", value })
}


export const updateData = (obj, dataState) => {
  if(obj.ProductNum === null || obj.ProductNum === ""){
    return dispatch => {
      dispatch({type: "SHOW_ERROR_API_PRODUCT", status: -1, message: "Product can not be empty"})
    }
  }
  console.log(obj);
  return async dispatch => {
    await putAPI("/api/POSProducts",[obj]).then(
      response => {
        if(response.Status === 200){
          let dataResult = updateAction(response.Data[0], dataState);
          dispatch({ type: "UPDATE_DATA_PRODUCT", data: dataResult, status: response.Status, message: response.Message })
        }
        else{
          dispatch({type: "SHOW_ERROR_API_PRODUCT", status: response.Status, message: response.Error[0].Message.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_PRODUCT", status: -1, message: error.message})
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
      ProductNum: el.ProductNum
    });
  })
  return async dispatch => {
    await putAPI("/api/POSProducts",dataPublic).then(
      response => {
        if(response.Status === 200){
          let dataResult = updatePublic(dataPublic, dataState);
          dispatch({ type: "UPDATE_DATA_PRODUCT", data: dataResult, status: response.Status, message: response.Message })
        }
        else{
          dispatch({type: "SHOW_ERROR_API_PRODUCT", status: response.Status, message: response.Error[0].Message.Message})
        }
      }
    ).catch(
      error => {
        dispatch({type: "SHOW_ERROR_API_PRODUCT", status: -1, message: error.message})
      }
    )
  }
}

