import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Sun,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 md:gap-20">
      {/* HERO SECTION 
          Designed for high contrast and immediate context.
      */}
      <section className="relative rounded-2xl overflow-hidden bg-ash-grey-900 shadow-xl mx-auto w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop"
            alt="Healthy seedlings in a greenhouse"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ash-grey-900/90 via-ash-grey-900/60 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-6 py-16 md:py-24 lg:px-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive-leaf-500/20 border border-olive-leaf-400/30 backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-olive-leaf-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-olive-leaf-100 uppercase tracking-wide">
              Stock Updated Daily
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Hardened Seedlings for{" "}
            <span className="text-olive-leaf-400">Zimbabwean Soil</span>.
          </h1>

          <p className="text-lg text-ash-grey-100 mb-8 leading-relaxed max-w-lg">
            Don't gamble with your harvest. Get disease-free, yield-optimized
            seedlings grown specifically for our climate. Available at Meyrick
            Park & Umwinsdale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white bg-olive-leaf-600 hover:bg-olive-leaf-700 transition-colors shadow-lg shadow-olive-leaf-900/20"
            >
              View Current Stock
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://wa.me/263772209434"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center px-6 py-3.5 border border-ash-grey-600 bg-ash-grey-800/50 backdrop-blur-sm text-base font-semibold rounded-lg text-white hover:bg-ash-grey-800 transition-colors"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION STRIP 
          Grounded, "FinTech" style layout. 
      */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          {
            icon: ShieldCheck,
            title: "Disease-Free Certified",
            desc: "Grown in sterile media to ensure your crop starts clean and stays healthy.",
          },
          {
            icon: Sun,
            title: "Properly Hardened",
            desc: "Acclimatized to full sun before sale to reduce transplant shock in your field.",
          },
          {
            icon: Sprout,
            title: "High-Yield Varieties",
            desc: "We stock premium hybrids like Star 9037 and Trinity known for local performance.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border border-ash-grey-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 bg-soft-linen-100 rounded-lg flex items-center justify-center mb-4 text-olive-leaf-700">
              <feature.icon strokeWidth={1.5} size={28} />
            </div>
            <h3 className="text-lg font-bold text-ash-grey-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-ash-grey-600 leading-relaxed text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* QUICK CATEGORY PREVIEW 
          Driving users deeper into the catalog.
      */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ash-grey-900 tracking-tight">
              Popular Categories
            </h2>
            <p className="text-ash-grey-600 mt-1">
              Everything you need for a successful season.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center text-olive-leaf-700 font-semibold hover:text-olive-leaf-800"
          >
            View Full Catalog <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Tomatoes",
              img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "Leafy Veg",
              img: "https://images.unsplash.com/photo-1524593166156-311f36fde0d9?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "Cabbages",
              img: "https://images.unsplash.com/photo-1621459586111-e67c83f982d6?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "Peppers",
              img: "https://images.unsplash.com/photo-1563565375-f3fdf5d6c4d8?q=80&w=800&auto=format&fit=crop",
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?category=${cat.name}`}
              className="group relative rounded-lg overflow-hidden aspect-square bg-ash-grey-100"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ash-grey-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-white font-bold text-lg">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            to="/products"
            className="flex items-center justify-center w-full py-3 border border-ash-grey-300 rounded-lg text-ash-grey-700 font-medium hover:bg-ash-grey-50"
          >
            View Full Catalog
          </Link>
        </div>
      </section>

      {/* DIVIDER */}
      <hr className="border-ash-grey-200" />

      {/* AGRONOMIST CTA */}
      <section className="bg-olive-leaf-50 rounded-2xl p-8 md:p-12 border border-olive-leaf-100">
        <div className="md:flex items-center justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-ash-grey-900 mb-3">
              Not sure what to plant?
            </h2>
            <p className="text-ash-grey-700 max-w-xl">
              Our resident agronomist is available to help you choose the right
              variety for your soil type and market goals.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="tel:+263785882984"
              className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-ash-grey-900 text-white font-semibold rounded-lg hover:bg-ash-grey-800 transition-colors"
            >
              <CheckCircle2 className="mr-2 h-5 w-5 text-olive-leaf-400" />
              Speak to Agronomist
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
