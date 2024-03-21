import { getImageSite } from "../../../../Api/SiteApi/api";
const initialState = {
  data: [],
  langue: {},
  showModalApi: false,
  statusAPI: 0,
  messageAPI: "",
  timeAPI:""
}

const TranslationReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "SHOW_ERROR_API_TRANSLATION":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_TRANSLATION":
      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          TranslationID: element.TranslationID,
          TranslationName: element.TranslationName,
          Image: (element.Image !== null && element.Image !== "" ? getImageSite(element.Image) : ""),
          ModifiedDate: element.ModifiedDate,
          CreatedDate: element.CreatedDate,
          TranslationCode: element.TranslationCode
        }
        result.push(item);
      });

      return {
        ...state,
        data: result,
        langue: result[0]
      }
    case "UPDATE_LANGUE":
      return {
        ...state,
        langue: action.langue
      }
    default:
      return state
  }
}

export default TranslationReducer
