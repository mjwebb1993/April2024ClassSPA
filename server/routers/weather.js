import { Router } from "express";
import Weather from "../models/Weather.js";

const router = Router();

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
