import html from "html-literal";
import oops404 from "../../assets/img/oops-404.jpg"

export default () => html`
  <div id="oops404">
    <img src="${oops404}" alt="View not found!" />
    <div class="attribution">
      <a
        href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_13315300.htm"
        target="_blank"
        >Image by storyset</a
      >
      on Freepik
    </div>
  </div>
`;
