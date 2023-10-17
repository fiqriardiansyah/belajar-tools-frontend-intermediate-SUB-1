import { html, nothing } from "lit";
import LitWithoutShadowDom from "../base/lit-without-shadowdom";

class InputImageWithPreview extends LitWithoutShadowDom {
  static properties = {
    inputId: { type: String, reflect: true },
    name: { type: String, reflect: true },
    defaultImage: { type: String, reflect: true },
    defaultImageAlt: { type: String, reflect: true },

    invalidFeedbackMessage: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
    class: { type: Boolean, reflect: true },
    imageBase64: { type: String, reflect: true },
    wasValidated: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.type = "text";
    this.defaultImage = "";
    this.defaultImageAlt = "";
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute("name")) {
      throw new Error(
        `Atribut "name" harus diterapkan pada elemen ${this.localName}`
      );
    }
  }

  render() {
    return html`
      <div
        class="input-image-with-preview ${this.class} ${this.wasValidated &&
        !this.imageBase64
          ? "error"
          : ""}"
        @click=${this._pickPhoto}
      >
        <i
          class="bi bi-image icon-image ${this.imageBase64 ? "d-none" : ""}"
        ></i>
        <img
          class="image"
          src="${this.imageBase64}"
          class="${this.imageBase64 ? "w-100 h-100 rounded" : ""}"
          style="object-fit: cover"
        />
        <input
          type="file"
          name=${this.name}
          id=${this.inputId || nothing}
          accept="image/*"
          @change=${this._updatePhotoPreview}
        />
      </div>
      ${this._feedbackTemplate()}
    `;
  }

  _pickPhoto() {
    const input = document.querySelector(".input-image-with-preview input");
    input.click();
  }

  _updatePhotoPreview(e) {
    const file = e.target?.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const base64str = event.target.result;
      this.imageBase64 = base64str;
    };
  }

  _feedbackTemplate() {
    if (!this.required || this.imageBase64) return;

    let invalidFeedbackTemplate = "";

    if (this.invalidFeedbackMessage) {
      invalidFeedbackTemplate = html`
        <div
          class="invalid-feedback"
          style="display: ${this.wasValidated ? "block" : "none"}"
        >
          ${this.invalidFeedbackMessage}
        </div>
      `;
    }

    return html`${invalidFeedbackTemplate}`;
  }
}

customElements.define("input-image-with-preview", InputImageWithPreview);
