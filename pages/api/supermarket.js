import connectDB from "../../middleware/mongodb";
import Supermarket from "../../models/supermarket";

const handler = async (req, res) => {
  if (req.method === "GET") {
    //get all supermarkets
    const supermarket = await Supermarket.find();
    res
      .status(200)
      .send(supermarket)
      .catch((e) => res.send("error", e));
  } else if (req.method === "POST") {
    // Check if title and url is provided
    const { title, url } = req.body;
    if (title && url) {
      try {
        const supermarket = new Supermarket({
          title,
          url,
        });

        // Create new supermarket
        const supermarketcreated = await supermarket.save();
        return res.status(200).send(supermarketcreated);
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
