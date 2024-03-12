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
  translations: [],
  reportCatSelected: {},
}

const getIndex = (arr, arr2, arr3, params = {}) => {
  if (arr2.length > 0) {
    let startIndex = arr.findIndex(i => i.ReportNo === arr2[0].ReportNo) + 1
    let endIndex = arr.findIndex(i => i.ReportNo === arr2[arr2.length - 1].ReportNo) + 1
    let finalArr = [startIndex, endIndex]
    return (arr3 = finalArr)
  } else {
    let finalArr = [arr.length - parseInt(params.perPage), arr.length]
    return (arr3 = finalArr)
  }
}



const SetupReportCatReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "SHOW_ERROR_API_REPORTCAT":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_REPORTCAT":
      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          ReportCatID: element.ReportCatID,
          ReportNo: element.ReportNo,
          ReportName: element.ReportName,
          Image: element.Image,
          SummaryNum: element.SummaryNum,
          SummaryName: element.SummaryName,
          Index: element.Index,
          Course: element.Course,
          IsPublic: element.IsPublic,
          DateCreated: element.DateCreated,
          DateModified: element.DateModified,
          IsActive: element.IsActive,
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
    case "FILTER_REPORTCAT":
      let value = action.value;
      let filteredData = [];
      if (value.length) {
        filteredData = state.allData
          .filter(item => {
            let startsWithCondition =
              item.REPORTCAT.toLowerCase().startsWith(value.toLowerCase());
            let includesCondition =
              item.REPORTCAT.toLowerCase().includes(value.toLowerCase());

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
    case "UPDATE_DATA_REPORTCAT":
      let updateData = [];
      action.data.forEach(element => {
        let item = {
          ReportCatID: element.ReportCatID,
          ReportNo: element.ReportNo,
          ReportName: element.ReportName,
          Image: element.Image,
          SummaryNum: element.SummaryNum,
          SummaryName: element.SummaryName,
          Index: element.Index,
          Course: element.Course,
          IsPublic: element.IsPublic,
          DateCreated: element.DateCreated,
          ModifiedDate: element.DateModified,
          IsActive: element.IsActive,
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
      case "UPDATE_CURRENT_REPORTCAT":
        return {
          ...state,
          reportCatSelected: action.dataSelected
        }

    default:
      return state
  }
}

export default SetupReportCatReducer
