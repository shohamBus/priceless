import connectDB from "../../middleware/mongodb";
import Category from "../../models/category";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const category = await Category.find();
    res
      .status(200)
      .send(category)
      .catch((e) => res.send("error", e));
  } else if (req.method === "DELETE") {
    const categoryId = JSON.parse(req.body);
    await Category.findByIdAndDelete(categoryId);
    res.status(200);
  } else if (req.method === "PATCH") {
    const category = JSON.parse(req.body);
    console.log("category", category);
    await Category.findByIdAndUpdate(category._Id, ...category);
    res.status(200);
  } else if (req.method === "POST") {
    const { title, titleheb, img } = JSON.parse(req.body);
    // Check if title and url is provided
    if (title && titleheb && img) {
      try {
        const category = new Category({
          title,
          titleheb,
          img,
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
