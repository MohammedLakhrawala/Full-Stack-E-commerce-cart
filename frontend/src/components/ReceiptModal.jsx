export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-base font-semibold">Payment successful</h3>
          <button onClick={onClose} className="text-zinc-300 hover:text-white">✕</button>
        </div>
        <div className="p-5 space-y-2 text-sm">
          <div className="flex items-center justify-between"><span>Receipt</span><strong>{receipt.receiptId}</strong></div>
          <div className="flex items-center justify-between"><span>Total</span><strong>₹{receipt.total}</strong></div>
          <div className="text-zinc-400">{new Date(receipt.timestamp).toLocaleString()}</div>
          <div className="mt-3">
            <div className="font-medium">Buyer</div>
            <div className="text-zinc-300">{receipt.buyer.name} · {receipt.buyer.email}</div>
          </div>
          <div className="mt-3">
            <div className="font-medium mb-1">Items</div>
            <ul className="space-y-1">
              {receipt.items.map((i) => (
                <li key={i.id} className="flex items-center justify-between">
                  <span>{i.name} × {i.qty}</span>
                  <span>₹{i.subtotal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-5 pt-0 flex items-center justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-xl bg-blue-600 hover:bg-blue-500">Done</button>
        </div>
      </div>
    </div>
  );
}
