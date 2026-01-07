import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import images relative to this component
import tomatoseedlings from "../../assets/tomato-seedlings.jpg";
import cabbageseedlings from "../../assets/cabbage-seedlings.jpg";
import pepperseedlings from "../../assets/pepper-seedlings.jpg";
import slide2 from "../../assets/slide-2.jpg"; // Using slide2 for leafy veg as per your code

export default function Categories() {
  return (
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
          { name: "Tomatoes", img: tomatoseedlings },
          { name: "Leafy Veg", img: slide2 },
          { name: "Cabbages", img: cabbageseedlings },
          { name: "Peppers", img: pepperseedlings },
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
  );
}
