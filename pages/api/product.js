import connectDB from "../../middleware/mongodb";
import Product from "../../models/product";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (req.headers.filter == 1) {
      const product = await Product.find({
        "category": req.headers.id,
      })
        .populate("category")
        .populate("prices.supermarket");
      res.status(200).send(product);
      // .catch((e) => res.send("error", e));
    } else {
      const product = await Product.find()
        .populate("category")
        .populate("prices.supermarket");
      res.status(200).send(product);
    }
  } else if (req.method === "DELETE") {
    const productId = JSON.parse(req.body);
    await Product.findByIdAndDelete(productId);
    res.status(200);
  } else if (req.method === "PATCH") {
    const product = JSON.parse(req.body);
    await Product.findByIdAndUpdate(product._id, { ...product });
    res.status(200);
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
    } = JSON.parse(req.body);
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
