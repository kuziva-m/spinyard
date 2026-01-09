import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import Images
import slide1 from "../../assets/slide-1.jpg";
import slide2 from "../../assets/slide-2.jpg";
import slide3 from "../../assets/slide-3.jpg";
import slide4 from "../../assets/slide-4.jpg";
import slide5 from "../../assets/slide-5.jpg";
import slide6 from "../../assets/slide-6.jpg";
import slide7 from "../../assets/slide-7.jpg";
import slide8 from "../../assets/slide-8.jpg";

export default function Hero() {
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
    // FULL WIDTH BREAKOUT CONTAINER
    // Updated HEIGHTS:
    // Mobile: h-[50vh] min-h-[400px] (Reduced height to remove bottom space)
    // Desktop: md:h-[85vh] md:min-h-[600px] (Keeps the original tall layout)
    <section className="relative w-screen -ml-[50vw] left-[50%] h-[50vh] min-h-[400px] md:h-[85vh] md:min-h-[600px] overflow-hidden bg-ash-grey-900">
      {/* BACKGROUND: SLIDER */}
      <div className="absolute inset-0 z-0 flex">
        {/* PANE 1: LEFT (Desktop) / FULL (Mobile) */}
        <div className="relative w-full h-full md:w-1/2 overflow-hidden border-r border-white/10">
          {sliderImages.map((img, index) => (
            <img
              key={`left-${index}`}
              src={img}
              alt="Showcase Primary"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>

        {/* PANE 2: RIGHT (Desktop Only) */}
        <div className="hidden md:block relative w-1/2 h-full overflow-hidden">
          {sliderImages.map((img, index) => {
            const isRightActive =
              index === (currentIndex + 1) % sliderImages.length;
            return (
              <img
                key={`right-${index}`}
                src={img}
                alt="Showcase Secondary"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  isRightActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            );
          })}
        </div>

        {/* OVERLAY LOGIC */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Mobile Overlay: Darkens the single tile for text readability */}
          <div className="absolute inset-0 bg-black/50 md:hidden" />

          {/* Desktop Overlay: Left side gradient only */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      {/* UPDATED: Removed 'justify-start pt-28' and used 'justify-center' to vertically align text */}
      <div className="relative z-30 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-3xl md:text-4xl font-bold text-ash-grey-100 mb-8 leading-tight max-w-3xl drop-shadow-2xl">
            The leading horticultural <br />
            seed and seedlings <br />
            provider in Zimbabwe <br />
            that offers you <br />
            the best quality seedlings.
          </p>

          {/* BUTTONS: Hidden on Mobile, Visible on Desktop */}
          <div className="hidden md:flex flex-col sm:flex-row gap-5">
            <Link
              to="/services"
              className="inline-flex justify-center items-center px-10 py-5 border border-white/30 backdrop-blur-sm text-lg font-bold uppercase tracking-wider rounded-lg text-white hover:bg-white hover:text-ash-grey-900 transition-all shadow-xl"
            >
              View Services
            </Link>

            <Link
              to="/products"
              className="inline-flex justify-center items-center px-10 py-5 bg-gradient-to-b from-white to-soft-linen-100 text-ash-grey-900 border border-soft-linen-200 text-lg font-bold uppercase tracking-wider rounded-lg hover:from-white hover:to-white hover:scale-105 transition-all shadow-xl"
            >
              View Current Stock
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
