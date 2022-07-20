import connectDB from "../../middleware/mongodb";
import Category from "../../models/category";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const category = await Category.find();
    res
      .status(200)
      .send(category)
      .catch((e) => res.send("error", e));
  } else if (req.method === "POST") {
    // Check if title and url is provided
    const { title } = req.body;
    if (title) {
      try {
        const category = new Category({
          title,
        });

        // Create new supermarket
        const categorycreated = await category.save();
        return res.status(200).send(categorycreated);
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
