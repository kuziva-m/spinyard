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
    <section className="relative w-screen -ml-[50vw] left-[50%] h-[85vh] min-h-[600px] overflow-hidden bg-ash-grey-900">
      {/* BACKGROUND: SLIDER */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        {/* PANE 1 (Left/Top) */}
        <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
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

        {/* PANE 2 (Right/Bottom) */}
        <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden">
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

        {/* OVERLAY LOGIC:
            - Mobile: Gradient covering everything (Top to Bottom)
            - Desktop: Dark Black Gradient ONLY on the Left Half (w-1/2)
        */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent md:hidden" />

          {/* Desktop Overlay (Left Side Only) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-30 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Added 'text-center md:text-left' and 'items-center md:items-start' for Mobile Center Align */}
        <div className="max-w-4xl flex flex-col items-center md:items-start text-center md:text-left">
          {/* UPDATED PARAGRAPH: Bolder, Bigger, Specific Line Breaks */}
          <p className="text-2xl md:text-4xl font-bold text-ash-grey-100 mb-10 leading-tight max-w-3xl drop-shadow-xl">
            The leading horticultural <br />
            seed and seedlings <br />
            provider in Zimbabwe <br />
            that offers you <br />
            the best quality seedlings.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
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
