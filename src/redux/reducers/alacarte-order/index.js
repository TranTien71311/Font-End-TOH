import {getImageSite} from "../../../Api/SiteApi/api"
import logo from "../../../assets/img/logo/logofv.png"
const initialState = {
  dataWard: [],
  dataRoom: [],
  dataPatient: [],
  dataRoomSelected: [],
  dataCategories: [],
  dataProducts: [],
  dataQuestions: [],
  dataProductInReport: [],
  dataForcedChoices: [],
  dataSysInfo: {},
  patientSelected: {},
  transactionDetail: [],
  showModalApi: false,
  statusAPI: 0,
  messageAPI: "",
  timeAPI:"",
  roomSelected: {},
  wardSelected: {}
}

const OrderAlacarteReducer = (state = initialState, action) => {
  let time = new Date();
  switch (action.type) {
    case "UPDATE_ROOM_SELECTED":
      return  {
          ...state,
          roomSelected: action.obj
        }
    case "UPDATE_WARD_SELECTED":
      return  {
          ...state,
          wardSelected: action.obj
        }
    case "SHOW_ERROR_API_ORDER_ALACARTE":
      return {
        ...state,
        showModalApi: true,
        statusAPI: action.status,
        messageAPI: action.message,
        timeAPI: time
      }
    case "APPEND_DATA_WARD_ALACARTE":
      let result = [];
      action.data.Data.forEach(element => {
        let item = {
          WardID: element.WardID,
          WardNameEn: element.WardNameEn,
          WardNameVn: element.WardNameVn,
          ModifiedDate: element.ModifiedDate,
          CreatedDate: element.CreatedDate,
        }
        result.push(item);
      });

      return {
        ...state,
        dataWard: result
      }
    case "APPEND_DATA_ROOM_ALACARTE":

      let rooms = [];
      action.data.Data.forEach(element => {
        let item = {
          RoomID: element.RoomID,
          RoomCode: element.RoomCode,
          WardID: element.WardID,
          RoomNameEn: element.RoomNameEn,
          RoomNameVn: element.RoomNameVn,
          ModifiedDate: element.ModifiedDate,
          CreatedDate: element.CreatedDate
        }
        rooms.push(item)
      });
      return {
        ...state,
        dataRoom: rooms
      }
    case "SET_PATIENT_SELECTED":
    return {
      ...state,
      patientSelected: action.obj
    }
    case "APPEND_DATA_PATIENT_ALACARTE":
      let patients = [];
      action.data.Data.forEach(element => {
        let item = {
          PatientID: element.PatientID,
          VisitCode: element.VisitCode,
          HN: element.HN ,
          BedCode: element.BedCode ,
          BedName: element.BedName,
          RoomID: element.RoomID,
          RoomName: element.RoomName,
          WardName: element.WardName ,
          PatientFullName: element.PatientFullName ,
          DoB: element.DoB ,
          Nationality: element.Nationality ,
          PrimaryDoctor: element.PrimaryDoctor ,
          FastingFrom: element.FastingFrom ,
          FastingTo: element.FastingTo ,
          LengthOfStay: element.LengthOfStay ,
          PreviousBed: element.PreviousBed ,
          MovedToBed: element.MovedToBed ,
          DoNotOrderFrom: element.DoNotOrderFrom ,
          DoNotOrderTo: element.DoNotOrderTo ,
          AdmitDate: element.AdmitDate ,
          DischargeDate: element.DischargeDate ,
          IsActive: element.IsActive ,
          CreatedDate: element.CreatedDate ,
          ModifiedDate: element.ModifiedDate,
          Transactions: element.TransactionAlacarte
        }
        patients.push(item);
      });

      return {
        ...state,
        dataPatient: patients
      }
    case "APPEND_DATA_TRANSACTION_ALACARTE":
      let transactions = action.data.Data;
      let result2 = [];
      state.dataPatient.forEach(element => {
        let item = element;
        let tran = transactions.filter(x=>x.PatientID === element.PatientID);
        item["Transactions"] = tran;
        result2.push(item);
      });
      console.log(result2);
      return {
        ...state,
        dataPatient: result2
      }
    case "UPDATE_ROOM_WARD_ALACARTE":
      return {
        ...state,
        dataRoomSelected: action.data
      }
    case "APPEND_DATA_CATEGORY_ALACARTE":

    let categories = [];
    action.data.Data.forEach(element => {
      let item = {
          ReportCatID: element.ReportCatID,
          ReportNo: element.ReportNo,
          ReportName: element.ReportName,
          Image: (element.Image !== null && element.Image !== "" ? getImageSite(element.Image) : logo),
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
      categories.push(item)
    });
    return {
      ...state,
      dataCategories: categories
    }
    case "APPEND_DATA_PRODUCT_ALACARTE":
    let products = [];
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
        Question1 : element.Question1,
        Question2 : element.Question2,
        Question3 : element.Question3,
        Question4 : element.Question4,
        Question5 : element.Question5,
        ProductType : element.ProductType,
        SizeUp : element.SizeUp,
        SizeDown : element.SizeDown,
        LabelCapacity : element.LabelCapacity,
        IsPublic : element.IsPublic,
        Index : element.Index,
        Image : (element.Image !== null && element.Image !== "" ? getImageSite(element.Image) : logo),
        DateCreated : element.DateCreated,
        DateModified : element.DateModified,
        IsActive : element.IsActive,
        Tranlations : element.Tranlations,
        TimeStartOrder: element.TimeStartOrder,
        TimeEndOrder: element.TimeEndOrder,
        Quantity: 1
      }
      products.push(item)
    });
    return {
      ...state,
      dataProducts: products
    }
    case "GET_PRODUCT_IN_REPORT_ALACARTE":
      let productReports = state.dataProducts.filter(x=>x.ReportNo === action.ReportNo);
      return {
        ...state,
        dataProductInReport: productReports
      }
    case "APPEND_DATA_QUESTION_ALACARTE":
    let questions = [];
    action.data.Data.forEach(element => {
      let item = {
        QuestionID: element.QuestionID,
        OptionIndex: element.OptionIndex,
        Question: element.Question,
        Descript: element.Descript,
        Forced: element.Forced,
        NumChoice: element.NumChoice,
        Allowmulti: element.Allowmulti,
        Tranlations: element.Tranlations
      }
      questions.push(item)
    });
    return {
      ...state,
      dataQuestions: questions
    }
    case "APPEND_DATA_FORCEDCHOICE_ALACARTE":
      let forcedchoices = [];
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
          Translations: element.Translations
        }
        forcedchoices.push(item)
      });
      return {
        ...state,
        dataForcedChoices: forcedchoices
      }
    case "APPEND_DATA_SYSINFO_ALACARTE":
      let sysinfo = {
        TaxRate1: action.data.Data[0].TaxRate1,
        TaxRate2: action.data.Data[0].TaxRate2,
        TaxRate3: action.data.Data[0].TaxRate3,
        TaxRate4: action.data.Data[0].TaxRate4,
        TaxRate5: action.data.Data[0].TaxRate5
      };
      console.log(sysinfo);
      return {
        ...state,
        dataSysInfo: sysinfo
      }
    case "UPDATE_DATA_TRANSACTION_ALACARTE":
      let transaction = action.data;
      let result3 = [];
      state.dataPatient.forEach(element => {
        if(element.PatientID === transaction.PatientID){
          let index = element.Transactions.findIndex(x=>x.TransactionCode === transaction.TransactionCode);
          element.Transactions[index]["Status"] = 1;
          result3.push(element);
        }else {
          result3.push(element);
        }

      });
      return {
        ...state,
        dataPatient: result3
      }
    case "UPDATE_TRANSACTION_DETAIL_ALACARTE":
      let transactionDetail = action.data.Data;
      return {
        ...state,
        transactionDetail: transactionDetail
      }
    default:
      return state
  }
}

export default OrderAlacarteReducer
