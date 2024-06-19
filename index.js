import Navigo from "navigo";
import { camelCase } from "lodash";
import { header, nav, main, footer } from "./components";
import * as store from "./store/index.js";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;
  router.updatePageLinks();

  afterRender(state);
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "order") {
    // Add an event handler for the submit button on the form
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      // Get the form element
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      // Create an empty array to hold the toppings
      const toppings = [];

      // Iterate over the toppings array
      for (let input of inputList.toppings) {
        // If the value of the checked attribute is true then add the value to the toppings array
        if (input.checked) {
          toppings.push(input.value);
        }
      }

      // Create a request body object to send to the API
      const requestData = {
        customer: inputList.customer.value,
        crust: inputList.crust.value,
        cheese: inputList.cheese.value,
        sauce: inputList.sauce.value,
        toppings: toppings
      };
      // Log the request body to the console
      console.log("request Body", requestData);

      axios
        // Make a POST request to the API to create a new pizza
        .post(`${process.env.PIZZA_PLACE_API_URL}/pizzas`, requestData)
        .then(response => {
          //  Then push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
          store.pizza.pizzas.push(response.data);
          router.navigate("/pizza");
        })
        // If there is an error log it to the console
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }

  if (state.view === "chart") {
    // const labels = state.records.map(record => {
    //   return record[0];
    // });

    const data = state.records.map(record => {
      return {
        // openTime: record[0],
        // open: record[1],
        // high: record[2],
        // low: record[3],
        // close: record[4],
        // volume: record[5],
        // closeTime: record[6],
        // quoteAssetVolume: record[7]
        // x: new Date(record[0]),
        x: record[0],
        y: record[2]
      };
    });

    // console.log("matsinet-index.js:92-labels:", labels);
    console.log("matsinet-index.js:93-data:", data);

    new Chart(document.getElementById("chart"), {
      type: "line",
      data: {
        datasets: [
          {
            data
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              text: "Time"
            },
            type: "time",
            adapters: {
              date: {
                locale: enUS
              }
            }
          }
        }
      }
    });
  }
}

// These functions are invoked inside Promise.all below inside the "home" case
// These functions return the response body returned by the axios request
function getPizzas() {
  return axios.get(`${process.env.PIZZA_PLACE_API_URL}/pizzas`);
}

function getWeather() {
  return axios.get(`${process.env.PIZZA_PLACE_API_URL}/weather/st%20louis`);
}

router.hooks({
  before: (done, params) => {
    // We need to know what view we are on to know what data to fetch
    const view =
      params && params.data && params.data.view
        ? camelCase(params.data.view)
        : "home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // Add a case for each view that needs data from an API
      // New Case for the home View
      case "home":
        //getPizzas() and getWeather() are passed in Promise.all inside an array
        Promise.all([getPizzas(), getWeather()])
          // The returned response from each function is passed through the callback function below
          // The callback function has two parameters that will handle the returned response arguments
          .then(([pizzaData, weatherData]) => {
            console.log("PizzaData", pizzaData);
            console.log("WeatherData", weatherData);

            store.pizza.pizzas = pizzaData.data;

            store.home.weather = {
              city: weatherData.data.city,
              temp: weatherData.data.temp,
              feelsLike: weatherData.data.feelsLike,
              description: weatherData.data.description
            };
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });

        // axios
        //   // Get request to retrieve the current weather data using the API key and providing a city name
        //   .get(`${process.env.PIZZA_PLACE_API_URL}/weather/st%20louis`)
        //   .then((response) => {
        //     console.log("Weather Data:", response.data);
        //     // Create an object to be stored in the Home state from the response
        //     store.home.weather = {
        //       city: response.data.city,
        //       temp: response.data.temp,
        //       feelsLike: response.data.feelsLike,
        //       description: response.data.description,
        //     };

        //     done();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     done();
        //   });
        break;

      case "pizza":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.PIZZA_PLACE_API_URL}/pizzas`)
          .then(response => {
            console.log("response", response);

            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            store.pizza.pizzas = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;

      case "weather":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.PIZZA_PLACE_API_URL}/weather`)
          .then(response => {
            console.log("response", response);

            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            store.weather.records = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;

      case "chart":
        axios
          .get(`${process.env.PIZZA_PLACE_API_URL}/mex/BTC`)
          .then(response => {
            console.log(response.data);
            store.chart.records = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;

      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? camelCase(params.data.view)
        : "home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(store.home),
    ":view": ({ data, params }) => {
      // data?.view checks if view exists, then ternary runs
      const view = data?.view ? camelCase(data.view) : "home";
      if (view in store) {
        // store[view]
        render(store[view]);
      } else {
        console.log(`View ${view} not defined`);
        render(store.viewNotFound);
      }
    }
  })
  .notFound(() => render(store.viewNotFound))
  .resolve();
