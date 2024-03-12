const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
  showModalApi: false,
  statusAPI: 0,
  messageAPI: "",
  timeAPI:"",
  translations: []
}

const getIndex = (arr, arr2, arr3, params = {}) => {
  if (arr2.length > 0) {
    let startIndex = arr.findIndex(i => i.UniqueID === arr2[0].UniqueID) + 1
    let endIndex = arr.findIndex(i => i.UniqueID === arr2[arr2.length - 1].UniqueID) + 1
    let finalArr = [startIndex, endIndex]
    return (arr3 = finalArr)
  } else {
    let finalArr = [arr.length - parseInt(params.perPage), arr.length]
    return (arr3 = finalArr)
  }
}



const SetupForcedChoiceReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "SHOW_ERROR_API_FORCEDCHOICE":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_FORCEDCHOICE":

      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          ForcedChoiceID: element.ForcedChoiceID,
          UniqueID: element.UniqueID,
          OptionIndex: element.OptionIndex,
          Question: element.Question,
          Sequence: element.Sequence,
          Descript: element.Descript,
          ChoiceProductNum: element.ChoiceProductNum,
          ChoiceProductName: element.ChoiceProductName,
          Price: element.Price,
          DateModified: element.DateModified,
          DateCreated: element.DateCreated,
          Translations: element.Translations
        }
        result.push(item);
      });
      return {
        ...state,
        allData: result,
        totalRecords: result.length,
        totalPages: action.data.TotalPages,
        sortIndex: getIndex(result, result, state.sortIndex),
        showModalApi:false,
        data: result
      }
    case "APPEND_DATA_TRANSLATION":
      let translation = [];
      action.data.Data.forEach(element => {
        let item = {
          TranslationID: element.TranslationID,
          TranslationName: element.TranslationName
        }
        translation.push(item);
      });

      return {
        ...state,
        translations: translation
      }
    case "FILTER_FORCEDCHOICE":
      let value = action.value;
      let filteredData = [];
      if (value.length) {
        filteredData = state.allData
          .filter(item => {
            let startsWithCondition =
              item.ChoiceProductName.toLowerCase().startsWith(value.toLowerCase());
            let includesCondition =
              item.ChoiceProductName.toLowerCase().includes(value.toLowerCase());

            if (startsWithCondition) {
              return startsWithCondition
            } else if (!startsWithCondition && includesCondition) {
              return includesCondition
            } else return null
          })

        return { ...state, filteredData }
      } else {
        filteredData = state.data
        return { ...state, filteredData }
      }
    case "UPDATE_DATA_FORCEDCHOICE":
      let updateData = [];
      action.data.forEach(element => {
        let item = {
          ForcedChoiceID: element.ForcedChoiceID,
          UniqueID: element.UniqueID,
          OptionIndex: element.OptionIndex,
          Question: element.Question,
          Sequence: element.Sequence,
          Descript: element.Descript,
          ChoiceProductNum: element.ChoiceProductNum,
          ChoiceProductName: element.ChoiceProductName,
          Price: element.Price,
          DateModified: element.DateModified,
          DateCreated: element.DateCreated,
          Translations: element.Translations
        }
        updateData.push(item);
      });
      return {
        ...state,
        data: updateData,
        filteredData: updateData,
        allData: updateData,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    default:
      return state
  }
}

export default SetupForcedChoiceReducer
