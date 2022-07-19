import mongoose from "mongoose";
import Product from "./product";
const Schema = mongoose.Schema;

const cart = new Schema([
  {
    title: {
      type: String,
    },
    since: {
      type: Date,
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: Product },
        qty: Number,
      },
    ],
  },
]);
mongoose.models = {};

const Cart = mongoose.model("Cart", cart);
export default Cart;
