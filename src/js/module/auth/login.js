import { html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { StoryApi } from "../../services/story-api";
import { MIN_CHAR_PASSWORD, NAME, TOKEN } from "../../lib/utils";
import Cookies from "js-cookie";

class LoginForm extends LitWithoutShadowDom {
  static properties = {
    class: { type: String, reflect: true },
    loading: { type: Boolean },
    response: { type: Object, reflect: true },
  };

  constructor() {
    super();
    this.loading = false;
    this.class = "row g-3";
    updateWhenLocaleChanges(this);
  }

  loginHandler(dataLogin) {
    StoryApi.Login(dataLogin)
      .then((res) => {
        this.response = {
          ...res,
          message: "Wellcome " + res?.loginResult?.name,
        };
        Cookies.set(TOKEN, res?.loginResult?.token);
        localStorage.setItem(NAME, res?.loginResult?.name);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .catch((err) => {
        this.response = {
          message: err?.message,
          error: true,
        };
      })
      .finally(() => (this.loading = false));
  }

  onSubmit(e) {
    e.preventDefault();
    this.class = this.class + " was-validated";

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password || password?.length < MIN_CHAR_PASSWORD) return;

    this.response = null;
    this.loading = true;
    this.loginHandler({ email, password });
  }

  messageResponse() {
    if (this.response?.error) {
      return html`<div class="alert alert-danger mt-5" role="alert">${this.response?.message}</div>`;
    }

    if (this.response?.error === false) {
      return html`<div class="alert alert-success mt-5" role="alert">${this.response?.message}</div>`;
    }
  }

  render() {
    return html`
      <form novalidate @submit=${this.onSubmit} class="${this.class}" style="width: 350px;">
        <div class="col-12">
          <label for="validationemail" class="form-label">Email</label>
          <input-with-validation type="email" name="email" inputId="validationemail" invalidFeedbackMessage="${msg("Wajib diisi")}" required></input-with-validation>
        </div>
        <div class="col-12">
          <label for="validationpassword" class="form-label">Password</label>
          <input-with-validation
            type="password"
            name="password"
            fixedType="password"
            minlength="${MIN_CHAR_PASSWORD}"
            inputId="validationpassword"
            invalidFeedbackMessage="${msg("Wajib diisi")}"
            required
          ></input-with-validation>
        </div>
        ${!this.loading
          ? html`<button type="submit" class="text-white btn btn-primary w-fit">${msg("Login")}</button>`
          : html` <button class="btn btn-primary text-white" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">${msg("Loading")}...</span>
            </button>`}
        ${this.messageResponse()}
        <p>
          ${msg("Dont have an account?")}
          <a href="/auth/register.html">${msg("Sign up here!")}</a>
        </p>
      </form>
    `;
  }
}

customElements.define("login-form", LoginForm);
