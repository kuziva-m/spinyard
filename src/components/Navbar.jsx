import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Sprout } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Locations", href: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-ash-grey-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-olive-leaf-100 p-2 rounded-md group-hover:bg-olive-leaf-200 transition-colors">
                <Sprout
                  className="h-6 w-6 text-olive-leaf-700"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-ash-grey-900 leading-tight tracking-tight">
                  Spinyard
                </span>
                <span className="text-[10px] uppercase tracking-wider text-olive-leaf-700 font-medium">
                  Seedlings
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 border-b-2 py-1 ${
                  isActive(item.href)
                    ? "border-olive-leaf-600 text-ash-grey-900"
                    : "border-transparent text-ash-grey-600 hover:text-olive-leaf-700 hover:border-olive-leaf-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Call to Action (Desktop) */}
          <div className="hidden md:flex md:items-center">
            <a
              href="tel:+263772209434"
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-olive-leaf-700 hover:bg-olive-leaf-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-leaf-500 transition-colors shadow-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-ash-grey-500 hover:text-olive-leaf-700 hover:bg-ash-grey-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-olive-leaf-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-ash-grey-50 border-t border-ash-grey-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? "bg-olive-leaf-50 text-olive-leaf-700"
                    : "text-ash-grey-700 hover:bg-white hover:text-olive-leaf-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:+263772209434"
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-olive-leaf-700 hover:bg-olive-leaf-800"
            >
              <Phone className="h-5 w-5" />
              Call Agronomist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
