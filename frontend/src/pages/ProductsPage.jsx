import ProductsGrid from "../components/ProductsGrid.jsx";

export default function ProductsPage({ products, onAdd }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <ProductsGrid products={products} onAdd={onAdd} />
    </main>
  );
}
