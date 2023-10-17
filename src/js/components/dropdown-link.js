import { html } from "lit";
import LitWithoutShadowDom from "./base/lit-without-shadowdom";

class DropdownLink extends LitWithoutShadowDom {
  static properties = {
    content: { type: String, reflect: true },
    to: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute("to") || !this.hasAttribute("content")) {
      throw new Error(
        `Atribut "to" dan "content" harus diterapkan pada elemen ${this.localName}`
      );
    }
  }

  render() {
    return html`
      <a href="${this.to}" class="dropdown-item flex align-items-center">
        ${this.content}
      </a>
    `;
  }
}

customElements.define("dropdown-link", DropdownLink);
