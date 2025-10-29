import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const PRODUCTS = [
  {
    name: "Vibe Tee",
    price: 799,
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
  },
  {
    name: "Sofa",
    price: 1999,
    imageUrl:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
  },
  {
    name: "Jacket",
    price: 499,
    imageUrl:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&q=80",
  },
  {
    name: "Office Chair",
    price: 299,
    imageUrl:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800&q=80",
  },
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected. Clearing old products…");
    await Product.deleteMany({});
    await Product.insertMany(PRODUCTS);
    console.log("Seeded products:", PRODUCTS.length);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}
run();
