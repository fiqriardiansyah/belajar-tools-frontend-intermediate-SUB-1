import { html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";

class FormAdd extends LitWithoutShadowDom {
  static properties = {
    wasValidated: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.wasValidated = true;
    const photo = this.querySelector("input-image-with-preview")?.imageBase64;
    const description = this.querySelector(
      "#validationCustomDescription"
    ).value;
    if (!photo || !description) return;
    //add story
  }

  render() {
    return html`<form
      class="row g-3 ${this.wasValidated ? "was-validated" : ""}"
      id="formAddStory"
      novalidate
      @submit=${this.onSubmit}
    >
      <h1 class="fs-1 m-0 text-secondary">${msg("Create Story")}</h1>
      <h1 class="fs-6 m-0 text-dark fw-normal">
        ${msg("Share to the world that you have a story in your life")}
      </h1>
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">${msg("Perhatian 📢")}</h4>
        <p>
          ${msg(
            "You can enter photos that you want to share, but remember! This platform strictly prohibits content containing pornography, sarcasm and vandalism"
          )}
        </p>
      </div>
      <div class="col-12 col-md-6">
        <label for="validationCustomStory" class="form-label"
          >${msg("Story Photo")}</label
        >
        <input-image-with-preview
          inputId="validationCustomStory"
          invalidFeedbackMessage="${msg("Pick Photo")}"
          formId="formAddStory"
          required
          wasValidated=${this.wasValidated}
          name="storyImage"
        ></input-image-with-preview>
      </div>

      <div class="col-12 col-md-6">
        <label for="validationCustomDescription" class="form-label"
          >${msg("Description")}</label
        >
        <textarea-with-validation
          inputId="validationCustomDescription"
          invalidFeedbackMessage="${msg("Required")}"
          required
          name="storyDescription"
        ></textarea-with-validation>
      </div>

      <div class="col-12 text-end">
        <button class="btn btn-primary" type="submit">${msg("Submit")}</button>
      </div>
    </form>`;
  }
}

customElements.define("form-add", FormAdd);
