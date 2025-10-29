import { Link, NavLink } from "react-router-dom";

export default function Header({ total = 0, cartCount = 0, onCheckoutClick }) {
  return (
    <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-semibold">🛒 E-Com Cart</Link>

      <nav className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm ${isActive ? "text-white" : "text-zinc-300 hover:text-white"}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `text-sm ${isActive ? "text-white" : "text-zinc-300 hover:text-white"}`
          }
        >
          Cart ({cartCount})
        </NavLink>

        {/* Optional: checkout quick button on any page */}
        <button
          className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50"
          onClick={onCheckoutClick}
          disabled={cartCount === 0}
        >
          Checkout (₹{total})
        </button>
      </nav>
    </header>
  );
}
