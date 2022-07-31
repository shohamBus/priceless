import mongoose from "mongoose";
const Schema = mongoose.Schema;

const supermarket = new Schema({
  title: String,
  titleheb: String,
  url: String,
  img: String,
  location: Object,
});

mongoose.models = {};

const Supermarket = mongoose.model("Supermarket", supermarket);
export default Supermarket;
