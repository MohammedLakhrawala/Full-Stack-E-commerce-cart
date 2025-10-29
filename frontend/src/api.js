import axios from "axios";
import { toast } from "react-hot-toast";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API || "http://localhost:4000",
  timeout: 10_000,
});

// Optional: attach interceptors for consistent errors
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong. Please try again.";
    // Only auto-toast for unexpected errors (avoid double toasts)
    if (err?.config?.silent !== true) toast.error(msg);
    return Promise.reject(err);
  }
);

// Helpers
export const fetchProducts = (config) => API.get("/api/products", config);
export const fetchCart     = (config) => API.get("/api/cart", config);
export const addToCart     = (productId, qty = 1, config) =>
  API.post("/api/cart", { productId, qty }, config);
export const removeFromCart = (lineId, config) =>
  API.delete(`/api/cart/${lineId}`, config);
export const checkout      = (payload, config) =>
  API.post("/api/checkout", payload, config);
