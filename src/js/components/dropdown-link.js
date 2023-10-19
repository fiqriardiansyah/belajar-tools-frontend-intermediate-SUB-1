import { html } from "lit";
import LitWithoutShadowDom from "./base/lit-without-shadowdom";

class DropdownLink extends LitWithoutShadowDom {
  static properties = {
    content: { type: String, reflect: true },
    to: { type: String, reflect: true },
  };

  constructor() {
    super();
  }

  render() {
    return html` <a href="${this.to}" class="dropdown-item flex align-items-center"> ${this.content} </a> `;
  }
}

customElements.define("dropdown-link", DropdownLink);
