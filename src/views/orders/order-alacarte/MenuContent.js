import React from "react"
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import {
  Grid,
  List,
  ShoppingCart,
  Menu,
  Eye
} from "react-feather"
import { Link } from "react-router-dom"
import NumericInput from "react-numeric-input"
import PerfectScrollbar from "react-perfect-scrollbar"
import "../../../assets/scss/plugins/forms/react-select/_react-select.scss"
import { mobileStyle } from "../../forms/form-elements/number-input/InputStyles"
import Spinner from "../../../components/formLoading"
import { formatVND } from "../../../codes/function"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
import "../../../assets/scss/pages/app-ecommerce-shop.scss"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"

class MenuContentAlacarte extends React.Component {
  state = {
    inCart: [],
    inWishlist: [],
    view: "grid-view",
    products: this.props.dataProductInReport,
    allProducts: this.props.dataProducts,
    patient: this.props.patientSelected,
    questions: this.props.dataQuestions,
    forcedChoices: this.props.dataForcedChoices,
    loading: this.props.loadingGetProduct,
    showModalQuestion: false,
    showModalCart: false,
    productSelected: {},
    sysInfo: this.props.sysInfo,
    langue: this.props.langue
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.dataProducts !== null && prevProps.dataProducts === null)
    || (this.props.dataProductInReport !== null && prevState !== null && this.props.dataProductInReport !== prevState.products)
    || (this.props.patientSelected !== null && prevState !== null && this.props.patientSelected !== prevState.patient)
    || (this.props.dataQuestions !== null && prevState !== null && this.props.dataQuestions !== prevState.questions)
    || (this.props.dataForcedChoices !== null && prevState !== null && this.props.dataForcedChoices !== prevState.forcedChoices)
    || (this.props.dataProducts !== null && prevState !== null && this.props.dataProducts !== prevState.allProducts)
    || (this.props.langue !== null && prevState !== null && this.props.langue !== prevState.langue)
    ) {
      this.setState(
        {
          allProducts: this.props.dataProducts,
          products: this.props.dataProductInReport,
          patientSelected: this.props.patientSelected ,
          questions: this.props.dataQuestions,
          forcedChoices: this.props.dataForcedChoices,
          langue: this.props.langue
        }
      );
    }
    if(this.props.loadingGetProduct !== null && prevState !== null && this.props.loadingGetProduct !== prevState.loading){
      this.setState({ loading: this.props.loadingGetProduct });
    }
  }
  handleQuantity = (productNum, qty) => {
    let products = this.state.products;
    let index = products.findIndex(x=>x.ProductNum === productNum);
    products[index]["Quantity"] = qty;
    this.setState({products: products});
  }
  toggleModal = () => {
    this.setState(prevState => ({
      showModalQuestion: !prevState.showModalQuestion
    }))
  }
  toggleModalCart = () => {
    this.setState(prevState => ({
      showModalCart: !prevState.showModalCart
    }))
  }
  handleAddToCart = product => {
    let cart = this.state.inCart;
    let dataAdd = product;
    dataAdd["dataQuestion1"] = {};
    dataAdd["dataQuestion1"] = {};
    dataAdd["dataQuestion2"] = {};
    dataAdd["dataQuestion3"] = {};
    dataAdd["dataQuestion4"] = {};
    dataAdd["dataQuestion5"] = {};
    if(
      (product.Question1 != "" && product.Question1 != null && product.Question1 != 0)
      || (product.Question2 != "" && product.Question2 != null && product.Question2 != 0)
      || (product.Question3 != "" && product.Question3 != null && product.Question3 != 0)
      || (product.Question4 != "" && product.Question4 != null && product.Question4 != 0)
      || (product.Question5 != "" && product.Question5 != null && product.Question5 != 0)
    ){
      if(product.Question1 != "" && product.Question1 != null && product.Question1 != 0){
        let dataQuestion = this.state.questions.find(x=>x.OptionIndex == product.Question1);
        if(typeof dataQuestion !== "undefined"){
          let dataForcedChoices = this.state.forcedChoices.filter(x=>x.OptionIndex == dataQuestion.OptionIndex);
          dataForcedChoices.forEach((el,i) => {
            dataForcedChoices[i]["Quantity"] = 0;
          })
          dataQuestion["forcedChoices"] = dataForcedChoices;
          dataAdd["dataQuestion1"] = dataQuestion;
        }
      }
      if(product.Question2 != "" && product.Question2 != null && product.Question2 != 0){
        let dataQuestion = this.state.questions.find(x=>x.OptionIndex == product.Question2);
        if(typeof dataQuestion !== "undefined"){
          let dataForcedChoices = this.state.forcedChoices.filter(x=>x.OptionIndex == dataQuestion.OptionIndex);
          dataForcedChoices.forEach((el,i) => {
            dataForcedChoices[i]["Quantity"] = 0;
          })
          dataQuestion["forcedChoices"] = dataForcedChoices;
          dataAdd["dataQuestion2"] = dataQuestion;
        }
      }
      if(product.Question3 != "" && product.Question3 != null && product.Question3 != 0){
        let dataQuestion = this.state.questions.find(x=>x.OptionIndex == product.Question3);
        if(typeof dataQuestion !== "undefined"){
          let dataForcedChoices = this.state.forcedChoices.filter(x=>x.OptionIndex == dataQuestion.OptionIndex);
          dataForcedChoices.forEach((el,i) => {
            dataForcedChoices[i]["Quantity"] = 0;
          })
          dataQuestion["forcedChoices"] = dataForcedChoices;
          dataAdd["dataQuestion3"] = dataQuestion;
        }
      }
      if(product.Question4 != "" && product.Question4 != null && product.Question4 != 0){
        let dataQuestion = this.state.questions.find(x=>x.OptionIndex == product.Question4);
        if(typeof dataQuestion !== "undefined"){
          let dataForcedChoices = this.state.forcedChoices.filter(x=>x.OptionIndex == dataQuestion.OptionIndex);
          dataForcedChoices.forEach((el,i) => {
            dataForcedChoices[i]["Quantity"] = 0;
          })
          dataQuestion["forcedChoices"] = dataForcedChoices;
          dataAdd["dataQuestion4"] = dataQuestion;
        }
      }
      if(product.Question5 != "" && product.Question5 != null && product.Question5 != 0){
        let dataQuestion = this.state.questions.find(x=>x.OptionIndex == product.Question5);
        if(typeof dataQuestion !== "undefined"){
          let dataForcedChoices = this.state.forcedChoices.filter(x=>x.OptionIndex == dataQuestion.OptionIndex);
          dataForcedChoices.forEach((el,i) => {
            dataForcedChoices[i]["Quantity"] = 0;
          })
          dataQuestion["forcedChoices"] = dataForcedChoices;
          dataAdd["dataQuestion5"] = dataQuestion;
        }
      }
      this.setState({productSelected: dataAdd,showModalQuestion: true})
      return;
    }else{
      let svc = (dataAdd.Tax1 === true ? (dataAdd.PriceA * (this.state.sysInfo.TaxRate1 / 100)) : 0)
      + (dataAdd.Tax5 === true ? (dataAdd.PriceA * (this.state.sysInfo.TaxRate5 / 100)) : 0);

      let allTax = (dataAdd.Tax2 === true ? ((dataAdd.PriceA + svc) * (this.state.sysInfo.TaxRate2/100)) : 0)
      + (dataAdd.Tax3 === true ? ((dataAdd.PriceA + svc) * (this.state.sysInfo.TaxRate3/100)) : 0)
      + (dataAdd.Tax4 === true ? ((dataAdd.PriceA) * (this.state.sysInfo.TaxRate4/100)) : 0);

      let dataPost = {
        UNIQUEID: (this.state.inCart.length + 1),
        PRODNUM: dataAdd.ProductNum,
        PRODTYPE: dataAdd.ProductType,
        COSTEACH: dataAdd.PriceA,
        OrigCostEach: dataAdd.PriceA,
        NetCostEach: (allTax != 0 ? (dataAdd.PriceA + allTax + svc) : dataAdd.PriceA),
        QUAN: dataAdd.Quantity,
        QuestionId: 0,
        MasterItem: 1,
        StoreNum: 0,
        LineDes: '',
        WHOORDER: 999,
        STATNUM: 1
      }

      cart.push(dataPost);
      this.setState({inCart: cart});

    }
  }

  handleAddToCartInQuestion = product => {
    let cart = this.state.inCart;
    let svc = (product.Tax1 === true ? (product.PriceA * (this.state.sysInfo.TaxRate1 / 100)) : 0)
    + (product.Tax5 === true ? (product.PriceA * (this.state.sysInfo.TaxRate5 / 100)) : 0);

    let allTax = (product.Tax2 === true ? ((product.PriceA + svc) * (this.state.sysInfo.TaxRate2/100)) : 0)
    + (product.Tax3 === true ? ((product.PriceA + svc) * (this.state.sysInfo.TaxRate3/100)) : 0)
    + (product.Tax4 === true ? ((product.PriceA) * (this.state.sysInfo.TaxRate4/100)) : 0);

      let unique = (this.state.inCart.length + 1);
      let dataPost = {
        UNIQUEID: (this.state.inCart.length + 1),
        PRODNUM: product.ProductNum,
        PRODTYPE: product.ProductType,
        COSTEACH: product.PriceA,
        OrigCostEach: product.PriceA,
        NetCostEach: (allTax != 0 ? (product.PriceA + allTax + svc) : product.PriceA),
        QUAN: product.Quantity,
        QuestionId: 0,
        MasterItem: 1,
        StoreNum: 0,
        LineDes: '',
        WHOORDER: 999,
        STATNUM: 1
      }
      cart.push(dataPost);

      let forcedQues1 = 0;
      let forcedQues2 = 0;
      let forcedQues3 = 0;
      let forcedQues4 = 0;
      let forcedQues5 = 0;
      let numChoices1 = 0;
      let numChoices2 = 0;
      let numChoices3 = 0;
      let numChoices4 = 0;
      let numChoices5 = 0;
      let numQUAN1 = 0;
      let numQUAN2 = 0;
      let numQUAN3 = 0;
      let numQUAN4 = 0;
      let numQUAN5 = 0;
      if(Object.keys(product.dataQuestion1).length !== 0)
      {
        let num = unique;
        forcedQues1 = product.dataQuestion1.Forced;
        numChoices1 = product.dataQuestion1.NumChoice;
        product.dataQuestion1.forcedChoices.forEach((val, i) => {
          if(val.Quantity > 0){
            numQUAN1 += val.Quantity;
            let productChoices = this.state.allProducts.find(x=>x.ProductNum === val.ChoiceProductNum);
            let allChoisvc = (productChoices.Tax1 === true ? (val.Price * (this.state.sysInfo.TaxRate1 / 100)) : 0)
            + (productChoices.Tax5 === true ? (val.Price * (this.state.sysInfo.TaxRate5 / 100)) : 0);

            let allChoiTax = (productChoices.Tax2 === true ? ((val.Price+ svc) * (this.state.sysInfo.TaxRate2/100)) : 0)
            + (productChoices.Tax3 === true ? ((val.Price + svc) * (this.state.sysInfo.TaxRate3/100)) : 0)
            + (productChoices.Tax4 === true ? ((val.Price) * (this.state.sysInfo.TaxRate4/100)) : 0);
            num += 1;

            let dataPostQues = {
              UNIQUEID: num,
              PRODNUM: val.ChoiceProductNum,
              PRODTYPE: productChoices.ProductType,
              COSTEACH: val.Price,
              OrigCostEach: val.Price,
              NetCostEach: (allChoiTax != 0 ? (val.Price + allChoiTax + allChoisvc) : val.Price),
              QUAN: val.Quantity * product.Quantity,
              QuestionId: unique,
              MasterItem: unique,
              StoreNum: val.OptionIndex,
              LineDes: '',
              WHOORDER: 999,
              STATNUM: 1
            }
            cart.push(dataPostQues);
          }
        })
      }
      if(Object.keys(product.dataQuestion2).length !== 0)
      {
        let num = unique;
        forcedQues2 = product.dataQuestion2.Forced;
        numChoices2 = product.dataQuestion2.NumChoice;
        product.dataQuestion2.forcedChoices.forEach((val, i) => {
          if(val.Quantity > 0){
            numQUAN2 += val.Quantity;
            let productChoices = this.state.allProducts.find(x=>x.ProductNum === val.ChoiceProductNum);
            let allChoisvc = (productChoices.Tax1 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate1 / 100)) : 0)
            + (productChoices.Tax5 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate5 / 100)) : 0);

            let allChoiTax = (productChoices.Tax2 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate2/100)) : 0)
            + (productChoices.Tax3 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate3/100)) : 0)
            + (productChoices.Tax4 === true ? ((productChoices.PriceA) * (this.state.sysInfo.TaxRate4/100)) : 0);
            num += 1;

            let dataPostQues = {
              UNIQUEID: num,
              PRODNUM: val.ChoiceProductNum,
              PRODTYPE: productChoices.ProductType,
              COSTEACH: val.Price,
              OrigCostEach: val.Price,
              NetCostEach: (allChoiTax != 0 ? (val.Price + allChoiTax + allChoisvc) : val.Price),
              QUAN: val.Quantity * product.Quantity,
              QuestionId: unique,
              MasterItem: unique,
              StoreNum: val.OptionIndex,
              LineDes: '',
              WHOORDER: 999,
              STATNUM: 1
            }
            cart.push(dataPostQues);
          }
        })
      }
      if(Object.keys(product.dataQuestion3).length !== 0)
      {
        let num = unique;
        forcedQues3 = product.dataQuestion3.Forced;
        numChoices3 = product.dataQuestion3.NumChoice;
        product.dataQuestion3.forcedChoices.forEach((val, i) => {
          if(val.Quantity > 0){
            numQUAN3 += val.Quantity;
            let productChoices = this.state.allProducts.find(x=>x.ProductNum === val.ChoiceProductNum);
            let allChoisvc = (productChoices.Tax1 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate1 / 100)) : 0)
            + (productChoices.Tax5 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate5 / 100)) : 0);

            let allChoiTax = (productChoices.Tax2 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate2/100)) : 0)
            + (productChoices.Tax3 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate3/100)) : 0)
            + (productChoices.Tax4 === true ? ((productChoices.PriceA) * (this.state.sysInfo.TaxRate4/100)) : 0);
            num += 1;

            let dataPostQues = {
              UNIQUEID: num,
              PRODNUM: val.ChoiceProductNum,
              PRODTYPE: productChoices.ProductType,
              COSTEACH: val.Price,
              OrigCostEach: val.Price,
              NetCostEach: (allChoiTax != 0 ? (val.Price + allChoiTax + allChoisvc) : val.Price),
              QUAN: val.Quantity * product.Quantity,
              QuestionId: unique,
              MasterItem: unique,
              StoreNum: val.OptionIndex,
              LineDes: '',
              WHOORDER: 999,
              STATNUM: 1
            }
            cart.push(dataPostQues);
          }
        })
      }
      if(Object.keys(product.dataQuestion4).length !== 0)
      {
        let num = unique;
        forcedQues4 = product.dataQuestion4.Forced;
        numChoices4 = product.dataQuestion4.NumChoice;
        product.dataQuestion4.forcedChoices.forEach((val, i) => {
          if(val.Quantity > 0){
            numQUAN4 += val.Quantity;
            let productChoices = this.state.allProducts.find(x=>x.ProductNum === val.ChoiceProductNum);
            let allChoisvc = (productChoices.Tax1 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate1 / 100)) : 0)
            + (productChoices.Tax5 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate5 / 100)) : 0);

            let allChoiTax = (productChoices.Tax2 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate2/100)) : 0)
            + (productChoices.Tax3 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate3/100)) : 0)
            + (productChoices.Tax4 === true ? ((productChoices.PriceA) * (this.state.sysInfo.TaxRate4/100)) : 0);
            num += 1;

            let dataPostQues = {
              UNIQUEID: num,
              PRODNUM: val.ChoiceProductNum,
              PRODTYPE: productChoices.ProductType,
              COSTEACH: val.Price,
              OrigCostEach: val.Price,
              NetCostEach: (allChoiTax != 0 ? (val.Price + allChoiTax + allChoisvc) : val.Price),
              QUAN: val.Quantity * product.Quantity,
              QuestionId: unique,
              MasterItem: unique,
              StoreNum: val.OptionIndex,
              LineDes: '',
              WHOORDER: 999,
              STATNUM: 1
            }
            cart.push(dataPostQues);
          }
        })
      }
      if(Object.keys(product.dataQuestion5).length !== 0)
      {
        let num = unique;
        forcedQues5 = product.dataQuestion5.Forced;
        numChoices5 = product.dataQuestion5.NumChoice;
        product.dataQuestion5.forcedChoices.forEach((val, i) => {
          if(val.Quantity > 0){
            numQUAN5 += val.Quantity;
            let productChoices = this.state.allProducts.find(x=>x.ProductNum === val.ChoiceProductNum);
            let allChoisvc = (productChoices.Tax1 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate1 / 100)) : 0)
            + (productChoices.Tax5 === true ? (productChoices.PriceA * (this.state.sysInfo.TaxRate5 / 100)) : 0);

            let allChoiTax = (productChoices.Tax2 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate2/100)) : 0)
            + (productChoices.Tax3 === true ? ((productChoices.PriceA + svc) * (this.state.sysInfo.TaxRate3/100)) : 0)
            + (productChoices.Tax4 === true ? ((productChoices.PriceA) * (this.state.sysInfo.TaxRate4/100)) : 0);
            num += 1;

            let dataPostQues = {
              UNIQUEID: num,
              PRODNUM: val.ChoiceProductNum,
              PRODTYPE: productChoices.ProductType,
              COSTEACH: val.Price,
              OrigCostEach: val.Price,
              NetCostEach: (allChoiTax != 0 ? (val.Price + allChoiTax + allChoisvc) : val.Price),
              QUAN: val.Quantity * product.Quantity,
              QuestionId: unique,
              MasterItem: unique,
              StoreNum: val.OptionIndex,
              LineDes: '',
              WHOORDER: 999,
              STATNUM: 1
            }
            cart.push(dataPostQues);
          }
        })
      }
      if(
        this.checkForcedQuestion(forcedQues1, numQUAN1, product.dataQuestion1.Question)
        && this.checkNumChoicesQuestion(numChoices1, numQUAN1, product.dataQuestion1.Question)
        && this.checkForcedQuestion(forcedQues2, numQUAN2, product.dataQuestion2.Question)
        && this.checkNumChoicesQuestion(numChoices2, numQUAN2, product.dataQuestion2.Question)
        && this.checkForcedQuestion(forcedQues3, numQUAN3, product.dataQuestion3.Question)
        && this.checkNumChoicesQuestion(numChoices3, numQUAN3, product.dataQuestion3.Question)
        && this.checkForcedQuestion(forcedQues4, numQUAN4, product.dataQuestion4.Question)
        && this.checkNumChoicesQuestion(numChoices4, numQUAN4, product.dataQuestion4.Question)
        && this.checkForcedQuestion(forcedQues5, numQUAN5, product.dataQuestion5.Question)
        && this.checkNumChoicesQuestion(numChoices5, numQUAN5, product.dataQuestion5.Question)
      ){
        this.setState({inCart: cart})
        this.toggleModal();
      }
  }
  checkForcedQuestion = (numForced, numQuan, questions) => {
    if(numForced > numQuan){
      console.log("Please select at least " + numForced + " " + questions.Question);
      return false;
    }
    return true;
  }
  checkNumChoicesQuestion = (numChoices, numQuan, questions) => {
    if(numChoices < numQuan){
      console.log("Please select maximum " + numChoices + " " + questions.Question);
      return false;
    }
    return true;
  }
  handleView = view => {
    this.setState({
      view
    })
  }

  handleWishlist = i => {
    let wishlistArr = this.state.inWishlist
    if (!wishlistArr.includes(i)) wishlistArr.push(i)
    else wishlistArr.splice(wishlistArr.indexOf(i), 1)
    this.setState({
      inWishlist: wishlistArr
    })
  }
  handleRemoveCart = item => {
    let cart = this.state.inCart.filter(x=>x.PRODNUM !== item.PRODNUM);
    this.setState({inCart: cart});
    if(cart.length === 0){
      this.toggleModalCart();
    }
  }
  clearCart = () => {
    let cart = [];
    this.setState({inCart: cart});
    if(cart.length === 0){
      this.toggleModalCart();
    }
  }
  handleChangeCart = (item,quan) => {
    let cart = this.state.inCart;
    let index = cart.findIndex(x=>x.PRODNUM === item.PRODNUM);
    cart[index]["QUAN"] = quan;
    this.setState({inCart: cart});
  }
  renderCart = cart => {
    let totalPrice = 0;
    let totalVAT = 0;
    let cartDetail = cart.map((item, i) => {
      let product = this.state.allProducts.find(x=>x.ProductNum === item.PRODNUM);
      totalPrice += (item.COSTEACH * item.QUAN);
      totalVAT += ((item.NetCostEach - item.COSTEACH) * item.QUAN);
      return(
        <Card className="ecommerce-card" key={i}>
          <div className="card-content">
            <div className="item-img text-center">
              <img className="img-fluid" src={product.Image} alt="Product" />
            </div>
            <CardBody>
              <div className="item-name"style={{marginTop: "2rem"}}>
                <span>{this.formatLangueProductName(product)}</span>

                <div className="item-quantity">
                  <NumericInput
                    min={1}
                    max={99}
                    value={item.QUAN}
                    mobile
                    style={mobileStyle}
                    strict={true}
                    onChange={(e) => {
                      this.handleChangeCart(item,e)
                    }}
                  />
                </div>

                <p className="offers">{formatVND(item.COSTEACH)}</p>
              </div>
            </CardBody>
            <div className="item-options text-center">
              <div className="wishlist"
              style={{marginTop: "0px"}}
              onClick={()=>{
                this.handleRemoveCart(item);
              }} >
                <span className="align-middle ml-25">Remove</span>
              </div>
              <div className="cart">
                <span className="align-middle ml-25">Note</span>
              </div>
            </div>
          </div>
        </Card>
      )
    })
    return (
      <div className="list-view product-checkout">
            <div className="checkout-items">
              {cartDetail}
            </div>
            <div className="checkout-options">
              <Card>
                <CardBody>
                  <div className="price-details">
                    <p>Price Details</p>
                  </div>
                  <div className="detail">
                    <div className="detail-title">Total Price</div>
                    <div className="detail-amt discount-amt">{formatVND(totalPrice)}</div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">Total (Tax + SVC)</div>
                    <div className="detail-amt">{formatVND(totalVAT)}</div>
                  </div>
                  <hr />
                  <div className="detail">
                    <div className="detail-title detail-total">Total</div>
                    <div className="detail-amt emi-details">{formatVND(totalPrice + totalVAT)}</div>
                  </div>
                </CardBody>
              </Card>
            </div>
            </div>
    )
  }
  formatLangueProductName = (product) => {
    if(product.Tranlations.length === 0){
      return product.ProductName
    }
    let filter = product.Tranlations.find(x=>x.TranslationID === this.state.langue.TranslationID);
    if(typeof filter === 'undefined'){
      return product.ProductName
    }
    return filter.TranslationText
  }
  formatLangueProductDescript = (product) => {
    if(product.Tranlations.length === 0){
      return null
    }
    let filter = product.Tranlations.find(x=>x.TranslationID === this.state.langue.TranslationID);
    if(typeof filter === 'undefined'){
      return null
    }
    return filter.Descript
  }
  formatLangueQuestion = (question) => {
    if(question.Tranlations.length === 0){
      return question.Question
    }
    let filter = question.Tranlations.find(x=>x.TranslationID === this.state.langue.TranslationID);
    if(typeof filter === 'undefined'){
      return question.Question
    }
    return filter.TranslationText
  }
  render() {
    let {products, patient, loading,productSelected} = this.state
    let renderProducts = products.map((product, i) => {
      return (
        <Card className="ecommerce-card" key={i}>
          <div className="card-content">
            <div className="item-img text-center">
              <Link to="/ecommerce/product-detail">
                <img
                  className="img-fluid"
                  src={product.Image}
                  alt={product.ProductName}
                />
              </Link>
            </div>
            <CardBody>
              <div className="item-name">
                  <span>{this.formatLangueProductName(product)}</span>
              </div>
              <div className="item-desc">
                <p className="item-description">{this.formatLangueProductDescript(product)}</p>
              </div>
              <div className="item-desc">
                <p className="item-description">{formatVND(product.PriceA)}</p>
              </div>
              {/* <div className="item-wrapper">
                <div className="product-price">
                  <h6 className="item-price">{formatVND(product.PriceA)}</h6>
                </div>
              </div> */}
            </CardBody>
            <div className="item-options text-center">
            {
              !this.state.inCart.filter(x=>x.PRODNUM === product.ProductNum).length ?
              (
                <div className="wishlist">
                  <NumericInput
                    min={1}
                    max={99}
                    value={product.Quantity}
                    mobile
                    strict={true}
                    style={mobileStyle}
                    onChange={(e) => this.handleQuantity(product.ProductNum,e)}
                  />
              </div>
              ): null
            }

              <div className={"cart " + (this.state.inCart.filter(x=>x.PRODNUM === product.ProductNum).length ? "bg-success" : "")}
               onClick={() => {
                if(this.state.inCart.filter(x=>x.PRODNUM === product.ProductNum).length !== 0){
                  this.toggleModalCart()
                }else{
                  this.handleAddToCart(product)
                }
                }}>
               {
                this.state.inCart.filter(x=>x.ProductNum === product.ProductNum).length ?
                (
                  <Eye size={15} />
                ):
                (
                  <ShoppingCart size={15} />
                )
               }
                <span className="align-middle ml-50">
                  {this.state.inCart.filter(x=>x.PRODNUM === product.ProductNum).length !== 0 ? (
                    "View In Cart"
                  ) : (
                    "Add to cart"
                  )}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )
    })
    return (
      <div className="shop-content">
        <Row>
          <Col sm="12">
            <div className="ecommerce-header-items">
              <div className="result-toggler w-25 d-flex align-items-center">
                <div className="shop-sidebar-toggler d-block d-lg-none">
                  <Menu
                    size={26}
                    onClick={() => this.props.mainSidebar(true)}
                  />
                </div>
                <div className="search-results mt-1">{patient.PatientFullName + " (" + patient.BedName + " )"}</div>
              </div>
              <div className="view-options d-flex justify-content-end w-75">
                <div className="view-btn-option">
                  <Button
                    color="white"
                    className="view-btn"
                    style={{position: "relative !important"}}
                    onClick={()=>{
                      this.toggleModalCart()
                    }}
                  >
                    <ShoppingCart size={24} />
                    {this.state.inCart.length > 0 ? (
                      <Badge pill color="primary" className="badge-up" style={{top: "0rem", right: "8rem"}}>
                        {this.state.inCart.length}
                      </Badge>
                    ) : null}
                  </Button>
                  <Button
                    color="white"
                    className={`view-btn ${
                      this.state.view === "grid-view" ? "active" : ""
                    }`}
                    onClick={() => this.handleView("grid-view")}
                  >
                    <Grid size={24} />
                  </Button>
                  <Button
                    color="white"
                    className={`view-btn ${
                      this.state.view === "list-view" ? "active" : ""
                    }`}
                    onClick={() => this.handleView("list-view")}
                  >
                    <List size={24} />
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          {
            (loading) ?
            (
              <Spinner />
            ) :
            (
              <Col sm="12 mt-1" style={{height: "calc(100vh - 16.35rem)"}}>
                <PerfectScrollbar
                  className="todo-task-list"
                  options={{
                    wheelPropagation: false
                  }}
                >
                  <div id="ecommerce-products " className={this.state.view}>
                  {renderProducts}
                </div>
                </PerfectScrollbar>
              </Col>
            )
          }
          <Modal
          isOpen={this.state.showModalQuestion}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              toggle={this.toggleModal}
              className={"bg-info"}
            >
              Question
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
            { Object.keys(productSelected).length !== 0 ?
            (
              <Row className="mb-5 mt-2">
                <Col
                  className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                  sm="12"
                  md="5"
                >
                  <img src={productSelected.Image} alt="Google Home" height="250" width="250" />
                </Col>
                <Col md="7" sm="12">
                  <h3>{productSelected.ProductName}</h3>
                  <div className="d-flex flex-wrap">
                    <h3 className="text-primary">{formatVND(productSelected.PriceA)}</h3>
                  </div>
                  <hr />
                  {
                    Object.keys(productSelected.dataQuestion1).length !== 0
                    ?
                    (
                      <>
                      <div className="product-categories" >
                        <div className="product-category-title">
                          <h6 className="filter-title mb-1">{this.formatLangueQuestion(productSelected.dataQuestion1)}</h6>
                        </div>
                        <ul className="list-unstyled categories-list" key={productSelected.Question1.OptionIndex}>
                          {
                            (productSelected.dataQuestion1.Forced === 1 && (productSelected.dataQuestion1.NumChoice === 1 || productSelected.dataQuestion1.NumChoice === 0)) ?
                            productSelected.dataQuestion1.forcedChoices.map((val, i) => {

                                return(
                                <li key={i}>
                                  <Radio
                                    label={val.ChoiceProductName}
                                    defaultChecked={false}
                                    name={productSelected.dataQuestion1.OptionIndex}
                                    className="py-25"
                                    value={val.Quantity}
                                    onChange={() => {
                                      productSelected.dataQuestion1.forcedChoices.forEach((el,k)=>{
                                        if(i === k){
                                          productSelected.dataQuestion1.forcedChoices[k]["Quantity"] = 1;
                                        }
                                        else{
                                          productSelected.dataQuestion1.forcedChoices[k]["Quantity"] = 0;
                                        }
                                      })

                                      this.setState({productSelected: productSelected})
                                    }}
                                  />
                                </li>
                                )
                              })
                            :
                            productSelected.dataQuestion1.forcedChoices.map((val, i) => {
                                return(
                                  <div className="item-quantity mb-1"key={val.ChoiceProductNum}>
                                  <p className="quantity-title">{val.ChoiceProductName + " - " + formatVND(val.Price)}</p>
                                  <NumericInput
                                    min={productSelected.dataQuestion1.Forced}
                                    max={productSelected.dataQuestion1.NumChoice}
                                    value={val.Quantity}
                                    mobile
                                    style={mobileStyle}
                                    onChange={(e) => {
                                      productSelected.dataQuestion1.forcedChoices[i]["Quantity"] = e;
                                      console.log(productSelected.dataQuestion1.forcedChoices[i]);
                                      this.setState({productSelected: productSelected})
                                    }}
                                  />
                                </div>
                                )
                              })
                          }

                        </ul>
                      </div>
                    <hr />
                    </>
                    )
                    :
                    null
                  }
                  {
                    Object.keys(productSelected.dataQuestion2).length !== 0
                    ?
                    (
                      <>
                      <div className="product-categories">
                        <div className="product-category-title">
                          <h6 className="filter-title mb-1">{this.formatLangueQuestion(productSelected.dataQuestion2)}</h6>
                        </div>
                        <ul className="list-unstyled categories-list"key={productSelected.Question2.OptionIndex}>
                          {
                            (productSelected.dataQuestion2.Forced === 1 && (productSelected.dataQuestion2.NumChoice === 1 || productSelected.dataQuestion2.NumChoice === 0)) ?
                            productSelected.dataQuestion2.forcedChoices.map((val, i) => {
                                return(
                                <li key={i}>
                                <Radio
                                    label={val.ChoiceProductName}
                                    defaultChecked={false}
                                    name={productSelected.dataQuestion2.OptionIndex}
                                    className="py-25"
                                    value={val.Quantity}
                                    onChange={() => {
                                      productSelected.dataQuestion2.forcedChoices.forEach((el,k)=>{
                                        if(i === k){
                                          productSelected.dataQuestion2.forcedChoices[k]["Quantity"] = 1;
                                        }
                                        else{
                                          productSelected.dataQuestion2.forcedChoices[k]["Quantity"] = 0;
                                        }
                                      })

                                      this.setState({productSelected: productSelected})
                                    }}
                                  />
                                </li>
                                )
                              })
                            :
                            productSelected.dataQuestion2.forcedChoices.map((val, i) => {
                                return(
                                  <div className="item-quantity mb-1" key={val.ChoiceProductNum}>
                                  <p className="quantity-title">{val.ChoiceProductName + " - " + formatVND(val.Price)}</p>
                                  <NumericInput
                                    min={productSelected.dataQuestion2.Forced}
                                    max={productSelected.dataQuestion2.NumChoice}
                                    value={productSelected.dataQuestion2.Forced}
                                    mobile
                                    style={mobileStyle}
                                  />
                                </div>
                                )
                              })
                          }

                        </ul>
                      </div>
                    <hr />
                    </>
                    )
                    :
                    null
                  }
                  {
                    Object.keys(productSelected.dataQuestion3).length !== 0
                    ?
                    (
                      <>
                      <div className="product-categories">
                        <div className="product-category-title">
                          <h6 className="filter-title mb-1">{this.formatLangueQuestion(productSelected.dataQuestion3)}</h6>
                        </div>
                        <ul className="list-unstyled categories-list"key={productSelected.Question3.OptionIndex}>
                          {
                            (productSelected.dataQuestion3.Forced === 1 && (productSelected.dataQuestion3.NumChoice === 1 || productSelected.dataQuestion3.NumChoice === 0)) ?
                            productSelected.dataQuestion3.forcedChoices.map((val, i) => {
                                return(
                                <li key={i}>
                                <Radio
                                    label={val.ChoiceProductName}
                                    defaultChecked={false}
                                    name={productSelected.dataQuestion3.OptionIndex}
                                    className="py-25"
                                    value={val.Quantity}
                                    onChange={() => {
                                      productSelected.dataQuestion3.forcedChoices.forEach((el,k)=>{
                                        if(i === k){
                                          productSelected.dataQuestion3.forcedChoices[k]["Quantity"] = 1;
                                        }
                                        else{
                                          productSelected.dataQuestion3.forcedChoices[k]["Quantity"] = 0;
                                        }
                                      })

                                      this.setState({productSelected: productSelected})
                                    }}
                                  />
                                </li>
                                )
                              })
                            :
                            productSelected.dataQuestion3.forcedChoices.map((val, i) => {
                                return(
                                  <div className="item-quantity mb-1" key={val.ChoiceProductNum}>
                                  <p className="quantity-title">{val.ChoiceProductName + " - " + formatVND(val.Price)}</p>
                                  <NumericInput
                                    min={productSelected.dataQuestion3.Forced}
                                    max={productSelected.dataQuestion3.NumChoice}
                                    value={productSelected.dataQuestion3.Forced}
                                    mobile
                                    style={mobileStyle}
                                  />
                                </div>
                                )
                              })
                          }
                        </ul>
                      </div>
                    <hr />
                    </>
                    )
                    :
                    null
                  }
                  {
                    Object.keys(productSelected.dataQuestion4).length !== 0
                    ?
                    (
                      <>
                      <div className="product-categories">
                        <div className="product-category-title">
                          <h6 className="filter-title mb-1" >{this.formatLangueQuestion(productSelected.dataQuestion4)}</h6>
                        </div>
                        <ul className="list-unstyled categories-list"key={productSelected.Question4.OptionIndex}>
                          {
                            (productSelected.dataQuestion4.Forced === 1 && (productSelected.dataQuestion4.NumChoice === 1 || productSelected.dataQuestion4.NumChoice === 0)) ?
                            productSelected.dataQuestion4.forcedChoices.map((val, i) => {
                                return(
                                <li key={i}>
                                <Radio
                                    label={val.ChoiceProductName}
                                    defaultChecked={false}
                                    name={productSelected.dataQuestion4.OptionIndex}
                                    className="py-25"
                                    value={val.Quantity}
                                    onChange={() => {
                                      productSelected.dataQuestion1.forcedChoices.forEach((el,k)=>{
                                        if(i === k){
                                          productSelected.dataQuestion4.forcedChoices[k]["Quantity"] = 1;
                                        }
                                        else{
                                          productSelected.dataQuestion4.forcedChoices[k]["Quantity"] = 0;
                                        }
                                      })

                                      this.setState({productSelected: productSelected})
                                    }}
                                  />
                                </li>
                                )
                              })
                            :
                            productSelected.dataQuestion4.forcedChoices.map((val, i) => {
                                return(
                                  <div className="item-quantity mb-1" key={val.ChoiceProductNum}>
                                  <p className="quantity-title">{val.ChoiceProductName + " - " + formatVND(val.Price)}</p>
                                  <NumericInput
                                    min={productSelected.dataQuestion4.Forced}
                                    max={productSelected.dataQuestion4.NumChoice}
                                    value={productSelected.dataQuestion4.Forced}
                                    mobile
                                    style={mobileStyle}
                                  />
                                </div>
                                )
                              })
                          }

                        </ul>
                      </div>
                    <hr />
                    </>
                    )
                    :
                    null
                  }
                  {
                    Object.keys(productSelected.dataQuestion5).length !== 0
                    ?
                    (
                      <>
                      <div className="product-categories">
                        <div className="product-category-title">
                          <h6 className="filter-title mb-1">{this.formatLangueQuestion(productSelected.dataQuestion5)}</h6>
                        </div>
                        <ul className="list-unstyled categories-list"key={productSelected.Question1.OptionIndex}>
                          {
                            (productSelected.dataQuestion5.Forced === 1 && (productSelected.dataQuestion5.NumChoice === 1 || productSelected.dataQuestion5.NumChoice === 0)) ?
                            productSelected.dataQuestion5.forcedChoices.map((val, i) => {
                                return(
                                <li key={i}>
                                <Radio
                                    label={val.ChoiceProductName}
                                    defaultChecked={false}
                                    name={productSelected.dataQuestion5.OptionIndex}
                                    className="py-25"
                                    value={val.Quantity}
                                    onChange={() => {
                                      productSelected.dataQuestion1.forcedChoices.forEach((el,k)=>{
                                        if(i === k){
                                          productSelected.dataQuestion5.forcedChoices[k]["Quantity"] = 1;
                                        }
                                        else{
                                          productSelected.dataQuestion5.forcedChoices[k]["Quantity"] = 0;
                                        }
                                      })

                                      this.setState({productSelected: productSelected})
                                    }}
                                  />
                                </li>
                                )
                              })
                            :
                            productSelected.dataQuestion5.forcedChoices.map((val, i) => {
                                return(
                                  <div className="item-quantity mb-1" key={val.ChoiceProductNum}>
                                  <p className="quantity-title">{val.ChoiceProductName + " - " + formatVND(val.Price)}</p>
                                  <NumericInput
                                    min={productSelected.dataQuestion5.Forced}
                                    max={productSelected.dataQuestion5.NumChoice}
                                    value={productSelected.dataQuestion5.Forced}
                                    mobile
                                    style={mobileStyle}
                                  />
                                </div>
                                )
                              })
                          }

                        </ul>
                      </div>
                    <hr />
                    </>
                    )
                    :
                    null
                  }
                </Col>
              </Row>
            ) : null
            }

            </ModalBody>
            <ModalFooter>
              <Button.Ripple className="mr-1" onClick={() => {this.handleAddToCartInQuestion(this.state.productSelected)}} color="primary">
                <ShoppingCart size={15} />
                <span className="align-middle ml-50">ADD TO CART</span>
              </Button.Ripple>{" "}
              <Button.Ripple outline color= "danger" onClick={this.toggleModal}>
                Cancel
              </Button.Ripple>{" "}
            </ModalFooter>
          </Modal>
          <Modal
          isOpen={this.state.showModalCart}
          toggle={this.toggleModalCart}
          className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              toggle={this.toggleModalCart}
              className={"bg-info"}
            >
            Cart
            </ModalHeader>
            <ModalBody className="modal-dialog-centered ecommerce-application">
            {this.renderCart(this.state.inCart)}
            </ModalBody>
            <ModalFooter>
              <Button.Ripple className="mr-1" onClick={async () => {
                await this.props.confirmOrder(this.state.inCart, this.state.patient);
                this.clearCart();
                this.props.showModalAPI(200,true,"Order susscessfully", new Date())
              }} color="primary">
                <span className="align-middle ml-50">Confirm Order</span>
              </Button.Ripple>{" "}
              <Button.Ripple outline color= "danger" onClick={this.toggleModalCart}>
                Cancel
              </Button.Ripple>{" "}
            </ModalFooter>
          </Modal>
        </Row>

      </div>

    )
  }
}

export default MenuContentAlacarte
