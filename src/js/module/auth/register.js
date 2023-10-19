import { html } from "lit";
import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { StoryApi } from "../../services/story-api";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import { MIN_CHAR_PASSWORD } from "../../lib/utils";

class RegisterForm extends LitWithoutShadowDom {
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

  registerHandler(dataRegister) {
    StoryApi.Register(dataRegister)
      .then((res) => {
        this.response = res;
        setTimeout(() => {
          window.location.href = "/auth/login.html";
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

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password || password?.length < MIN_CHAR_PASSWORD) return;

    this.response = null;
    this.loading = true;
    this.registerHandler({ name, email, password });
  }

  errorMessage() {
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
          <label for="validationname" class="form-label">Nama</label>
          <input-with-validation name="name" type="text" inputId="validationname" invalidFeedbackMessage="${msg("Wajib diisi")}" required></input-with-validation>
        </div>
        <div class="col-12">
          <label for="validationemail" class="form-label">Email</label>
          <input-with-validation type="email" name="email" inputId="validationemail" invalidFeedbackMessage="${msg("Wajib diisi")}" required></input-with-validation>
        </div>
        <div class="col-12">
          <label for="validationpassword" class="form-label">Password</label>
          <input-with-validation
            type="password"
            name="password"
            minlength="${MIN_CHAR_PASSWORD}"
            fixedType="password"
            inputId="validationpassword"
            invalidFeedbackMessage="${msg("Wajib diisi")}"
            required
          ></input-with-validation>
        </div>
        ${!this.loading
          ? html`<button type="submit" class="text-white btn btn-primary w-fit">${msg("Register")}</button>`
          : html` <button class="btn btn-primary text-white" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">${msg("Loading")}...</span>
            </button>`}
        ${this.errorMessage()}
        <p>
          ${msg("Already have an account?")}
          <a href="/auth/login.html">${msg("Login here!")}</a>
        </p>
      </form>
    `;
  }
}

customElements.define("register-form", RegisterForm);
