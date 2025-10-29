import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const [receipt, setReceipt] = useState(null);

  // Prefer router state, fallback to localStorage
  const receiptFromState = useMemo(
    () => location?.state?.receipt ?? null,
    [location]
  );

  useEffect(() => {
    try {
      if (receiptFromState) {
        setReceipt(receiptFromState);
        localStorage.setItem("last_receipt", JSON.stringify(receiptFromState));
        return;
      }
      const raw = localStorage.getItem("last_receipt");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setReceipt(parsed);
          return;
        }
      }
      setReceipt(null);
    } catch (e) {
      console.error("Failed to load receipt:", e);
      setReceipt(null);
    }
  }, [receiptFromState]);

  // Safe helpers
  const buyerName = receipt?.buyer?.name ?? "Guest";
  const buyerEmail = receipt?.buyer?.email ?? "unknown@example.com";
  const items = Array.isArray(receipt?.items) ? receipt.items : [];
  const timestamp = receipt?.timestamp ? new Date(receipt.timestamp).toLocaleString() : "";

  useEffect(() => {
    console.log("SuccessPage receiptFromState:", receiptFromState);
    console.log(
      "SuccessPage localStorage:",
      localStorage.getItem("last_receipt")
    );
  }, [receiptFromState]);


  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {!receipt ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <div className="text-zinc-300 mb-2">No receipt found.</div>
          <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
            Back to products
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-base font-semibold">Payment successful</h2>
            <span className="text-zinc-400 text-sm">{timestamp}</span>
          </div>

          <div className="p-5 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Receipt</span>
              <strong>{receipt?.receiptId ?? "-"}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span>Total</span>
              <strong>₹{receipt?.total ?? 0}</strong>
            </div>

            <div className="mt-3">
              <div className="font-medium">Buyer</div>
              <div className="text-zinc-300">
                {buyerName} · {buyerEmail}
              </div>
            </div>

            <div className="mt-3">
              <div className="font-medium mb-1">Items</div>
              <ul className="space-y-1">
                {items.map((i) => (
                  <li key={i.id ?? `${i.productId}-${i.name}`} className="flex items-center justify-between">
                    <span>{i?.name ?? "Item"} × {i?.qty ?? 0}</span>
                    <span>₹{i?.subtotal ?? (i?.price ?? 0) * (i?.qty ?? 0)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex gap-3">
              <Link to="/" className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm">
                Continue shopping
              </Link>
              <Link to="/cart" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">
                View cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
