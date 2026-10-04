const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error(
    "MONGO_URI is not set. Add it to backend/.env or your host's environment variables."
  );
}

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully");

    const db = mongoose.connection.db;

    global.food_items = await db.collection("food_items").find({}).toArray();
    global.foodCategory = await db.collection("foodCategory").find({}).toArray();

    console.log(
      `Loaded ${global.food_items.length} food items and ${global.foodCategory.length} categories`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = mongoDB;
