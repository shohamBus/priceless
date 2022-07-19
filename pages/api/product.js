import connectDB from "../../middleware/mongodb";
import Category from "../../models/category";
import Supermarket from "../../models/supermarket";
import Product from "../../models/product";
import { model } from "mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const product = await Product.find({
      "category": req.headers.id,
    })
      .populate("category")
      .populate("prices.supermarket");
    res.status(200).send(product);
    // .catch((e) => res.send("error", e));
  } else if (req.method === "POST") {
    // Check if title and url is provided
    const {
      title,
      description,
      img,
      category,
      prices,
      supermarket,
      price,
      quantity,
    } = req.body;
    if (title && category) {
      try {
        const product = new Product({
          title,
          description,
          img,
          category,
          prices,
          supermarket,
          price,
          quantity,
        });

        // Create new supermarket
        const productcreated = await product.save();
        return res.status(200).send(productcreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
