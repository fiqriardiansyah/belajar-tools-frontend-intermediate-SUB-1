import { html, nothing } from "lit";
import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";

class InputWithValidation extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    name: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    fixedType: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
    minlength: { type: Number, reflect: true },
  };

  constructor() {
    super();
    this.required = false;
  }

  passwordToggleClick() {
    this.type = this.type === "password" ? "text" : "password";
  }

  render() {
    return html`
      <div class="d-flex align-items-start gap-3">
        <div class=" w-100">
          <input
            id=${this.inputId || nothing}
            class="form-control w-100"
            name=${this.name}
            minlength="${this.minlength || 0}"
            type=${this.type}
            ?disabled=${this.disabled}
            value=${this.value || nothing}
            ?required=${this.required}
            @input=${(e) => (this.value = e.target.value)}
          />
          ${this._invalidFeedbackTemplate()}
        </div>
        ${this.fixedType === "password"
          ? html`<button @click=${this.passwordToggleClick} type="button" class="text-white z-3 btn btn-primary">
              ${this.type === "password" ? html`<i class="bi bi-eye-slash"></i>` : html`<i class="bi bi-eye"></i>`}
            </button>`
          : html``}
      </div>
    `;
  }

  _invalidFeedbackTemplate() {
    if (this.minlength) {
      return html`<div class="invalid-feedback">min ${this.minlength} character</div>`;
    }
    return html` <div class="invalid-feedback">${this.invalidFeedbackMessage}</div> `;
  }
}

customElements.define("input-with-validation", InputWithValidation);
