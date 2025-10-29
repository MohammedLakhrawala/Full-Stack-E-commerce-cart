import { fmtINR } from "../utils/money";

export default function Cart({ cart, onQty, onRemove }) {
  if (!cart.items?.length) {
    return (
      <section className="mt-8">
        <h2 className="text-base font-semibold mb-2">Your Cart</h2>
        <p className="text-sm text-zinc-400">Empty cart.</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold mb-3">Your Cart</h2>
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/50">
            <tr>
              <th className="text-left p-3">Item</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Qty</th>
              <th className="text-left p-3">Subtotal</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {cart.items.map((i) => (
              <tr key={i.id} className="border-t border-zinc-800">
                <td className="p-3">{i.name}</td>
                <td className="p-3">{fmtINR(i.price)}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => onQty(i.id, i.productId, Number(e.target.value))}
                    className="w-20 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800"
                  />
                </td>
                <td className="p-3">{fmtINR(i.price * i.qty)}</td>
                <td className="p-3 text-right">
                  <button onClick={() => onRemove(i.id)} className="text-blue-300 hover:text-blue-200">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-zinc-800">
              <td colSpan={3} className="p-3 text-right font-semibold">Total</td>
              <td className="p-3 font-semibold">{fmtINR(cart.total)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
