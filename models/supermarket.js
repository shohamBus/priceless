import mongoose from "mongoose";
const Schema = mongoose.Schema;

const supermarket = new Schema({
  title: String,
  url: String,
});

mongoose.models = {};

const Supermarket = mongoose.model("Supermarket", supermarket);
export default Supermarket;
