import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Search, Filter, MapPin, Loader2, AlertCircle } from "lucide-react";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FILTERS
  const [locationFilter, setLocationFilter] = useState("all"); // 'all', 'meyrick', 'umwinsdale'
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Categories derived from data + static fallback
  const categories = [
    "All",
    "Tomatoes",
    "Leafy Vegetables",
    "Brassicas",
    "Herbs",
    "Fruit Trees",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // --- FILTERING LOGIC ---
  const filteredProducts = products.filter((product) => {
    // 1. Filter by Location
    if (locationFilter === "meyrick" && !product.available_meyrick)
      return false;
    if (locationFilter === "umwinsdale" && !product.available_umwinsdale)
      return false;

    // 2. Filter by Category
    if (categoryFilter !== "All" && !product.category?.includes(categoryFilter))
      return false;

    // 3. Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* HEADER & CONTROLS */}
      <div className="bg-ash-grey-900 pt-32 pb-12 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Seedling <span className="text-olive-leaf-400">Catalog</span>
          </h1>

          {/* Controls Container */}
          <div className="flex flex-col gap-4">
            {/* SEARCH BAR */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for 'Star 9037' or 'Cabbage'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-ash-grey-800 border border-ash-grey-600 text-white placeholder-ash-grey-400 focus:outline-none focus:ring-2 focus:ring-olive-leaf-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-ash-grey-400" />
            </div>

            {/* LOCATION TOGGLE */}
            <div className="flex p-1 bg-ash-grey-800 rounded-lg self-start w-full md:w-auto">
              {["all", "meyrick", "umwinsdale"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all ${
                    locationFilter === loc
                      ? "bg-olive-leaf-600 text-white shadow-md"
                      : "text-ash-grey-400 hover:text-white"
                  }`}
                >
                  {loc === "all"
                    ? "All Locations"
                    : loc === "meyrick"
                    ? "Meyrick Park"
                    : "Umwinsdale"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY PILLS (Sticky) */}
      {/* FIX APPLIED HERE: 
          Changed top-[64px] to top-[57px] (Mobile) and md:top-[81px] (Desktop) 
          to match the exact height of the scrolled navbar. 
      */}
      <div className="sticky top-[57px] md:top-[81px] z-30 bg-soft-linen-50/95 backdrop-blur-sm border-b border-ash-grey-200 py-3 px-4 overflow-x-auto transition-all duration-300">
        <div className="max-w-7xl mx-auto flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                categoryFilter === cat
                  ? "bg-ash-grey-900 text-white border-ash-grey-900"
                  : "bg-white text-ash-grey-600 border-ash-grey-300 hover:border-olive-leaf-500 hover:text-olive-leaf-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-olive-leaf-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-ash-grey-900">
              Connection Error
            </h3>
            <p className="text-ash-grey-600">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-ash-grey-300">
            <Filter className="h-12 w-12 text-ash-grey-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-ash-grey-900">
              No products found
            </h3>
            <p className="text-ash-grey-500">
              Try adjusting your filters or search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-ash-grey-100 overflow-hidden flex flex-col"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] bg-ash-grey-100">
                  <img
                    src={product.image_url || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=400";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-ash-grey-900 rounded-md shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-ash-grey-900 mb-1 leading-tight">
                    {product.name}
                  </h3>

                  {/* Availability Badges */}
                  <div className="flex flex-wrap gap-2 mt-3 mb-4">
                    {product.available_meyrick && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-olive-leaf-50 text-olive-leaf-700 border border-olive-leaf-100">
                        <MapPin className="w-3 h-3 mr-1" /> Meyrick
                      </span>
                    )}
                    {product.available_umwinsdale && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-terracotta-50 text-terracotta-700 border border-terracotta-100">
                        <MapPin className="w-3 h-3 mr-1" /> Umwinsdale
                      </span>
                    )}
                    {!product.available_meyrick &&
                      !product.available_umwinsdale && (
                        <span className="text-xs text-ash-grey-400 italic">
                          Out of stock
                        </span>
                      )}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-ash-grey-100">
                    <Link
                      to={`/product/${product.id}`}
                      className="block w-full text-center py-2 px-4 rounded-lg bg-ash-grey-900 text-white text-sm font-bold hover:bg-olive-leaf-600 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
