import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  ChevronLeft,
  ShieldCheck,
  Sun,
  MapPin,
  Loader2,
  AlertCircle,
  Sprout,
} from "lucide-react";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  // AUTO FLIP ANIMATION
  useEffect(() => {
    if (!product?.plant_image_url) return;

    const interval = setInterval(() => {
      setIsFlipped(true);
      setTimeout(() => setIsFlipped(false), 3000);
    }, 6000);

    return () => clearInterval(interval);
  }, [product]);

  if (loading)
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <Loader2 className="animate-spin text-olive-leaf-600" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen pt-32 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link
          to="/products"
          className="text-olive-leaf-600 underline mt-4 inline-block"
        >
          Back to Catalog
        </Link>
      </div>
    );

  return (
    // UPDATED: Reduced py (padding-y) to fit content better in one view
    <div className="min-h-screen bg-soft-linen-50 pt-24 pb-10 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* BREADCRUMB */}
        {/* UPDATED: Reduced bottom margin */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-ash-grey-500 hover:text-olive-leaf-600 font-medium mb-4 transition-colors text-sm"
        >
          <ChevronLeft size={18} />
          Back to Catalog
        </Link>

        {/* UPDATED: Reduced gap and added items-center for vertical alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT: IMAGE FLIPPER */}
          {/* UPDATED: 
              - Mobile: Fixed height h-64 (Banner style) to save vertical space.
              - Desktop: Max height 50vh (Half screen height) and aspect-square.
              - Added max-w-md to stop it from getting too wide.
          */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-none h-64 sm:h-80 lg:h-[50vh] lg:aspect-square group [perspective:1000px]">
            <div
              className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* FRONT: SEEDLING */}
              <div className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl border border-ash-grey-200 overflow-hidden [backface-visibility:hidden]">
                <img
                  src={product.image_url || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sprout size={12} /> Seedling
                </div>
              </div>

              {/* BACK: MATURE PLANT */}
              {product.plant_image_url && (
                <div className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl border border-olive-leaf-200 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img
                    src={product.plant_image_url}
                    alt={`${product.name} Mature`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-olive-leaf-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                    <Sun size={12} /> Mature
                  </div>
                </div>
              )}
            </div>

            {/* HINT TEXT */}
            {product.plant_image_url && (
              <p className="text-center text-[10px] text-ash-grey-400 mt-2 animate-pulse">
                Showing potential growth...
              </p>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col justify-center">
            <span className="text-olive-leaf-600 font-bold uppercase tracking-wider text-xs mb-1">
              {product.category}
            </span>
            {/* UPDATED: Slightly smaller text to prevent wrapping issues */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-ash-grey-900 mb-4">
              {product.name}
            </h1>

            {/* TRUST BADGES */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-olive-leaf-50 text-olive-leaf-800 rounded-lg text-xs font-medium border border-olive-leaf-100">
                <ShieldCheck size={16} /> Disease-Free
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium border border-amber-100">
                <Sun size={16} /> Hardened
              </div>
            </div>

            {/* AVAILABILITY BOX */}
            {/* UPDATED: Reduced padding (p-4) to make it more compact */}
            <div className="bg-white p-5 rounded-xl border border-ash-grey-200 shadow-sm mb-6">
              <h3 className="text-xs font-bold text-ash-grey-900 uppercase tracking-wide mb-3 border-b border-ash-grey-100 pb-2">
                Availability
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-ash-grey-600">
                    <MapPin size={16} /> Meyrick Park
                  </span>
                  {product.available_meyrick ? (
                    <span className="text-olive-leaf-600 font-bold text-xs bg-olive-leaf-50 px-2 py-1 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold text-xs bg-red-50 px-2 py-1 rounded">
                      Sold Out
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-ash-grey-600">
                    <MapPin size={16} /> Umwinsdale
                  </span>
                  {product.available_umwinsdale ? (
                    <span className="text-olive-leaf-600 font-bold text-xs bg-olive-leaf-50 px-2 py-1 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold text-xs bg-red-50 px-2 py-1 rounded">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <a
              href={`https://wa.me/263772209434?text=Hi, I'm interested in ordering ${product.name}. Is it available?`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-ash-grey-900 text-white text-center py-3.5 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-olive-leaf-600 hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Order via WhatsApp
            </a>
            <p className="text-[10px] text-ash-grey-400 text-center mt-2">
              Direct line to our sales team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
