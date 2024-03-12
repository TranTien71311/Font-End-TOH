import React, { Component } from "react"
import { Label, Input, FormGroup, Button,Spinner } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"


class ReportCategoriesSidebar extends Component {
  state = {
    ReportNo: 0,
    translations: [],
    translationReportCats: [],
    reportCat: "",
    img: "",
    index: 1,
    base64Img: ""
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.data !== null && prevProps.data === null)
    || (this.props.data !== null && prevState !== null && this.props.data.TranslationID !== prevState.TranslationID)
    ) {
      let result = [];
      this.props.translations.forEach(element => {
        let index = this.props.data.Translations.findIndex(x=>x.TranslationID === element.TranslationID);
        if(index !== -1){
          result.push({
            TranslationID: element.TranslationID,
            TranslationType: 0,
            TranslationName: element.TranslationName,
            ReportNo: this.props.data.ReportNo,
            TranslationText: this.props.data.Tranlations[index].TranslationText
          })
        }else{
          result.push({
            TranslationID: element.TranslationID,
            TranslationType: 0,
            TranslationName: element.TranslationName,
            ReportNo: this.props.data.ReportNo,
            TranslationText: ""
          })
        }
      });
      this.setState(
        {
          translations: this.props.translations,
          translationReportCats: result, ReportNo: this.props.data.ReportNo,
          reportCat: this.props.data.ReportName,
          img: ("https://localhost:44351" + this.props.data.Image),
          index: this.props.data.Index
        }
      );
    }
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if(!this.props.loadingUpdate){
        this.props.editData(obj);
      }
    }
  }

  getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;

        this.setState({base64Img: baseURL.replace("data:image/jpeg;base64,","")})
        resolve(baseURL);
      };
    });
  };

  render() {
    let { show, data, handleSidebar, loadingUpdate } = this.props
    let { translationReportCats, reportCat, img, index} = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>UPDATE {reportCat}</h4>
          <X size={20} onClick={() =>handleSidebar(false)}/>
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          <FormGroup className="text-center">
              <img className="img-fluid" src={img} alt={reportCat} />
              <div className="d-flex flex-wrap justify-content-between mt-2">
                <label
                  className="btn btn-flat-primary"
                  htmlFor="update-image"
                  color="primary">
                  Upload Image
                  <input
                    type="file"
                    id="update-image"
                    hidden
                    onChange={e =>{
                        this.getBase64(e.target.files[0]);
                        this.setState({
                          img: (URL.createObjectURL(e.target.files[0]))
                        })
                      }
                    }
                    value=""
                  />
                </label>
                <Button
                  color="flat-danger"
                  onClick={() => this.setState({ img: "" })}>
                  Remove Image
                </Button>
              </div>
            </FormGroup>
          {translationReportCats.map((translation, i) => (
            <FormGroup key={translation.TranslationID}>
              <Label for="data-name">{translation.TranslationName}</Label>
              <Input
                type="text"
                value={translation.TranslationText}
                placeholder={translation.TranslationName}
                onChange={e => {
                  translation.TranslationText = e.target.value;
                  translationReportCats[i]["TranslationText"] = translation.TranslationText;
                  this.setState({ translationReportCats: translationReportCats})
                  }
                }
              />

            </FormGroup>
          ))}
          <FormGroup key="timeOrder">
              <Label for="data-name">Index</Label>
              <Input
                type="text"
                value={index}
                placeholder="1"
                onChange={e => {
                  this.setState({ index: e.target.value})
                  }
                }
              />

          </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={
            () => {
              let listTranslation = [];
              this.state.translationReportCats.forEach(el => {
                if(el.TranslationText !== "" && el.TranslationText !== null){
                  listTranslation.push(el);
                }
              })
              let dataUpdate = {
                ReportNo: this.state.ReportNo,
                Translations: listTranslation,
                Index: this.state.index,
                Image: this.state.base64Img
              }
              this.handleSubmit(dataUpdate)
              }
          }>
            {loadingUpdate ?<Spinner color="white" size="sm" type="grow" /> : ""}
            {data !== null ? " Update" : "Create"}
          </Button>
          <Button
            onClick={() => handleSidebar(false)}
            className="ml-1"
            color="danger"
            outline>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}
export default ReportCategoriesSidebar
