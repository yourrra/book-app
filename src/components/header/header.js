import { DivComponent } from "../../common/div-component";
import "./header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add("header");
    this.el.innerHTML = `
        <div>
            <img src='/src/assets/logo.svg' alt='Логотип' />
        </div>
        <nav class = 'menu'>
          <a class='menu__item' href='#'>
            <img src='/src/assets/search.svg' alt='Поиск иконка' />
            Поиск книг
          </a>
          <a class='menu__item' href='#favorites'>
            <img src='/src/assets/favorites.svg' alt='Избранное иконка' />
            Избранное
            <div class='menu__counter'>
                ${this.appState.favorites.length}
            </div>
          </a>
        </nav>
    `;
    return this.el;
  }
}
