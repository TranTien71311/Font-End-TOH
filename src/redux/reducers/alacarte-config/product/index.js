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
    let startIndex = arr.findIndex(i => i.ProductNum === arr2[0].ProductNum) + 1
    let endIndex = arr.findIndex(i => i.ProductNum === arr2[arr2.length - 1].ProductNum) + 1
    let finalArr = [startIndex, endIndex]
    return (arr3 = finalArr)
  } else {
    let finalArr = [arr.length - parseInt(params.perPage), arr.length]
    return (arr3 = finalArr)
  }
}



const SetupProductReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "SHOW_ERROR_API_PRODUCT":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_PRODUCT":
      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          ProductID : element.ProductID,
          ProductNum : element.ProductNum,
          ProductName : element.ProductName,
          ReportNo : element.ReportNo,
          PriceA : element.PriceA,
          PriceB : element.PriceB,
          PriceC : element.PriceC,
          PriceD : element.PriceD,
          PriceE : element.PriceE,
          PriceF : element.PriceF,
          PriceG : element.PriceG,
          PriceH : element.PriceH,
          PriceI : element.PriceI,
          PriceJ : element.PriceJ,
          Tax1 : element.Tax1,
          Tax2 : element.Tax2,
          Tax3 : element.Tax3,
          Tax4 : element.Tax4,
          Tax5 : element.Tax5,
          ProductType : element.ProductType,
          SizeUp : element.SizeUp,
          SizeDown : element.SizeDown,
          LabelCapacity : element.LabelCapacity,
          IsPublic : element.IsPublic,
          Index : element.Index,
          Image : element.Image,
          DateCreated : element.DateCreated,
          DateModified : element.DateModified,
          IsActive : element.IsActive,
          Tranlations : element.Tranlations,
          TimeStartOrder: element.TimeStartOrder,
          TimeEndOrder: element.TimeEndOrder,
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
    case "FILTER_PRODUCT":
      let value = action.value;
      let filteredData = [];
      if (value.length) {
        filteredData = state.allData
          .filter(item => {
            let startsWithCondition =
              item.ProductName.toLowerCase().startsWith(value.toLowerCase());
            let includesCondition =
              item.ProductName.toLowerCase().includes(value.toLowerCase());

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
    case "UPDATE_DATA_PRODUCT":
      let updateData = [];
      action.data.forEach(element => {
        let item = {
          ProductID : element.ProductID,
          ProductNum : element.ProductNum,
          ProductName : element.ProductName,
          ReportNo : element.ReportNo,
          PriceA : element.PriceA,
          PriceB : element.PriceB,
          PriceC : element.PriceC,
          PriceD : element.PriceD,
          PriceE : element.PriceE,
          PriceF : element.PriceF,
          PriceG : element.PriceG,
          PriceH : element.PriceH,
          PriceI : element.PriceI,
          PriceJ : element.PriceJ,
          Tax1 : element.Tax1,
          Tax2 : element.Tax2,
          Tax3 : element.Tax3,
          Tax4 : element.Tax4,
          Tax5 : element.Tax5,
          ProductType : element.ProductType,
          SizeUp : element.SizeUp,
          SizeDown : element.SizeDown,
          LabelCapacity : element.LabelCapacity,
          IsPublic : element.IsPublic,
          Index : element.Index,
          Image : element.Image,
          DateCreated : element.DateCreated,
          DateModified : element.DateModified,
          IsActive : element.IsActive,
          Tranlations : element.Tranlations,
          TimeStartOrder: element.TimeStartOrder,
          TimeEndOrder: element.TimeEndOrder,
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
      case "UPDATE_CURRENT_PRODUCT":
        return {
          ...state,
          reportCatSelected: action.dataSelected
        }

    default:
      return state
  }
}

export default SetupProductReducer
