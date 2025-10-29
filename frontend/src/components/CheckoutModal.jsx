import { useState } from "react";

export default function CheckoutModal({ onClose, onSubmit, loading }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-base font-semibold">Checkout</h3>
          <button onClick={onClose} className="text-zinc-300 hover:text-white">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <label className="block text-sm">
            <span className="text-zinc-300">Name</span>
            <input
              className="mt-1 w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="eg: mohammed lakhrawala"
            />
            {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
          </label>
          <label className="block text-sm">
            <span className="text-zinc-300">Email</span>
            <input
              className="mt-1 w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="eg: mohammed@example.com"
            />
            {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
          </label>
        </div>
        <div className="p-5 pt-0 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-xl bg-zinc-800 hover:bg-zinc-700">Cancel</button>
          <button
            disabled={loading}
            onClick={() => validate() && onSubmit(form)}
            className="px-4 py-2 text-sm rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-60"
          >
            {loading ? "Processing…" : "Pay (Mock)"}
          </button>
        </div>
      </div>
    </div>
  );
}
