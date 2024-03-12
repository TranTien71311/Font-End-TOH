const initialState = {
  data: [],
  allData: [],
  dataRoom: [],
  showModalApi: false,
  statusAPI: 0,
  messageAPI: "",
  timeAPI:""
}

const WardReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "SHOW_ERROR_API_WARD":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_WARD":
      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          WardID: element.QuestionID,
          WardNameEn: element.OptionIndex,
          WardNameVn: element.Question,
          ModifiedDate: element.DateModified,
          CreatedDate: element.DateCreated,
        }
        result.push(item);
      });

      return {
        ...state,
        allData: result
      }
    case "UPDATE_ROOM_WARD":
      return {
        ...state,
        dataRoom: action.rooms
      }
    default:
      return state
  }
}

export default WardReducer
