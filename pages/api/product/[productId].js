import connectDB from "../../../middleware/mongodb";
import Product from "../../../models/product";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { productId } = req.query;
    const product = await (
      await Product.findById(productId)
    ).populate("prices.supermarket");
    res.status(200).send(product);
    //   .catch((e) => res.send("error", e));
  }
};

export default connectDB(handler);
