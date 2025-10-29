import Cart from "../models/Cart.js";

const USER_ID = "mock-user"; // TODO: replace with real auth later

export async function ensureCart() {
  let cart = await Cart.findOne({ userId: USER_ID });
  if (!cart) cart = await Cart.create({ userId: USER_ID, items: [] });
  return cart;
}

export function computeTotal(cart) {
  return cart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}
