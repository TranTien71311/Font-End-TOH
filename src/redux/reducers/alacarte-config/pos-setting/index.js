const initialState = {
  dataSysInfo: [],
  dataPOSSetting: [],
  dataProduct: [],
  dataSaleType: [],
  showModalApi: false,
  statusAPI: 0,
  messageAPI: "",
  timeAPI:"",
}



const SetupPOSSettingReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "SHOW_ERROR_API_POSSETTING":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_POSSETTING":
      return {
        ...state,
        showModalApi:false,
        dataPOSSetting: action.data.Data[0]
      }
    case "UPDATE_DATA_POSSETTING":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time,
        dataPOSSetting: action.data
      }
    case "APPEND_DATA_SYSINFO":
      let sysinfo = [];
      action.data.Data.forEach(element => {
        let item = {
          Company: element.Company,
          TaxDes1: element.TaxDes1,
          TaxDes2: element.TaxDes2,
          TaxDes3: element.TaxDes3,
          TaxDes4: element.TaxDes4,
          TaxDes5: element.TaxDes5,
          TaxRate1: element.TaxRate1,
          TaxRate2: element.TaxRate2,
          TaxRate3: element.TaxRate3,
          TaxRate4: element.TaxRate4,
          TaxRate5: element.TaxRate5,
          TaxData1: element.TaxData1,
          TaxData2: element.TaxData2,
          TaxData3: element.TaxData3,
          TaxData4: element.TaxData4,
          TaxData5: element.TaxData5,
          UseVAT: element.UseVAT,
        }
        sysinfo.push(item);
      });

      return {
        ...state,
        dataSysInfo: sysinfo[0]
      }
    case "APPEND_DATA_PRODUCT_POSSETTING":
      let product = [];
      action.data.Data.forEach(element => {
        let item = {
          value : element.ProductNum,
          label : element.ProductName
        }
        product.push(item);
      });

      return {
        ...state,
        dataProduct: product
      }
    case "APPEND_DATA_SALETYPE":
      let saletype = [];
      action.data.Data.forEach(element => {
        let item = {
          value: element.SaleTypeIndex,
          label: element.Descript
        }
        saletype.push(item);
      });

      return {
        ...state,
        dataSaleType: saletype
      }
    case "UPDATE_DATA_PRODUCT":
      let updateData = [];
      action.data.forEach(element => {
        let item = {
          SaleType: element.SaleType,
          ProductComment: element.ProductComment,
          StationNum: element.StationNum,
          RevCenter: element.RevCenter,
          SectionNum: element.SectionNum,
          TableNum: element.TableNum
        }
        updateData.push(item);
      });
      return {
        ...state,
        dataPOSSetting: updateData,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }

    default:
      return state
  }
}

export default SetupPOSSettingReducer
