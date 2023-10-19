import { html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { StoryApi } from "../../services/story-api";

class FormAdd extends LitWithoutShadowDom {
  static properties = {
    wasValidated: { type: Boolean, reflect: true },
    loading: { type: Boolean },
    response: { type: Object },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  addStory(data) {
    this.loading = true;
    StoryApi.AddNewStory(data)
      .then((res) => {
        this.response = res;
      })
      .catch((err) => {
        this.response = {
          error: true,
          message: err?.message,
        };
      })
      .finally(() => (this.loading = false));
  }

  onSubmit(e) {
    e.preventDefault();
    this.wasValidated = true;
    const photo = this.querySelector("input-image-with-preview")?.file;
    const description = this.querySelector("#validationCustomDescription").value;
    if (!photo || !description) return;

    this.addStory({ photo, description });
  }

  messageResponse() {
    if (this.response?.error) {
      return html`<div class="alert alert-danger mt-5" role="alert">${this.response?.message}</div>`;
    }

    if (this.response?.error === false) {
      return html`<div class="alert alert-success mt-5" role="alert">${this.response?.message}</div>`;
    }
  }

  render() {
    return html`<form class="row g-3 ${this.wasValidated ? "was-validated" : ""}" id="formAddStory" novalidate @submit=${this.onSubmit}>
      <h1 class="fs-1 m-0 text-secondary">${msg("Create Story")}</h1>
      <h1 class="fs-6 m-0 text-dark fw-normal">${msg("Share to the world that you have a story in your life")}</h1>
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">${msg("Attention 📢")}</h4>
        <p>${msg("You can enter photos that you want to share, but remember! This platform strictly prohibits content containing pornography, sarcasm and vandalism")}</p>
      </div>
      <div class="col-12 col-md-6">
        <label for="validationCustomStory" class="form-label">${msg("Story Photo")}</label>
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
        <label for="validationCustomDescription" class="form-label">${msg("Description")}</label>
        <textarea-with-validation inputId="validationCustomDescription" invalidFeedbackMessage="${msg("Required")}" required name="storyDescription"></textarea-with-validation>

        ${this.messageResponse()}
      </div>

      <div class="col-12 text-end">
        ${!this.loading
          ? html`<button type="submit" class="text-white btn btn-primary w-fit">${msg("Submit")}</button>`
          : html` <button class="btn btn-primary text-white" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">${msg("Loading")}...</span>
            </button>`}
      </div>
    </form>`;
  }
}

customElements.define("form-add", FormAdd);
