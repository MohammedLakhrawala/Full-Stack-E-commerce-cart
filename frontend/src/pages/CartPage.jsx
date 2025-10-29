import Cart from "../components/Cart.jsx";

export default function CartPage({ cart, onQty, onRemove, onCheckout }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Cart cart={cart} onQty={onQty} onRemove={onRemove} />
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50"
          onClick={onCheckout}
          disabled={!cart.items?.length}
        >
          Checkout (₹{cart.total})
        </button>
      </div>
    </main>
  );
}
