import LitWithoutShadowDom from "../../components/base/lit-without-shadowdom";
import { html } from "lit";
import { getQueryParam, getStories } from "../../utils";

class StoriesHome extends LitWithoutShadowDom {
  static properties = {
    loading: { type: Boolean, reflect: true },
    listStory: { type: Array },
  };

  constructor() {
    super();
    this.init();
  }

  async init() {
    this.loading = true;
    const listStory = await getStories();
    const query = getQueryParam("query");
    this.loading = false;
    this.listStory = query
      ? listStory?.filter(
          (story) =>
            story.name
              .toLocaleLowerCase()
              .includes(query?.toLocaleLowerCase()) ||
            story.description
              .toLocaleLowerCase()
              .includes(query?.toLocaleLowerCase())
        )
      : listStory;
  }

  renderStories() {
    return this.listStory?.map((story) => {
      return html` <storie-card .story=${story}></storie-card>`;
    });
  }

  renderLoadingStories() {
    return [...new Array(5)].map((_, i) => {
      return html` <storie-card .loading=${true}></storie-card>`;
    });
  }

  render() {
    return html`<div class="stories-container pb-5">
      ${this.loading ? this.renderLoadingStories() : this.renderStories()}
    </div>`;
  }
}

customElements.define("stories-home", StoriesHome);
