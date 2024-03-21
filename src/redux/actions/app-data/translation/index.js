
export const updatelangueSelected = (obj) => {
  return dispatch => {
    dispatch({type:"UPDATE_LANGUE", langue: obj});
  }
}
