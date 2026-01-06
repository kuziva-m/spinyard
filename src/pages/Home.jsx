import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Sun,
  MapPin,
} from "lucide-react";

// 1. IMPORT IMAGES
import slide1 from "../assets/slide-1.jpg";
import slide2 from "../assets/slide-2.jpg";
import slide3 from "../assets/slide-3.jpg";
import slide4 from "../assets/slide-4.jpg";
import slide5 from "../assets/slide-5.jpg";
import slide6 from "../assets/slide-6.jpg";
import slide7 from "../assets/slide-7.jpg";
import slide8 from "../assets/slide-8.jpg";

export default function Home() {
  // 2. SETUP SLIDER
  const sliderImages = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-2xl overflow-hidden bg-ash-grey-900 shadow-xl mx-auto w-full group h-[600px] md:h-[700px]">
        {/* BACKGROUND: SPLIT SLIDER */}
        <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
          {/* First Image Pane */}
          <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
            <img
              key={currentIndex}
              src={sliderImages[currentIndex]}
              alt="Showcase Primary"
              className="w-full h-full object-cover animate-in fade-in duration-1000"
            />
          </div>

          {/* Second Image Pane */}
          <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden">
            <img
              key={(currentIndex + 1) % sliderImages.length}
              src={sliderImages[(currentIndex + 1) % sliderImages.length]}
              alt="Showcase Secondary"
              className="w-full h-full object-cover animate-in fade-in duration-1000"
            />
          </div>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent md:bg-gradient-to-r md:from-black/95 md:via-black/60 md:to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 px-6 h-full flex flex-col justify-center md:px-12 max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            Spinyard <br />
            {/* HARD WHITE OUTLINE TECHNIQUE:
               We stack 4 drop-shadows with 0 blur (1.5px offset in all directions).
               This creates a solid border around the transparent gradient text.
            */}
            <span
              className="bg-gradient-to-b from-[#07a91f] to-[#0a5b19] bg-clip-text text-transparent"
              style={{
                filter:
                  "drop-shadow(1px 0 0 white) drop-shadow(-1px 0 0 white) drop-shadow(0 1px 0 white) drop-shadow(0 -1px 0 white)",
              }}
            >
              Seedlings
            </span>
          </h1>

          <p className="text-lg md:text-xl text-ash-grey-100 mb-10 leading-relaxed max-w-2xl font-light drop-shadow-md">
            The leading horticultural seed and seedlings provider in Zimbabwe
            that offers you the best quality seedlings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/services"
              className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold uppercase tracking-wider rounded-lg text-white bg-olive-leaf-600 hover:bg-olive-leaf-700 transition-colors shadow-lg shadow-olive-leaf-900/40"
            >
              View Services
            </Link>

            {/* White/Cream Gradient Button */}
            <Link
              to="/products"
              className="inline-flex justify-center items-center px-8 py-4 bg-gradient-to-b from-white to-soft-linen-100 text-ash-grey-900 border border-soft-linen-200 text-base font-bold uppercase tracking-wider rounded-lg hover:from-white hover:to-white hover:scale-105 transition-all shadow-lg"
            >
              View Current Stock
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST SIGNALS */}
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
            className="bg-white p-8 rounded-xl border border-ash-grey-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="h-14 w-14 bg-soft-linen-100 rounded-lg flex items-center justify-center mb-5 text-olive-leaf-700">
              <feature.icon strokeWidth={1.5} size={32} />
            </div>
            <h3 className="text-xl font-bold text-ash-grey-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-ash-grey-600 leading-relaxed text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* 3. QUICK CATEGORY PREVIEW */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-ash-grey-900 tracking-tight">
              Our Varieties
            </h2>
            <p className="text-ash-grey-600 mt-2">
              Quality inputs for every season.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center text-olive-leaf-700 font-bold uppercase tracking-wider text-sm hover:text-olive-leaf-800"
          >
            Full Catalog <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Tomatoes",
              img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=800",
            },
            {
              name: "Leafy Veg",
              img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
            },
            {
              name: "Cabbages",
              img: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=800",
            },
            {
              name: "Peppers",
              img: "https://images.unsplash.com/photo-1563565375-f3fdf5d6c4d8?auto=format&fit=crop&q=80&w=800",
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?category=${cat.name}`}
              className="group relative rounded-lg overflow-hidden aspect-square bg-ash-grey-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ash-grey-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-white font-bold text-lg tracking-wide">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. AGRONOMIST CTA */}
      <section className="bg-ash-grey-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-olive-leaf-600 rounded-full opacity-20 blur-3xl"></div>

        <div className="md:flex items-center justify-between gap-8 relative z-10">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Expert Advice?
            </h2>
            <p className="text-ash-grey-300 max-w-xl leading-relaxed">
              Our resident agronomist is available to help you choose the right
              variety for your soil type and market goals. Don't guess—grow with
              confidence.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="tel:+263785882984"
              className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-olive-leaf-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-olive-leaf-500 transition-colors shadow-lg shadow-black/30"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Call Agronomist
            </a>
          </div>
        </div>
      </section>

      {/* 5. LOCATIONS */}
      <section className="bg-soft-linen-100 rounded-2xl p-8 md:p-12 border border-soft-linen-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-ash-grey-900 tracking-tight mb-4">
            Visit Our Nurseries
          </h2>
          <p className="text-ash-grey-600">
            Come select your seedlings in person. Our teams at both locations
            are ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meyrick Park Location */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-ash-grey-100">
            <div className="flex items-center gap-2 mb-4 px-2">
              <MapPin className="text-olive-leaf-600 h-5 w-5" />
              <h3 className="text-xl font-bold text-ash-grey-900">
                Meyrick Park Nursery
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden shadow-inner border border-ash-grey-200 bg-ash-grey-50 aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.6399605111474!2d30.99921597429897!3d-17.808610375768563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a53dcbdc63a3%3A0x8eb1faa9d8dacba5!2sSpinyard%20Seedlings!5e0!3m2!1sen!2szw!4v1767683786102!5m2!1sen!2szw"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Meyrick Park Map"
              ></iframe>
            </div>
            <div className="mt-4 px-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-olive-leaf-700 hover:text-olive-leaf-800 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Umwinsdale Location */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-ash-grey-100">
            <div className="flex items-center gap-2 mb-4 px-2">
              <MapPin className="text-olive-leaf-600 h-5 w-5" />
              <h3 className="text-xl font-bold text-ash-grey-900">
                Umwinsdale Nursery
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden shadow-inner border border-ash-grey-200 bg-ash-grey-50 aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1613.2209933023428!2d31.199341841849712!3d-17.73771980291003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931b07bb4e2b607%3A0x383200d2d01af602!2sNew%20Umwinsidale%20Satelite!5e0!3m2!1sen!2szw!4v1767683752493!5m2!1sen!2szw"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Umwinsdale Map"
              ></iframe>
            </div>
            <div className="mt-4 px-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-olive-leaf-700 hover:text-olive-leaf-800 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
