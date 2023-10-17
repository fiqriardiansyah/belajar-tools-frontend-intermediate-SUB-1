import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { html } from "lit";
import { msg, str, updateWhenLocaleChanges } from "@lit/localize";
import { formatDate, getQueryParam, getStories } from "../../utils";

class UserDetail extends LitWithoutShadowDom {
  static properties = {
    loading: { type: Boolean, reflect: true },
    story: { type: Object },
  };

  constructor() {
    super();
    this.init();
  }

  async init() {
    this.loading = true;
    const name = getQueryParam("name");
    const listStory = await getStories();
    this.loading = false;
    this.story = listStory.find((str) => str.name.includes(name));
    this.stories = listStory.filter((str) => str.name.includes(name));

    this.story = {
      ...this.story,
      imageProfile: "https://source.unsplash.com/random/?profile",
      stories: this.stories,
    };
  }

  renderStory() {
    return html`
      <div class="mt-5"></div>
      <div class="user-profile">
        <img
          src=${this.story?.imageProfile}
          alt=${this.story?.name}
          class="user-profile-image"
        />
        <p class="user-profile-name">${this.story?.name}</p>
      </div>
      <p class="fs-3 text-dark mt-5 mb-3">
        ${msg(str`${this.story?.name} Stories`)}
      </p>
      <div class="stories-container">
        ${this.story?.stories?.map((story) => {
          return html` <storie-card .story=${story}></storie-card>`;
        })}
      </div>
    `;
  }

  renderLoadingStory() {
    return html` <div class="row py-5" aria-hidden="true">
      <div class="col-12 col-sm-7">
        <div
          class="bg-base w-100 rounded"
          style="height: 80vh;object-fit: cover"
        ></div>
      </div>
      <div class="col-12 d-flex flex-column col-sm-5 gap-2 mt-3">
        <div class="w-50 rounded bg-base" style="height: 40px"></div>
        <div class="w-25 rounded bg-base" style="height: 10px"></div>
        <div class="w-100 rounded bg-base" style="height: 20px"></div>
        <div class="w-75 rounded bg-base" style="height: 20px"></div>
      </div>
    </div>`;
  }

  render() {
    return this.loading ? this.renderLoadingStory() : this.renderStory();
  }
}

customElements.define("user-detail", UserDetail);
