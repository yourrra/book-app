import { BookPage } from "./views/book-page/bookPage";
import { FavoritesView } from "./views/favorites/favorites";
import { MainView } from "./views/main/main";

class App {
  routes = [
    { path: "", view: MainView },
    { path: "#favorites", view: FavoritesView },
    { path: /#works\/(\w+)/, view: BookPage },
  ];

  appState = {
    favorites: [],
    selectedBookId: null,
  };

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }

    const hash = location.hash;

    const route = this.routes.find((r) => {
      if (typeof r.path === "string") {
        return r.path === hash;
      } else if (r.path instanceof RegExp) {
        const match = hash.match(r.path);
        if (match) {
          const id = match[1];
          return { view: r.view, id };
        }
      }
      return false;
    });

    if (route) {
      const { view, id } = route;
      this.currentView = new view(this.appState, id);
      this.currentView.render();
    } else {
      console.error("Маршрут не найден");
    }
  }
}

new App();
