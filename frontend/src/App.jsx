import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchProducts, fetchCart, addToCart, removeFromCart, checkout } from "./api";

import Header from "./components/Header.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";

import { toast } from "react-hot-toast";
import { fmtINR } from "./utils/money";



export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [error, setError] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: p }, { data: c }] = await Promise.all([
          fetchProducts(),
          fetchCart(),
        ]);
        setProducts(p);
        setCart(c);
      } catch {
        // error toast handled globally
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load products + cart on first mount
  useEffect(() => {
    (async () => {
      try {
        const [{ data: p }, { data: c }] = await Promise.all([fetchProducts(), fetchCart()]);
        setProducts(p);
        setCart(c);
      } catch (e) {
        setError("Failed to load data");
      }
    })();
  }, []);

  // Actions
  async function handleAdd(productId) {
    try {
      const { data } = await addToCart(productId, 1, { silent: true }); // avoid auto error toast
      setCart(data);
      toast.success("Added to cart");
    } catch {
      // interceptor already toasts error
    }
  }

  async function handleQty(lineId, productId, qty) {
    if (qty < 1) return;
    try {
      const { data } = await addToCart(productId, qty, { silent: true });
      setCart(data);
      toast.success("Quantity updated");
    } catch {}
  }

  async function handleRemove(lineId) {
    try {
      const { data } = await removeFromCart(lineId, { silent: true });
      setCart(data);
      toast.success("Removed from cart");
    } catch {}
  }

  async function handleCheckout(form) {
    try {
      setLoadingCheckout(true);
      const { data: receipt } = await checkout(form, { silent: true });
      setCart({ items: [], total: 0 });
      localStorage.setItem("last_receipt", JSON.stringify(receipt));
      setShowCheckout(false);
      toast.success(`Payment successful — ${fmtINR(receipt.total)}`);
      navigate("/success", { state: { receipt } });
    } catch {
      // interceptor already toasts
    } finally {
      setLoadingCheckout(false);
    }
  }
  // async function handleAdd(productId) {
  //   const { data } = await addToCart(productId, 1);
  //   setCart(data);
  // }
  // async function handleQty(lineId, productId, qty) {
  //   if (qty < 1) return;
  //   const { data } = await addToCart(productId, qty);
  //   setCart(data);
  // }
  // async function handleRemove(lineId) {
  //   const { data } = await removeFromCart(lineId);
  //   setCart(data);
  // }

  // async function handleCheckout(form) {
  // try {
  //   setLoadingCheckout(true);
  //   const { data: receipt } = await checkout(form);

  //   // Keep UI in sync with server-cleared cart
  //   setCart({ items: [], total: 0 });

  //   // Save for refresh, then navigate with state
  //   localStorage.setItem("last_receipt", JSON.stringify(receipt));
  //   setShowCheckout(false);
  //   navigate("/success", { state: { receipt } });
  // } catch (e) {
  //   console.error(e);
  //   alert("Checkout failed. Please try again.");
  // } finally {
  //   setLoadingCheckout(false);
  // }
// }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header shown on all pages */}
      <Header
        total={cart.total}
        cartCount={cart.items?.length || 0}
        onCheckoutClick={() => setShowCheckout(true)}
      />

      {/* Optional global errors */}
      {error && <div className="max-w-6xl mx-auto px-4 text-red-400 text-sm">{error}</div>}

      {/* Pages */}
      <Routes>
        <Route path="/" element={<ProductsPage products={products} onAdd={handleAdd} />} />
        <Route
          path="/cart"
          element={<CartPage cart={cart} onQty={handleQty} onRemove={handleRemove} onCheckout={() => setShowCheckout(true)} />}
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Checkout modal (global so it works from any page) */}
      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
          loading={loadingCheckout}
        />
      )}
    </div>
  );
}
