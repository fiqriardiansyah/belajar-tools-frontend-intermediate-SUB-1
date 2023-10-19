import { css, html, LitElement } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class FooterAppp extends LitElement {
  static properties = {
    appName: { type: String, reflect: true },
  };

  static styles = css`
    footer {
      width: 100ww;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 7rem;
      padding-right: 7rem;
    }
    .footer-name {
      opacity: 0.7;
    }
    .footer-year {
      font-weight: 500;
    }
  `;

  constructor() {
    super();
    this._checkAvailabilityProperty();
    updateWhenLocaleChanges(this);
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute("appName")) {
      throw new Error(`Atribut "appName" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`<footer>
      <h1 class="footer-name">${this.appName}</h1>
      <p class="footer-year">©️2023</p>
      <p class="footer-made">${msg("Made with ❤️ by fiqriardiansyah")}</p>
    </footer>`;
  }
}

customElements.define("footer-app", FooterAppp);
