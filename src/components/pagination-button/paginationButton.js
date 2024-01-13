import { DivComponent } from "../../common/div-component";
import "./paginationButton.css";

export class PaginationButton extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  nextPage() {
    this.state.offset = this.state.offset + 9;
  }

  backPage() {
    if (this.state.offset <= 0) {
      return (this.state.offset = 0);
    }
    this.state.offset = this.state.offset - 9;
  }

  render() {
    this.el.classList.add("paginationBtn");
    const limit = this.state.numFound;
    this.el.innerHTML = `
    ${
      limit > 9
        ? ` <button id='arrow-back' type='button' class='paginationBtn__arrow'>
                <img src='/src/assets/arrow_back.svg' alt='Стрелка назад'/>
                <div class='pagination__text'>Предыдущая страница</div>
            </button>
            <button id='arrow-next' type='button' class='paginationBtn__arrow'>
                <div class='pagination__text'>Следующая страница</div>
                <img src='/src/assets/arrow_forward.svg' alt='Стрелка вперед'/>
            </button>`
        : ``
    }
    `;
    if (limit > 9) {
      this.el
        .querySelector("#arrow-back")
        .addEventListener("click", this.backPage.bind(this));
      this.el
        .querySelector("#arrow-next")
        .addEventListener("click", this.nextPage.bind(this));
    }
    return this.el;
  }
}
