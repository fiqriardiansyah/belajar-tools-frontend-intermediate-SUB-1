import { msg, updateWhenLocaleChanges } from "@lit/localize";
import LitWithoutShadowDom from "./base/lit-without-shadowdom";
import { html } from "lit";
import { NAME, TOKEN } from "../lib/utils";
import CheckUserAuth from "../lib/check-user-auth";
import Cookies from "js-cookie";

class LinkMenu extends LitWithoutShadowDom {
  static properties = {
    userName: { type: String },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.userName = localStorage.getItem(NAME);
  }

  logoutHandler() {
    Cookies.remove(TOKEN);
    localStorage.removeItem(NAME);
    CheckUserAuth.checkLoginState();
  }

  render() {
    if (!CheckUserAuth.isLogin()) {
      return html``;
    }
    return html`
      <div class="dropdown" type="button">
        <a class="text-nowrap" href="#" role="button" data-bs-toggle="dropdown">
          <div class="me-2 d-inline-block">
            <img id="imgUserLogged" style="width: 44px;height: 44px" class="img-fluid rounded-pill bg-secondary" src="https://source.unsplash.com/random/100x100" alt="User Name" />
          </div>
          <span id="nameUserLogged"></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item disabled">${this.userName}</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <dropdown-link content="${msg("Dashboard")}" to="/"></dropdown-link>
          <dropdown-link content="${msg("Create New")}" to="/story/add.html"></dropdown-link>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a @click=${this.logoutHandler} class="dropdown-item text-danger">${msg("Logout")}</a>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define("link-menu", LinkMenu);
