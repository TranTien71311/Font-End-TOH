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
    let startIndex = arr.findIndex(i => i.OptionIndex === arr2[0].OptionIndex) + 1
    let endIndex = arr.findIndex(i => i.OptionIndex === arr2[arr2.length - 1].OptionIndex) + 1
    let finalArr = [startIndex, endIndex]
    return (arr3 = finalArr)
  } else {
    let finalArr = [arr.length - parseInt(params.perPage), arr.length]
    return (arr3 = finalArr)
  }
}



const SetupQuestionReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "SHOW_ERROR_API_QUESTION":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_QUESTION":
      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          QuestionID: element.QuestionID,
          OptionIndex: element.OptionIndex,
          Question: element.Question,
          Descript: element.Descript,
          Forced: element.Forced,
          NumChoice: element.NumChoice,
          DateModified: element.DateModified,
          DateCreated: element.DateCreated,
          Allowmulti: element.Allowmulti,
          Tranlations: element.Tranlations
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
    case "FILTER_QUESTION":
      let value = action.value;
      let filteredData = [];
      if (value.length) {
        filteredData = state.allData
          .filter(item => {
            let startsWithCondition =
              item.Question.toLowerCase().startsWith(value.toLowerCase());
            let includesCondition =
              item.Question.toLowerCase().includes(value.toLowerCase());

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
    case "UPDATE_DATA_QUESTION":
      let updateData = [];
      action.data.forEach(element => {
        let item = {
          QuestionID: element.QuestionID,
          OptionIndex: element.OptionIndex,
          Question: element.Question,
          Descript: element.Descript,
          Forced: element.Forced,
          NumChoice: element.NumChoice,
          DateModified: element.DateModified,
          DateCreated: element.DateCreated,
          Allowmulti: element.Allowmulti,
          Tranlations: element.Tranlations
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

export default SetupQuestionReducer
