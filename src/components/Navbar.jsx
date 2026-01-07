import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import logo from "../assets/header-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Visit Us", href: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 font-sans ${
          scrolled
            ? "bg-soft-linen-50/95 backdrop-blur-sm border-b border-olive-leaf-600/10 py-2 shadow-sm"
            : "bg-soft-linen-50 border-b border-transparent py-2 md:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* 1. BRANDING */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={logo}
                  alt="Spinyard"
                  className={`w-auto object-contain transition-all duration-300 ${
                    scrolled ? "h-10 md:h-16" : "h-12 md:h-20"
                  }`}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden flex-col">
                  <span className="font-extrabold text-xl text-ash-grey-900 leading-none">
                    Spinyard
                  </span>
                </div>
              </Link>
            </div>

            {/* 2. DESKTOP NAVIGATION */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-olive-leaf-600"
                      : "text-ash-grey-500 hover:text-ash-grey-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* 3. ACTIONS */}
            <div className="flex items-center gap-4">
              {/* DESKTOP: Order Button */}
              <a
                href="https://wa.me/263772209434"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-ash-grey-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-olive-leaf-600 transition-colors shadow-md"
              >
                <span>Order Now</span>
              </a>

              {/* MOBILE: "CATALOG" LINK 
                  - Reverted to rounded-md shape.
                  - Changed color to solid gradient background with white text.
              */}
              <Link
                to="/products"
                className="md:hidden flex items-center justify-center px-3 py-2 bg-gradient-to-b from-[#07a91f] to-[#0a5b19] text-white text-xs font-black uppercase tracking-widest rounded-md shadow-sm active:scale-95 transition-transform"
              >
                Catalog
              </Link>

              {/* MOBILE: CUSTOM TOGGLE */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-ash-grey-900 hover:text-olive-leaf-600 focus:outline-none group"
                aria-label="Toggle menu"
              >
                <div className="w-8 h-8 flex flex-col justify-center items-end gap-1.5 relative">
                  <span
                    className={`h-[2.5px] bg-current rounded-full transition-all duration-300 ease-out ${
                      isOpen
                        ? "w-6 absolute top-1/2 -translate-y-1/2 rotate-45"
                        : "w-6"
                    }`}
                  />
                  <span
                    className={`h-[2.5px] bg-current rounded-full transition-all duration-300 ease-out ${
                      isOpen
                        ? "w-6 absolute top-1/2 -translate-y-1/2 -rotate-45"
                        : "w-4 group-hover:w-6"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-soft-linen-50 pt-28 px-6 font-sans animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-bold tracking-tight ${
                  isActive(item.href)
                    ? "text-olive-leaf-600"
                    : "text-ash-grey-900"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <hr className="border-ash-grey-200 w-20" />

            <div className="flex flex-col gap-4">
              <a
                href="tel:+263772209434"
                className="flex items-center gap-3 text-lg font-medium text-ash-grey-600"
              >
                <Phone size={20} className="text-olive-leaf-600" />
                0772 209 434
              </a>
              <a
                href="/contact"
                className="flex items-center gap-3 text-lg font-medium text-ash-grey-600"
              >
                <MapPin size={20} className="text-olive-leaf-600" />
                Locate Nurseries
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
