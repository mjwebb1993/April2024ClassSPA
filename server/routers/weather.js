import { Router } from "express";
import Weather from "../models/Weather.js";
import axios from "axios";

const router = Router();

// Handle the request with HTTP GET method with query parameters and a url parameter
router.get("/:city", async (request, response) => {
  const city = request.params.city;

  const weather = await axios
    // Get request to retrieve the current weather data using the API key and providing a city name
    .get(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial&q=${city}`
    );

  const data = {
    city: weather.data.name,
    temp: weather.data.main.temp,
    feelsLike: weather.data.main.feels_like,
    description: weather.data.weather[0].main
  };

  const newWeather = new Weather(data);

  const saveResponse = await newWeather.save();

  response.json(data);
});

// All our routes go here
// Create Weather route
router.post("/", async (request, response) => {
  try {
    const newWeather = new Weather(request.body);

    const data = await newWeather.save();

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    // if error.name exists and error.name = validation error
    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all Weathers route
router.get("/", async (request, response) => {
  try {
    // Store the query params into a JavaScript Object
    const query = request.query; // Defaults to an empty object {}

    const data = await Weather.find(query);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

export default router;
