import { html } from "lit";
import LitWithoutShadowDom from "./base/lit-without-shadowdom";
import { getQueryParam } from "../lib/utils";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class NavApp extends LitWithoutShadowDom {
  static properties = {
    appName: { type: String, reflect: true },
    canSearch: { type: Boolean, reflect: true },
    query: { type: String },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    this.init();
    updateWhenLocaleChanges(this);
  }

  init() {
    const query = getQueryParam("query");
    this.query = query;
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute("appName")) {
      throw new Error(`Atribut "appName" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  onSearch(e) {
    e.preventDefault();
    const query = e.target.search.value;
    window.location.search = "?query=" + query;
  }

  render() {
    return html`
      <header class="sticky-top z-3">
        <nav class="navbar navbar-expand-md navbar-ligth border-bottom border-base sticky-top bg-light">
          <div class="container align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <a href="/" class="navbar-brand text-primary fs-4 fw-bold text-decoration-none">${this.appName}</a>
              ${this.canSearch
                ? html`<form class="d-none h-75 d-sm-flex" role="search" @submit="${this.onSearch}">
                    <input .value=${this.query} name="search" class="form-control me-2" type="search" placeholder="${msg("Search")}" aria-label="Search" />
                    <button class="btn btn-outline-primary" type="submit">${msg("Search")}</button>
                  </form>`
                : ""}
            </div>
            <div class="d-flex align-items-center gap-3">
              <locale-picker></locale-picker>
              <link-menu></link-menu>
            </div>
          </div>
        </nav>
        <header></header>
      </header>
    `;
  }
}

customElements.define("nav-app", NavApp);
