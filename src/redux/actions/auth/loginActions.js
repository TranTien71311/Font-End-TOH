import {postAPI, fetchAPI} from "../../../Api/SiteApi/api"
import { history } from "../../../history"
import { getSession } from "../../../codes/function"
import jwt from "jsonwebtoken"

const setLocalSession = (data) => {
    localStorage.setItem("loginSession", data);
}


export const loginWithSession = () => {
  let loginSessionStr = localStorage.getItem("loginSession");
  let dataPost = {
    AccessToken: loginSessionStr
  }

  return async dispatch => {
    await fetchAPI("/api/Translations?IsActive=true").then(
      response => {
       if(response.Status === 200){
        dispatch({type:"APPEND_DATA_TRANSLATION", data: response});
       }else {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: response.Message});
       }
      }
    ).catch(
      error => {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: error.message});
      }
    )
    await postAPI("/api/login", dataPost).then(
      response => {
        dispatch({type:"LOGIN_WITH_USERNAME", status: response.Status, message: response.Message, payload: response.Data});
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
  const accessToken = jwt.sign(
    {
      UserName: data.username,
      Password: data.password,
      TypeLogin: 0
    },
    "221278",
    {expiresIn: 8000}
    )
    let dataPost = {
      AccessToken: accessToken
    }
    return async dispatch => {
    await fetchAPI("/api/Translations?IsActive=true").then(
      response => {
        if(response.Status === 200){

        dispatch({type:"APPEND_DATA_TRANSLATION", data: response});
        }else {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: response.Message});
        }
      }
    ).catch(
      error => {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: error.message});
      }
    )
    await postAPI("/api/login", dataPost).then(
      response => {
        dispatch({type:"LOGIN_WITH_USERNAME", status: response.Status, message: response.Message, payload: response.Data});

       if(response.Status === 200){
        dispatch({type:"CHANGE_ROLE", userRole: response.Data.Permission});
        if(data.remember){
          setLocalSession(accessToken);
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
  const accessToken = jwt.sign(
    {
      Email: data.email,
      Password: data.password,
      TypeLogin: 1
    },
    "221278",
    {expiresIn: 8000}
    )
    let dataPost = {
      AccessToken: accessToken
    }
  return async dispatch => {
    await fetchAPI("/api/Translations?IsActive=true").then(
      response => {
       if(response.Status === 200){

        dispatch({type:"APPEND_DATA_TRANSLATION", data: response});
       }else {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: response.Message});
       }
      }
    ).catch(
      error => {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: error.message});
      }
    )
    await postAPI("/api/login", dataPost).then(
      response => {
        dispatch({type:"LOGIN_WITH_EMAIL", status: response.Status, message: response.Message, payload: response.Data});
       if(response.Status === 200){
        dispatch({type:"CHANGE_ROLE", userRole: response.Data.Permission});
        if(data.remember){
          setLocalSession(accessToken);
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
  const accessToken = jwt.sign(
    {
      EmployeeCode: data.code,
      TypeLogin: 2
    },
    "221278",
    {expiresIn: 8000}
    )
    let dataPost = {
      AccessToken: accessToken
    }
  return async dispatch => {
    await fetchAPI("/api/Translations?IsActive=true").then(
      response => {
       if(response.Status === 200){

        dispatch({type:"APPEND_DATA_TRANSLATION", data: response});
       }else {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: response.Message});
       }
      }
    ).catch(
      error => {
        dispatch({type:"SHOW_ERROR_API_TRANSLATION", status: 0, message: error.message});
      }
    )
    await postAPI("/api/login", dataPost).then(
      response => {
        dispatch({type:"LOGIN_WITH_EMPLOYEE_CODE", status: response.Status, message: response.Message, payload: response.Data});
       if(response.Status === 200){
        dispatch({type:"CHANGE_ROLE", userRole: response.Data.Permission});
        if(data.remember){
          setLocalSession(accessToken);
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
