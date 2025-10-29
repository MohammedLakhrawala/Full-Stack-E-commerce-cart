import { Router } from "express";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import { ensureCart, computeTotal } from "../lib/cartService.js";
import mongoose from "mongoose";

const router = Router();

// GET /api/cart → { items:[{id, productId, name, price, qty}], total }
router.get("/", async (_req, res) => {
  const cart = await ensureCart();
  await cart.populate({ path: "items.product", select: "name price" });

  // 🧹 prune any stale lines where product doesn't exist anymore
  const before = cart.items.length;
  cart.items = cart.items.filter((i) => i.product); // keep only lines with a real product
  if (cart.items.length !== before) {
    await cart.save(); // persist cleanup so it doesn't break next time
  }

  const items = cart.items.map((i) => ({
    id: i._id.toString(),
    productId: i.product._id.toString(),
    name: i.product.name,
    price: i.product.price,
    qty: i.qty,
  }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  res.json({ items, total });
});

// POST /api/cart { productId, qty } → add or update
router.post("/", async (req, res) => {
  const { productId, qty } = req.body || {};
  if (!productId || typeof qty !== "number" || qty < 1) {
    return res.status(400).json({ error: "productId and qty>=1 are required" });
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid productId" });
  }

  const product = await Product.findById(productId).select("name price");
  if (!product) return res.status(404).json({ error: "Product not found" });

  const cart = await ensureCart();
  // NOTE: here cart.items[i].product is an ObjectId (not populated), so toString() is safe
  const line = cart.items.find((i) => i.product.toString() === productId);

  if (line) {
    line.qty = qty; // update quantity
  } else {
    cart.items.push({ product: product._id, qty });
  }

  await cart.save();
  await cart.populate({ path: "items.product", select: "name price" });

  // (No nulls expected now, but still map safely)
  const items = cart.items
    .filter((i) => i.product)
    .map((i) => ({
      id: i._id.toString(),
      productId: i.product._id.toString(),
      name: i.product.name,
      price: i.product.price,
      qty: i.qty,
    }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  res.status(201).json({ items, total });
});


// DELETE /api/cart/:id → remove line item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await ensureCart();
  cart.items = cart.items.filter((i) => i._id.toString() !== id);
  await cart.save();
  await cart.populate({ path: "items.product", select: "name price" });

  const items = cart.items
    .filter((i) => i.product)
    .map((i) => ({
      id: i._id.toString(),
      productId: i.product._id.toString(),
      name: i.product.name,
      price: i.product.price,
      qty: i.qty,
    }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  res.json({ items, total });
});


export default router;
