import { html } from "lit";
import LitWithoutShadowDom from "./base/lit-without-shadowdom";

class NavLink extends LitWithoutShadowDom {
  static properties = {
    content: { type: String, reflect: true },
    to: { type: String, reflect: true },
    class: { type: String, reflect: true },
    currentPath: { type: String },
  };

  constructor() {
    super();
    this.currentPath = window.location.pathname;
  }

  render() {
    return html`
      <li class="nav-item">
        <a href="${this.to}" class="nav-link ${this.class} ${this.currentPath === this.to ? "active" : ""}"> ${this.content} </a>
      </li>
    `;
  }
}

customElements.define("nav-link", NavLink);
