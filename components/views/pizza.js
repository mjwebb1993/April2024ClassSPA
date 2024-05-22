import html from "html-literal";

export default state => html`
  <table id="pizzas">
    <tr>
      <th>Crust</th>
      <th>Cheese</th>
      <th>Sauce</th>
      <th>Toppings</th>
      <th>Customer</th>
    </tr>
    ${state.pizzas
      .map(pizza => {
        return `<tr><td>${pizza.crust}</td><td>${pizza.cheese}</td><td>${
          pizza.sauce
        }</td><td>${pizza.toppings.join(" & ")}</td><td>${
          pizza.customer
        }</td></tr>`;
      })
      .join("")}
  </table>
`;
