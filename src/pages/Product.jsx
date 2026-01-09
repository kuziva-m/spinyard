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
  // Flips to the plant image for 3 seconds, then back, every 6 seconds
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
    <div className="min-h-screen bg-soft-linen-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* BREADCRUMB */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-ash-grey-500 hover:text-olive-leaf-600 font-medium mb-8 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: IMAGE FLIPPER */}
          <div className="relative aspect-square w-full max-w-lg mx-auto lg:max-w-none group [perspective:1000px]">
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
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sprout size={14} /> Seedling Stage
                </div>
              </div>

              {/* BACK: MATURE PLANT (Only if available) */}
              {product.plant_image_url && (
                <div className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl border border-olive-leaf-200 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img
                    src={product.plant_image_url}
                    alt={`${product.name} Mature`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-olive-leaf-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Sun size={14} /> Mature Plant
                  </div>
                </div>
              )}
            </div>

            {/* HINT TEXT */}
            {product.plant_image_url && (
              <p className="text-center text-xs text-ash-grey-400 mt-4 animate-pulse">
                Showing potential growth...
              </p>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col justify-center">
            <span className="text-olive-leaf-600 font-bold uppercase tracking-wider text-sm mb-2">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ash-grey-900 mb-6">
              {product.name}
            </h1>

            {/* TRUST BADGES */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-2 bg-olive-leaf-50 text-olive-leaf-800 rounded-lg text-sm font-medium border border-olive-leaf-100">
                <ShieldCheck size={18} /> Disease-Free
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-800 rounded-lg text-sm font-medium border border-amber-100">
                <Sun size={18} /> Hardened
              </div>
            </div>

            {/* AVAILABILITY BOX */}
            <div className="bg-white p-6 rounded-xl border border-ash-grey-200 shadow-sm mb-8">
              <h3 className="text-sm font-bold text-ash-grey-900 uppercase tracking-wide mb-4 border-b border-ash-grey-100 pb-2">
                Current Availability
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ash-grey-600">
                    <MapPin size={18} /> Meyrick Park
                  </span>
                  {product.available_meyrick ? (
                    <span className="text-olive-leaf-600 font-bold text-sm bg-olive-leaf-50 px-2 py-1 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded">
                      Sold Out
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ash-grey-600">
                    <MapPin size={18} /> Umwinsdale
                  </span>
                  {product.available_umwinsdale ? (
                    <span className="text-olive-leaf-600 font-bold text-sm bg-olive-leaf-50 px-2 py-1 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded">
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
              className="w-full bg-ash-grey-900 text-white text-center py-4 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-olive-leaf-600 hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-3"
            >
              Order via WhatsApp
            </a>
            <p className="text-xs text-ash-grey-400 text-center mt-3">
              Direct line to our sales team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
