import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { html } from "lit";
import { formatDate } from "../../lib/utils";

class StorieCard extends LitWithoutShadowDom {
  static properties = {
    story: { type: String, reflect: true },
    loading: { type: Boolean, reflect: true },
    class: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.class = "story-card col";
  }

  _checkAvailabilityProperty() {
    if (!this.story) {
      throw new Error(`Atribut "story" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  _card() {
    this._checkAvailabilityProperty();
    return html` <a href="/story/detail.html?id=${this.story?.id}" class="box">
      <img src="${this.story?.photoUrl}" alt="${this.story?.name}" class="image" />
      <div class="">
        <h5 class="story-card-name">${this.story?.name}</h5>
        <small class="story-card-created-at">${formatDate(this.story?.createdAt)}</small>
        <p class="story-card-desc">${this.story?.description}</p>
      </div></a
    >`;
  }

  _loadingCard() {
    return html` <div class="box" aria-hidden="true">
      <div class="image"></div>
      <div class="">
        <h5 class="m-0"></h5>
        <div class="w-75 skeleton rounded" style="height: 30px"></div>
        <div class="w-50 skeleton mt-2 rounded" style="height: 15px"></div>
      </div>
    </div>`;
  }

  render() {
    return this.loading ? this._loadingCard() : this._card();
  }
}

customElements.define("storie-card", StorieCard);
