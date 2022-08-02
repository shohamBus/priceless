import connectDB from "../../../middleware/mongodb";
import Supermarket from "../../../models/supermarket";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { supermarketId } = req.query;
    const supermarket = await Supermarket.findById(supermarketId);
    res.status(200).send(supermarket);
    // .catch((e) => res.send("error", e));
  }
};

export default connectDB(handler);
