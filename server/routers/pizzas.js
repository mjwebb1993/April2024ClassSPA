import { Router } from "express";
import Pizza from "../models/Pizza.js";

const router = Router();

// All our routes go here
// Create pizza route
router.post("/", async (request, response) => {
  try {
    const newPizza = new Pizza(request.body);

    const data = await newPizza.save();

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

// Get all pizzas route
router.get("/", async (request, response) => {
  try {
    // Store the query params into a JavaScript Object
    const query = request.query; // Defaults to an empty object {}

    const data = await Pizza.find(query);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Get a single pizza by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Pizza.findById(request.params.id);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Delete a pizza by ID
router.delete("/:id", async (request, response) => {
  try {
    const data = await Pizza.findByIdAndDelete(request.params.id, {});

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Update a single pizza by ID
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Pizza.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          crust: body.crust,
          cheese: body.cheese,
          sauce: body.sauce,
          toppings: body.toppings
        }
      },
      {
        new: true
      }
    );

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

export default router;
