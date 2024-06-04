import html from "html-literal";
import logo from "../assets/img/logo.jpg";

export default state => html`
  <header>
    <span>
      <a href="/"><img class="header-logo" src="${logo}" alt=""/></a>
    </span>
    <span class="header-text">${state.header}</span>
  </header>
`;
