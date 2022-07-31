import mongoose from "mongoose";
const Schema = mongoose.Schema;

const location = new Schema({
  city: String,
  latitude: Number,
  longitude: Number,
});
mongoose.models = {};

const Location = mongoose.model("Location", location);
export default Location;
