import { html } from "lit";
import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { getQueryParam } from "../../lib/utils";
import { StoryApi } from "../../services/story-api";

class StoriesHome extends LitWithoutShadowDom {
  static properties = {
    loading: { type: Boolean, reflect: true },
    response: { type: Object, reflect: true },
    listStory: { type: Array },
  };

  constructor() {
    super();
    this.init();
  }

  async getAllStories() {
    StoryApi.GetAllStories()
      .then((res) => {
        const listStory = res?.listStory;

        const query = getQueryParam("query");
        this.listStory = query
          ? listStory?.filter(
              (story) => story.name.toLocaleLowerCase().includes(query?.toLocaleLowerCase()) || story.description.toLocaleLowerCase().includes(query?.toLocaleLowerCase())
            )
          : listStory;
      })
      .catch((err) => {
        this.response = {
          error: true,
          message: err.message,
        };
      })
      .finally(() => (this.loading = false));
  }

  async init() {
    this.loading = true;
    this.response = null;

    this.getAllStories();
  }

  messageResponse() {
    if (this.response?.error) {
      return html`<div class="alert alert-danger mt-5" role="alert">${this.response?.message}</div>`;
    }
  }

  renderStories() {
    return this.listStory?.map((story) => {
      return html` <storie-card .story=${story}></storie-card>`;
    });
  }

  renderLoadingStories() {
    return [...new Array(5)].map(() => {
      return html` <storie-card .loading=${true}></storie-card>`;
    });
  }

  render() {
    return html`<div class="stories-container pb-5">${this.messageResponse()} ${this.loading ? this.renderLoadingStories() : this.renderStories()}</div>`;
  }
}

customElements.define("stories-home", StoriesHome);
