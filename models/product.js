import mongoose from "mongoose";
import Category from "./category";
import Supermarket from "./supermarket";
const Schema = mongoose.Schema;
const product = new Schema({
  title: String,
  description: String,
  img: String,
  // _id: Number,
  category: { type: Schema.Types.ObjectId, ref: Category },
  prices: [
    {
      supermarket: { type: Schema.Types.ObjectId, ref: Supermarket },
      price: Number,
      quantity: Number,
    },
  ],
});
mongoose.models = {};

const Product = mongoose.model("Product", product);
export default Product;
