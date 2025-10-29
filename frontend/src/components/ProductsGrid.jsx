import { fmtINR } from "../utils/money";

export default function ProductsGrid({ products = [], onAdd }) {
  const Skeleton = () => (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="aspect-[4/3] bg-zinc-900 animate-pulse" />
      <div className="p-4">
        <div className="h-5 w-1/2 bg-zinc-800 rounded mb-3 animate-pulse" />
        <div className="h-4 w-1/3 bg-zinc-900 rounded mb-4 animate-pulse" />
        <div className="h-10 w-28 bg-zinc-900 rounded animate-pulse" />
      </div>
    </div>
  );

  if (!products.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
          <div className="aspect-[4/3] bg-zinc-900">
            <img
              src={p.imageUrl}
              alt={p.name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image"; }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-base font-medium truncate">{p.name}</h3>
            <p className="text-sm text-zinc-400 mt-1">{fmtINR(p.price)}</p>
            <button
              onClick={() => onAdd?.(p.id)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
