import html from "html-literal";

export default (item) => {
  return html`
    <li>
      <a href="${item.url}" title="${item.text}" data-navigo>${item.text}</a>
    </li>
  `;
};
