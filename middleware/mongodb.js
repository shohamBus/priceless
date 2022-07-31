import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection

    return handler(req, res);
  }
  // Use new db connection
  const { DB_USER, DB_PASS } = process.env;
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.hnlsrn0.mongodb.net/Priceless`
  );
  return handler(req, res);
};

export default connectDB;
