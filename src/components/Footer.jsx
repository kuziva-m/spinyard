import { Link } from "react-router-dom";
import { Facebook, MapPin, Mail } from "lucide-react";
import logo from "../assets/header-logo.png";

export default function Footer() {
  return (
    <footer className="bg-ash-grey-900 text-ash-grey-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <img
                src={logo}
                alt="Spinyard Seedlings"
                className="h-14 w-auto object-contain bg-white/5 p-2 rounded-lg"
              />
            </div>

            <p className="text-sm text-ash-grey-400 mb-6 leading-relaxed">
              Premium, disease-free seedlings for the Zimbabwean farmer. Grown
              with expertise, hardened for resilience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Spinyardseedlings/"
                target="_blank"
                rel="noreferrer"
                className="text-ash-grey-400 hover:text-olive-leaf-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links - UPDATED CATEGORIES */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products?category=Tomatoes"
                  className="text-sm hover:text-white transition-colors"
                >
                  Tomatoes
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Cabbages"
                  className="text-sm hover:text-white transition-colors"
                >
                  Cabbages
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Leafy%20Vegetables"
                  className="text-sm hover:text-white transition-colors"
                >
                  Leafy Vegetables
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Fruit%20Trees"
                  className="text-sm hover:text-white transition-colors"
                >
                  Fruit Trees
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Locations
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-olive-leaf-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong className="block text-white">Meyrick Park</strong>
                  0772 209 434
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-olive-leaf-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong className="block text-white">Umwinsdale</strong>
                  0712 795 942
                </span>
              </li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-ash-grey-500" />
                <a
                  href="mailto:info@spinyard.co.zw"
                  className="hover:text-white"
                >
                  info@spinyard.co.zw
                </a>
              </li>
              <li className="text-sm text-ash-grey-500">
                <span className="block mb-1 text-ash-grey-400">
                  Opening Hours:
                </span>
                Mon - Fri: 8:00am - 4:30pm
                <br />
                {/* UPDATED TIME HERE */}
                Sat: 8:00am - 2:00pm
                <br />
                Sun: Closed
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ash-grey-800">
          <p className="text-xs text-ash-grey-500 text-center">
            &copy; {new Date().getFullYear()} Spinyard Seedlings Zimbabwe. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
