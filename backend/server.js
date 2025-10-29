import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Health
app.get("/", (_req, res) => res.send("Mock E‑Com Cart API"));


// Routes
import productsRoute from "./routes/products.js";
import cartRoute from "./routes/cart.js";
import checkoutRoute from "./routes/checkout.js";
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);


// DB + Start
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI).then(() => {
console.log("✅ MongoDB connected");
app.listen(PORT, () => console.log(`✅ API on http://localhost:${PORT}`));
}).catch((err) => {
console.error("❌ MongoDB connect error", err);
process.exit(1);
});