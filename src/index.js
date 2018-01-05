import helpers from "./helpers/helpers";
import $ from "jquery";
import Survey from "survey-jquery";
import "bootstrap-css-only";
// import "babel-polyfill";
// import "babel/external-helpers";
// import "./css/style.css"

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

$.ajaxSetup({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
/**
 * An awesome script
 */
export default class {
  constructor({ currentState, schema, mac, ip, redir }) {
    this.schema = schema;
    this.currentState = currentState;
    this.mac = mac;
    this.ip = ip;
    this.redir = redir;
  }
  setup() {
    this.survey = new Survey.Model(this.schema);
    $("#surveyContainer").Survey({
      model: this.survey,
      onComplete: this.onComplete
    });
  }
  onComplete = survey => {
    // post data to /form/completed/state
    const data = Object.assign(
      {},
      {
        mac: this.mac,
        ip: this.ip,
        redir: this.redir
      },
      survey.data
    );
    const postData = JSON.stringify(data);
    $.post("/s/form/completed/" + this.currentState, postData).done(res => {
      if (res.msg && res.msg == "success") {
        window.location.replace("/");
        return;
      }
      console.log(res);
    });
  };
}
