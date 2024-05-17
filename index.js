import Navigo from "navigo";
import { camelCase } from "lodash";

import { header, nav, main, footer } from "./components";
import * as store from "./store/index.js";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;
  router.updatePageLinks();

  afterRender();
}

function afterRender() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

router
  .on({
    "/": () => render(store.home),
    ":view": ({ data, params }) => {
      const view = data?.view ? camelCase(data.view) : "home";
      if (view in store) { // store[view]
        render(store[view]);
      } else {
        console.log(`View ${view} not defined`);
        render(store.viewNotFound);
      }
    },
  })
  .notFound(() => render(store.viewNotFound))
  .resolve();

