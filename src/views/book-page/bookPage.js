import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";

export class BookPage extends AbstractView {
  bookState = {
    data: {},
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  async appStateHook(path) {
    if (path === "selectedBookId") {
      const data = await this.loadList(this.appState.selectedBookId);
      this.bookState.data = data;
      console.log(data);
      this.render();
    }
  }

  async loadList(bookId) {
    console.log("Before fetch");
    try {
      const res = await fetch(`https://openlibrary.org/works/${bookId}/`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("After fetch");
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  render() {
    const bookPage = document.createElement("div");
    this.app.innerHTML = `<div>${this.appState.selectedBookId}</div>
    <div>Title: ${this.bookState.data.title}</div>
    <button id="manualRequestButton">Выполнить запрос</button>`;
    this.app.append(bookPage);
    this.renderHeader();

    const manualRequestButton = this.app.querySelector("#manualRequestButton");
    manualRequestButton.addEventListener(
      "click",
      this.manualRequest.bind(this)
    );
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }

  async manualRequest() {
    const data = await this.loadList(this.appState.selectedBookId);
    this.bookState.data = data;
    console.log(data);
    this.render();
  }
}
