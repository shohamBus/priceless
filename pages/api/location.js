import connectDB from "../../middleware/mongodb";
import Location from "../../models/location";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const location = await Location.find();
    res.status(200).send(location);
    // .catch((e) => res.send("error", e));
  } else if (req.method === "DELETE") {
    const locationId = JSON.parse(req.body);
    await Location.findByIdAndDelete(locationId);
    res.status(200);
  } else if (req.method === "POST") {
    // Check if title and url is provided
    const { city, latitude, longitude } = JSON.parse(req.body);
    if (city && latitude && longitude) {
      try {
        const location = new Location({
          city,
          latitude,
          longitude,
        });

        // Create new location
        const locationcreate = await location.save();
        return res.status(200).send(locationcreate);
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
