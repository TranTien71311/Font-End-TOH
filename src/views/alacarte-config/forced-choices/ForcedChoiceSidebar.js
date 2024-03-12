import React, { Component } from "react"
import { Label, Input, FormGroup, Button,Spinner } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"


class ForcedChoiceSidebar extends Component {
  state = {
    UniqueID: 0,
    translations: [],
    translationForcedChoices: [],
    choiProductName: ""
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
            OptionIndex: this.props.data.OptionIndex,
            TranslationText: this.props.data.Translations[index].TranslationText
          })
        }else{
          result.push({
            TranslationID: element.TranslationID,
            TranslationType: 0,
            TranslationName: element.TranslationName,
            UniqueID: this.props.data.UniqueID,
            TranslationText: ""
          })
        }
      });
      this.setState({ translations: this.props.translations, translationForcedChoices: result, UniqueID: this.props.data.UniqueID, choiProductName: this.props.data.ChoiceProductName});
    }
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if(!this.props.loadingUpdate){
        this.props.editData(obj);
      }
    }
  }

  render() {
    let { show, data, handleSidebar, loadingUpdate } = this.props
    let { translationForcedChoices, choiProductName} = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>UPDATE {choiProductName}</h4>
          <X size={20} onClick={() =>handleSidebar(false)}/>
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          {translationForcedChoices.map((translation, i) => (
            <FormGroup key={translation.TranslationID}>
              <Label for="data-name">{translation.TranslationName}</Label>
              <Input
                type="text"
                value={translation.TranslationText}
                placeholder={translation.TranslationName}
                onChange={e => {
                  translation.TranslationText = e.target.value;
                  translationForcedChoices[i]["TranslationText"] = translation.TranslationText;
                  this.setState({ translationForcedChoices: translationForcedChoices })
                  }
                }
              />

            </FormGroup>
          ))}

        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={
            () => {
              let listTranslation = [];
              this.state.translationForcedChoices.forEach(el => {
                if(el.TranslationText !== "" && el.TranslationText !== null){
                  listTranslation.push(el);
                }
              })
              let dataUpdate = {
                UniqueID: this.state.UniqueID,
                Translations: listTranslation
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
export default ForcedChoiceSidebar
