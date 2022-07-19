import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Cart from "./cart";

const user = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  since: {
    type: Date,
  },
  carts: [{ type: Schema.Types.ObjectId, ref: Cart }],
});

mongoose.models = {};

const User = mongoose.model("User", user);

export default User;
