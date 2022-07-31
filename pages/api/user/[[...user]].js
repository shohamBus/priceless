import connectDB from "../../../middleware/mongodb";
import Cart from "../../../models/cart";
import User from "../../../models/user";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { user } = req.query;
    //find the user by email
    const userCart = await User.find({
      "email": user[0],
    }).populate({
      path: "carts",
      populate: {
        path: "products.product",
        populate: {
          path: "prices.supermarket",
        },
      },
    });
    res.status(200).send(userCart);
  } else if (req.method === "PATCH") {
    const { cartProducts, email, title } = req.body;
    //new cart
    const cart = new Cart({
      title,
      since: Date.now(),
      products: cartProducts.map((product) => {
        return {
          product: product.product._id,
          qty: product.qty,
        };
      }),
    });
    const cartcreated = await cart.save();

    //find the user by email
    if (email) {
      await User.findOneAndUpdate({ email }, { $push: { carts: cartcreated } });
    } else {
      const user = new User({ $push: { carts: cartcreated } });
      await user.save();
    }
    res.status(200).json(cartcreated);
  } else if (req.method === "POST") {
    const { name, email } = req.body;
    if (name && email) {
      try {
        const user = new User({
          name,
          email,
        });
        // Create new user
        const usercreated = await user.save();
        res.status(200).send(usercreated);
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
