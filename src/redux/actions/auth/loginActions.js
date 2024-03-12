import {postAPI} from "../../../Api/SiteApi/api"
import { history } from "../../../history"
import { getSession } from "../../../codes/function"

const setLocalSession = (data) => {
  console.log("a");
    let str = JSON.stringify(data);
    localStorage.setItem("loginSession", str);
}

export const loginWithSession = () => {
  let loginSessionStr = localStorage.getItem("loginSession");
  let dataPost = JSON.parse(loginSessionStr);
  return async dispatch => {
    await postAPI("/api/login", dataPost).then(
      response => {
        if(dataPost.TypeLogin === 0){
          dispatch({type:"LOGIN_WITH_USERNAME", status: response.Status, message: response.Message, payload: response.Data});
        }
        else if(dataPost.TypeLogin === 1){
          dispatch({type:"LOGIN_WITH_EMAIL", status: response.Status, message: response.Message, payload: response.Data});
        }
        else if(dataPost.TypeLogin === 2){
          dispatch({type:"LOGIN_WITH_EMPLOYEE_CODE", status: response.Status, message: response.Message, payload: response.Data});
        }
       if(response.Status === 200){
        dispatch({type:"CHANGE_ROLE", userRole: response.Data.Permission});
        if(getSession("uriSession") !== null && getSession("uriSession") !== "")
        {
          let uri = getSession("uriSession");
          history.push(uri);
        }else{
          history.push('/');
        }

       }
      }
    ).catch(
      error => {
        dispatch({type:"LOGIN_WITH_USERNAME", status: 0, message: error.message, payload: []});
      }
    )
  }
}

export const loginWithUsername = (data) => {
  let dataPost = {
    UserName: data.username,
    Password: data.password,
    TypeLogin: 0
  }
  return async dispatch => {
    await postAPI("/api/login", dataPost).then(
      response => {
        dispatch({type:"LOGIN_WITH_USERNAME", status: response.Status, message: response.Message, payload: response.Data});
       if(response.Status === 200){
        dispatch({type:"CHANGE_ROLE", userRole: response.Data.Permission});
        if(data.remember){
          setLocalSession(dataPost);
        }
       }
      }
    ).catch(
      error => {
        dispatch({type:"LOGIN_WITH_USERNAME", status: 0, message: error.message, payload: []});
      }
    )
  }
}

export const loginWithEmail = (data) => {
  let dataPost = {
    Email: data.email,
    Password: data.password,
    TypeLogin: 1
  }
  return async dispatch => {
    await postAPI("/api/login", dataPost).then(
      response => {
        dispatch({type:"LOGIN_WITH_EMAIL", status: response.Status, message: response.Message, payload: response.Data});
       if(response.Status === 200){
        dispatch({type:"CHANGE_ROLE", userRole: response.Data.Permission});
        if(data.remember){
          setLocalSession(dataPost);
        }
       }
      }
    ).catch(
      error => {
        dispatch({type:"LOGIN_WITH_EMAIL", status: 0, message: error.message, payload: []});
      }
    )
  }
}

export const loginWithEmployeeCode = (data) => {
  let dataPost = {
    EmployeeCode: data.code,
    TypeLogin: 2
  }
  return async dispatch => {
    await postAPI("/api/login", dataPost).then(
      response => {
        dispatch({type:"LOGIN_WITH_EMPLOYEE_CODE", status: response.Status, message: response.Message, payload: response.Data});
       if(response.Status === 200){
        dispatch({type:"CHANGE_ROLE", userRole: response.Data.Permission});
        if(data.remember){
          setLocalSession(dataPost);
        }
       }
      }
    ).catch(
      error => {
        dispatch({type:"LOGIN_WITH_EMPLOYEE_CODE", status: 0, message: error.message, payload: []});
      }
    )
  }
}
export const logoutWithJWT = () => {
  return dispatch => {
    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
    history.push("/pages/login")
  }
}

export const logoutWithFirebase = user => {
  return dispatch => {
    dispatch({ type: "LOGOUT_WITH_FIREBASE", payload: {} })
    history.push("/pages/login")
  }
}
