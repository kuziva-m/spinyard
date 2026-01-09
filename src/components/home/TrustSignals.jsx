import { useState, useEffect } from "react";

// IMPORT BACKGROUND IMAGES (For the back of the card)
import diseaseFreeImg from "../../assets/disease-free.jpg";
import hardenedImg from "../../assets/hardened.jpg";
import highYieldImg from "../../assets/high-yeild.jpg";

// IMPORT ICON IMAGES (For the front of the card)
import diseaseFreeIcon from "../../assets/disease-free-icon.jpg";
import hardenedIcon from "../../assets/hardened-icon.jpg";
import highYieldIcon from "../../assets/high-yeild-icon.jpg";

export default function TrustSignals() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setFlippedIndex(currentIndex);
      setTimeout(() => {
        setFlippedIndex(null);
      }, 3000);
      currentIndex = (currentIndex + 1) % 3;
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Disease-Free Certified",
      desc: "Grown in sterile media to ensure your crop starts clean and stays healthy.",
      img: diseaseFreeImg, // Back Image
      iconImg: diseaseFreeIcon, // Front Icon Image
    },
    {
      title: "Properly Hardened",
      desc: "Acclimatized to full sun before sale to reduce transplant shock in your field.",
      img: hardenedImg,
      iconImg: hardenedIcon,
    },
    {
      title: "High-Yield Varieties",
      desc: "We stock premium hybrids like Star 9037 and Trinity known for local performance.",
      img: highYieldImg,
      iconImg: highYieldIcon,
    },
  ];

  return (
    <section className="relative w-screen -ml-[50vw] left-[50%] py-12 md:py-24 bg-gradient-to-b from-ash-grey-900 to-[#051808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why Choose Us
          </h2>
          <div className="h-1 w-20 bg-olive-leaf-600 mx-auto mt-4 rounded-full opacity-80" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 max-w-sm mx-auto md:max-w-none">
          {features.map((feature, idx) => {
            const isFlipped = flippedIndex === idx;

            return (
              <div key={idx} className="group h-full [perspective:1000px]">
                <div
                  className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-white/5 h-full [backface-visibility:hidden] flex items-center gap-4">
                    {/* LEFT SECTION: ICON IMAGE */}
                    {/* UPDATED: Removed green glow, added standard 'shadow-md' */}
                    <div className="flex-shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-lg overflow-hidden border-2 border-olive-leaf-100 shadow-md">
                      <img
                        src={feature.iconImg}
                        alt={feature.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* RIGHT SECTION: TEXT */}
                    <div className="flex-1 text-center">
                      <h3 className="text-xl md:text-2xl font-bold text-ash-grey-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-ash-grey-600 leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 h-full w-full rounded-xl overflow-hidden shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-white font-bold text-lg">
                        {feature.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
