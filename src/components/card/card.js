import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
    this.addToFavorites = this.#addToFavorites.bind(this);
    this.deleteFromFavorites = this.#deleteFromFavorites.bind(this);
  }

  #addToFavorites() {
    this.appState.favorites.push(this.cardState);
  }

  #deleteFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      (b) => b.key !== this.cardState.key
    );
  }

  #handleCardClick() {
    const inputString = this.cardState.key;
    const regex = /\/works\/(\w+)/;
    const match = inputString.match(regex);
    const bookId = match ? match[1] : "";

    this.appState.selectedBookId = bookId;
  }

  render() {
    const inputString = this.cardState.key;
    const regex = /\/works\/(\w+)/;
    const match = inputString.match(regex);
    const bookKey = match ? match[1] : "";
    this.el.classList.add("card");
    const existInFavorites = this.appState.favorites.find(
      (b) => b.key == this.cardState.key
    );
    this.el.innerHTML = `
    <a class='card__link' href='#works/${bookKey}'>
      <div class='card__image'>
          <img src="https://covers.openlibrary.org/b/olid/${
            this.cardState.cover_edition_key
          }-M.jpg" alt='Обложка'/>
      </div>
      <div class='card__info'>
          <div class='card__tag'>
          ${this.cardState.subject ? this.cardState.subject[0] : "Не задано"}
          </div>
          <div class='card__name'>
              ${this.cardState.title}
          </div>
          <div class='card__author'>
          ${
            this.cardState.author_name
              ? this.cardState.author_name[0]
              : "Не известен"
          }
          </div>
          <div class='card__footer'>
              <button class='button__add ${
                existInFavorites ? "button__active" : ""
              }'>
              ${
                existInFavorites
                  ? ` <img src="/src/assets/favorites.svg" />`
                  : ` <img src="/src/assets/favorites-white.svg" />`
              }
              </button>
          </div>
      </div>
    </a>
    `;
    if (existInFavorites) {
      this.el
        .querySelector("button")
        .addEventListener("click", this.deleteFromFavorites);
    } else {
      this.el
        .querySelector("button")
        .addEventListener("click", this.addToFavorites);
    }
    this.el.querySelector(".card__link").addEventListener("click", () => {
      this.#handleCardClick();
    });
    return this.el;
  }
}

//'/works/OL82563W'
