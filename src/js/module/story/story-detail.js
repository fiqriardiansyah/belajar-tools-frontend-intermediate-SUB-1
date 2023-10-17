import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import { formatDate, getQueryParam, getStories } from "../../utils";

class StoryDetail extends LitWithoutShadowDom {
  static properties = {
    loading: { type: Boolean, reflect: true },
    story: { type: Object },
  };

  constructor() {
    super();
    this.init();
    updateWhenLocaleChanges(this);
  }

  async init() {
    this.loading = true;
    const id = getQueryParam("id");
    const listStory = await getStories();
    this.loading = false;
    this.story = listStory.find((str) => str.id === id);
  }

  renderStory() {
    return html`<div class="story-detail pb-5 gap-2">
        <div class="col-12 col-sm-7">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalDetail"
          >
            <img
              class="story-detail-image"
              alt="${this.story?.name}"
              src="${this.story?.photoUrl}"
            />
          </button>
        </div>
        <div class="col-12 col-sm-5 mt-3 px-2">
          <h1 class="story-detail-name">🎉 ${this.story?.name} 🎉</h1>
          <p class="story-detail-created-at">
            ${formatDate(this.story?.createdAt)}
          </p>
          <p class="story-detail-desc">${this.story?.description}</p>
          <action-story></action-story>
          <a
            href="/user/detail.html?name=${this.story.name}"
            class="btn btn-primary"
          >
            ${msg("About me")}
          </a>
        </div>
      </div>
      <div
        class="modal fade "
        id="modalDetail"
        tabindex="-1"
        aria-labelledby="modal-image-story"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modal-image-story">
                ${this.story?.name}
              </h1>
            </div>
            <div class="modal-body">
              <img
                class="story-detail-image"
                alt="${this.story?.name}"
                src="${this.story?.photoUrl}"
              />
            </div>
          </div>
        </div>
      </div>`;
  }

  renderLoadingStory() {
    return html` <div class="row pb-5" aria-hidden="true">
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

customElements.define("story-detail", StoryDetail);
