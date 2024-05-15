import { header, nav, main, footer } from "./components";

function render() {
  document.querySelector("#root").innerHTML = `
      ${header()}
      ${nav()}
      ${main()}
      ${footer()}
    `;
  afterRender();
}

function afterRender() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

render();
