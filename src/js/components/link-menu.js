import { msg, updateWhenLocaleChanges } from "@lit/localize";
import LitWithoutShadowDom from "./base/lit-without-shadowdom";
import { html } from "lit";

class LinkMenu extends LitWithoutShadowDom {
  constructor() {
    super();
    this.classList.add("d-md-none");
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div
        class="navbar-toggler dropdown"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <a
          class="nav-link dropdown-toggle text-nowrap"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
          <div class="me-2 d-inline-block">
            <img
              id="imgUserLogged"
              style="width: 44px;height: 44px"
              class="img-fluid rounded-pill bg-secondary"
              src="https://source.unsplash.com/random/100x100"
              alt="User Name"
            />
          </div>
          <span id="nameUserLogged"></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <dropdown-link content="${msg("Dashboard")}" to="/"></dropdown-link>
          <dropdown-link
            content="${msg("Create New")}"
            to="/story/add.html"
          ></dropdown-link>
        </ul>
      </div>
    `;
  }
}

customElements.define("link-menu", LinkMenu);
