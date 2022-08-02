import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Location from "./location";

const supermarket = new Schema({
  title: String,
  titleheb: String,
  url: String,
  img: String,
  location: { type: Schema.Types.ObjectId, ref: Location },
});

mongoose.models = {};

const Supermarket = mongoose.model("Supermarket", supermarket);
export default Supermarket;
