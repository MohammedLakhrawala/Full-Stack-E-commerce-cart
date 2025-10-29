import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-lg font-semibold mb-2">Page not found</h2>
        <p className="text-zinc-400 mb-3">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">Back to home</Link>
      </div>
    </main>
  );
}
