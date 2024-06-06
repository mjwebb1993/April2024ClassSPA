import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  temp: {
    type: Number,
    required: true
  },
  feelsLike: {
    type: Number
  },
  description: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  }
});

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
