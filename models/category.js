import mongoose from "mongoose";
const Schema = mongoose.Schema;

const category = new Schema({
  title: String,
  titleheb: String,
  img: String,
});
mongoose.models = {};

const Category = mongoose.model("Category", category);
export default Category;
