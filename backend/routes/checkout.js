import { Router } from "express";
import { z } from "zod";
import { ensureCart } from "../lib/cartService.js";

const router = Router();

// Define validation schema
const CheckoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
});

router.post("/", async (req, res) => {
  try {
    // Validate input
    const parsed = CheckoutSchema.safeParse(req.body || {});
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: parsed.error.flatten(),
      });
    }

    // Load cart and populate products
    const cart = await ensureCart();
    await cart.populate({ path: "items.product", select: "name price" });

    // Map cart items to receipt-safe structure
    const items = cart.items.map((i) => ({
      id: i._id.toString(),
      productId: i.product?._id?.toString(),
      name: i.product?.name ?? "Unknown",
      price: i.product?.price ?? 0,
      qty: i.qty,
      subtotal: (i.product?.price ?? 0) * i.qty,
    }));

    // Compute total
    const total = items.reduce((s, i) => s + i.subtotal, 0);

    // Build mock receipt
    const receipt = {
      receiptId: "rcpt_" + Date.now(),
      buyer: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
      items,
      total,
      timestamp: new Date().toISOString(),
    };

    // Clear cart after checkout
    cart.items = [];
    await cart.save();

    return res.status(201).json(receipt);
  } catch (err) {
    console.error("Checkout error:", err);
    return res.status(500).json({ error: "Server error during checkout" });
  }
});

export default router;
