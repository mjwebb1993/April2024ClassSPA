import html from "html-literal";
import navItem from "./navItem.js";

export default state => {
  return html`
    <nav>
      <i class="fas fa-bars"></i>
      <ul class="hidden--mobile">
        <!-- state is passed into the module as an argument on line 4 and... -->
        <!-- navItem is imported as a component on line 2 which output more HTML -->
        ${state.map(item => navItem(item)).join("")}
      </ul>
    </nav>
  `;
};
