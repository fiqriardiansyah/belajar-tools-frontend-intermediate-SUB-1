import { html } from "lit";
import { allLocales } from "../../generated/locale-codes.js";
import {
  getLocale,
  localeNames,
  setLocaleFromUrl,
} from "../../../localization.js";
import LitWithoutShadowDom from "./base/lit-without-shadowdom.js";
import { getQueryParam } from "../utils.js";

class LocalePicker extends LitWithoutShadowDom {
  static properties = {
    currLocale: { type: String },
  };

  constructor() {
    super();
    this.currLocale = getQueryParam("lang") || getLocale();

    setLocaleFromUrl();
  }

  render() {
    return html`
      <select
        class="form-select"
        aria-label="Default select example"
        id="locale-picker-select"
        @change=${this._localeChanged}
      >
        ${allLocales.map((locale) => {
          return html`
            <option value=${locale} ?selected=${locale === this.currLocale}>
              ${localeNames[locale]}
            </option>
          `;
        })}
      </select>
    `;
  }

  _localeChanged(event) {
    const newLocale = event.target.value;

    if (newLocale !== this.currLocale) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLocale);

      window.history.pushState(null, "", url.toString());
      setLocaleFromUrl();
    }
  }
}

customElements.define("locale-picker", LocalePicker);
