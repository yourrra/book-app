import { DivComponent } from "../../common/div-component";
import "./search.css";

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    const value = this.el.querySelector("input").value;
    this.state.searchQuery = value;
  }

  render() {
    this.el.classList.add("search");
    this.el.innerHTML = `
        <div class = 'search__wrapper'>
            <input 
                type='text' 
                placeholder='Найти книгу или автора....'
                class = 'search__input'
                value = '${
                  this.state.searchQuery ? this.state.searchQuery : ""
                }'
            />
            <img src='/src/assets/search.svg' alt='Поиск иконка'/>
        </div>
        <button type = 'submit' aria-label = 'Искать'>
            <img src='/src/assets/search-white.svg' alt='Поиск иконка'/>
        </button>
    `;
    this.el
      .querySelector("button")
      .addEventListener("click", this.search.bind(this));
    this.el.querySelector("input").addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        this.search();
      }
    });
    return this.el;
  }
}
