import mongoose from "mongoose";
const Schema = mongoose.Schema;

const location = new Schema({
  name: String,
  Latitude: Number,
  Longitude: Number,
});
mongoose.models = {};

const Location = mongoose.model("Location", location);
export default Location;
