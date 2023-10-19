import { css, html, LitElement } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class ActionStory extends LitElement {
  //just for fun component
  static properties = {
    class: { type: String, reflect: true },
    like: { type: Number, reflect: true },
    hello: { type: Number, reflect: true },
    adios: { type: Number, reflect: true },
  };

  constructor() {
    super();
    this.like = Math.round(Math.random() * 100);
    this.hello = Math.round(Math.random() * 100);
    this.adios = Math.round(Math.random() * 100);
    updateWhenLocaleChanges(this);
  }

  static styles = css`
    .action-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    .action-item {
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .action-icon {
      font-size: 2rem;
      margin-right: 0.5rem;
    }
    .action-total {
      font-size: 1.2rem;
    }
  `;

  onClickLike() {
    this.like = this.like + 1;
  }

  onClickHello() {
    this.hello = this.hello + 1;
  }

  onClickAdios() {
    this.adios = this.adios + 1;
  }

  render() {
    return html`
      <div class="action-container">
        <button @click=${this.onClickLike} class="action-item" title="${msg("Like")}">
          <span class="action-icon">❤️</span>
          <span class="action-total">${this.like}</span>
        </button>
        <button @click=${this.onClickHello} class="action-item" title="${msg("Hello")}">
          <span class="action-icon">👋</span>
          <span class="action-total">${this.hello}</span>
        </button>
        <button @click=${this.onClickAdios} class="action-item" title="${msg("Adios")}">
          <span class="action-icon">🤌</span>
          <span class="action-total">${this.adios}</span>
        </button>
      </div>
    `;
  }
}

customElements.define("action-story", ActionStory);
