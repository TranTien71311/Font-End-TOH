
export const login = (
  state = {
    userRole: "" ,
    loginStatus: 0,
    loginMessage: ""
  },
  action) => {
  switch (action.type) {
    case "LOGIN_WITH_USERNAME": {
      return {
        ...state,
        values: action.payload,
        loginStatus: action.status,
        loginMessage: action.message
      }
    }
    case "LOGIN_WITH_EMAIL": {
      return {
        ...state,
        values: action.payload,
        loginStatus: action.status,
        loginMessage: action.message
      }
    }
    case "LOGIN_WITH_EMPLOYEE_CODE": {
      return {
        ...state,
        values: action.payload,
        loginStatus: action.status,
        loginMessage: action.message
      }
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole }
    }
    default: {
      return state
    }
  }
}
