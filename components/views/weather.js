import html from "html-literal";

export default state => html`
  <table id="weather">
    <tr>
      <th>City</th>
      <th class="narrow-column">Temp</th>
      <th class="narrow-column">Feels Like</th>
      <th>Description</th>
      <th>Created At</th>
    </tr>
    ${state.records
    .map(record => {
      return html`
          <tr>
            <td>${record.city}</td>
            <td class="narrow-column">${record.temp}</td>
            <td class="narrow-column">${record.feelsLike}</td>
            <td>${record.description}</td>
            <td>${record?.createdAt}</td>
          </tr>
        `;
    })
    .join("")}
  </table>
`;
