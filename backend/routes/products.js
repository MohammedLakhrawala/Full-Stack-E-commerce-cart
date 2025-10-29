import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (_req, res) => {
  const products = await Product.find().select("_id name price imageUrl");
  res.json(
    products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl,
    }))
  );
});

export default router;
