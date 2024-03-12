const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
  showModalApi: false,
  loading: false,
  statusAPI: 0,
  messageAPI: "",
  timeAPI:""
}

const getIndex = (arr, arr2, arr3, params = {}) => {
  if (arr2.length > 0) {
    let startIndex = arr.findIndex(i => i.SyncID === arr2[0].SyncID) + 1
    let endIndex = arr.findIndex(i => i.SyncID === arr2[arr2.length - 1].SyncID) + 1
    let finalArr = [startIndex, endIndex]
    return (arr3 = finalArr)
  } else {
    let finalArr = [arr.length - parseInt(params.perPage), arr.length]
    return (arr3 = finalArr)
  }
}



const SyncDataReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        data: state.data,
        totalPages: state.totalPages,
        params: action.params,
        sortIndex: getIndex(
          state.allData,
          state.data,
          state.sortIndex,
          action.params
        )
      }
    case "LOADING_DATA":
      return {
        ...state,
        loading: true,
        showModalApi: false
      }
    case "PENDING_API":
      return {
        ...state,
        showModalApi: false
      }
    case "SHOW_ERROR_API":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time,
        loading: false
      }

    case "APPEND_DATA":
      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          SyncID: element.SyncID,
          SyncName: element.SyncName,
          Progress: 0,
          Status: 0,
          APIGetLink: element.APIGetLink,
          APIPostLink: element.APIPostLink,
          SyncValue: element.SyncValue
        }
        result.push(item);
      });

      return {
        ...state,
        allData: result,
        totalRecords: result.length,
        totalPages: action.data.TotalPages,
        sortIndex: getIndex(result, result, state.sortIndex),
        data: result,
        loading:false
      }
    case "FILTER_DATA":
      let value = action.value;
      let filteredData = [];
      if (value.length) {
        filteredData = state.allData
          .filter(item => {
            let startsWithCondition =
              item.SyncName.toLowerCase().startsWith(value.toLowerCase());
            let includesCondition =
              item.SyncName.toLowerCase().includes(value.toLowerCase());

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
    case "UPDATE_DATA":
      let updateData = [];
      action.data.forEach(element => {
        let item = {
          SyncID: element.SyncID,
          SyncName: element.SyncName,
          APIGetLink: element.APIGetLink,
          APIPostLink: element.APIPostLink,
          SyncValue: element.SyncValue,
          Progress: element.Progress,
          Status: element.Status,
        }
        updateData.push(item);
      });
      return {
        ...state,
        data: updateData,
        filteredData: updateData,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "UPDATE_STATUS_SYNC":
      let updateSync = [];
      action.data.forEach(element => {
        let item = {
          SyncID: element.SyncID,
          SyncName: element.SyncName,
          APIGetLink: element.APIGetLink,
          APIPostLink: element.APIPostLink,
          SyncValue: element.SyncValue,
          Progress: element.Progress,
          Status: element.Status,
        }
        updateSync.push(item);
      });
      return {
        ...state,
        data: updateSync,
        filteredData: updateSync
      }
    default:
      return state
  }
}

export default SyncDataReducer
