import html from "html-literal";

export default state => html`
  <header>
    <span class="header-text">${state.header}</span>
  </header>
`;
