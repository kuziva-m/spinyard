import {
  MapPin,
  Phone,
  Clock,
  Sprout,
  UserCheck,
  Calendar,
} from "lucide-react";

export default function VisitUs() {
  return (
    <div className="min-h-screen bg-soft-linen-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-ash-grey-900 mb-6">
            Visit Our <span className="text-olive-leaf-600">Nurseries</span>
          </h1>
          <p className="text-lg text-ash-grey-600 max-w-2xl mx-auto leading-relaxed">
            Ready to start your farming journey? Come select your seedlings in
            person and get expert advice from our team. We have two convenient
            locations stocked with Zimbabwe's best quality seedlings.
          </p>
        </div>

        {/* LOCATIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* MEYRICK PARK CARD */}
          <div className="bg-white rounded-2xl shadow-md border border-ash-grey-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-ash-grey-900 py-6 px-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-olive-leaf-400" /> Meyrick Park Nursery
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <p className="font-bold text-ash-grey-900 uppercase tracking-wide text-sm">
                  Location
                </p>
                <p className="text-ash-grey-600">
                  Meyrick Park, Harare <br />
                  <span className="text-xs italic text-ash-grey-400">
                    (Near Meyrick Park Primary School)
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-ash-grey-900 uppercase tracking-wide text-sm">
                  Contact & Orders
                </p>
                <a
                  href="tel:+263772209434"
                  className="flex items-center gap-2 text-olive-leaf-600 font-bold hover:underline text-lg"
                >
                  <Phone size={20} /> 0772 209 434
                </a>
              </div>

              <div className="p-4 bg-soft-linen-100 rounded-lg border border-soft-linen-200">
                <p className="text-sm font-semibold text-ash-grey-700 mb-2 flex items-center gap-2">
                  <Sprout size={16} /> Specialties In Stock:
                </p>
                <p className="text-sm text-ash-grey-600 leading-relaxed">
                  Tomatoes (Star 9037, Trinity), Cabbage (Gemma Plus), Peppers,
                  Lettuce, and Fruit Trees (Paw Paw, Strawberry).
                </p>
              </div>
            </div>
          </div>

          {/* UMWINSDALE CARD */}
          <div className="bg-white rounded-2xl shadow-md border border-ash-grey-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-olive-leaf-700 py-6 px-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-white" /> Umwinsdale Nursery
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <p className="font-bold text-ash-grey-900 uppercase tracking-wide text-sm">
                  Location
                </p>
                <p className="text-ash-grey-600">
                  Umwinsdale, Harare <br />
                  <span className="text-xs italic text-ash-grey-400">
                    (Along Enterprise Road area)
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-ash-grey-900 uppercase tracking-wide text-sm">
                  Contact & Orders
                </p>
                <a
                  href="tel:+263712795942"
                  className="flex items-center gap-2 text-olive-leaf-600 font-bold hover:underline text-lg"
                >
                  <Phone size={20} /> 0712 795 942
                </a>
              </div>

              <div className="p-4 bg-soft-linen-100 rounded-lg border border-soft-linen-200">
                <p className="text-sm font-semibold text-ash-grey-700 mb-2 flex items-center gap-2">
                  <Sprout size={16} /> Specialties In Stock:
                </p>
                <p className="text-sm text-ash-grey-600 leading-relaxed">
                  Leafy Vegetables (Rape, Covo, Spinach), Herbs (Basil, Thyme),
                  and bulk Field Crops.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* INFO SECTION: HOURS & EXPERTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* EXPERT SUPPORT */}
          <div className="md:col-span-2 bg-gradient-to-br from-olive-leaf-50 to-white p-8 rounded-2xl border border-olive-leaf-100">
            <div className="flex items-start gap-4">
              <div className="bg-olive-leaf-100 p-3 rounded-lg text-olive-leaf-700">
                <UserCheck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ash-grey-900 mb-2">
                  Need Expert Advice?
                </h3>
                <p className="text-ash-grey-600 mb-4">
                  We don't just sell seeds; we help you grow. Our agronomists
                  are available to provide personalized guidance for your
                  specific farming needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/263785882984"
                    className="inline-flex items-center gap-2 font-bold text-ash-grey-800 bg-white px-4 py-2 rounded-lg border border-ash-grey-200 shadow-sm hover:border-olive-leaf-500 hover:text-olive-leaf-600 transition-colors"
                  >
                    <Phone size={16} /> 078 588 2984
                  </a>
                  <a
                    href="https://wa.me/263778912327"
                    className="inline-flex items-center gap-2 font-bold text-ash-grey-800 bg-white px-4 py-2 rounded-lg border border-ash-grey-200 shadow-sm hover:border-olive-leaf-500 hover:text-olive-leaf-600 transition-colors"
                  >
                    <Phone size={16} /> 077 891 2327
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* OPENING HOURS */}
          <div className="bg-ash-grey-900 text-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-olive-leaf-400" size={24} />
              <h3 className="text-xl font-bold">Opening Hours</h3>
            </div>
            <ul className="space-y-3 text-ash-grey-300 text-sm">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon - Fri</span>
                <span className="font-bold text-white">8:00 AM - 4:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Saturday</span>
                {/* UPDATED TIME HERE */}
                <span className="font-bold text-white">8:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Sunday</span>
                <span className="text-red-300 font-medium">Closed</span>
              </li>
            </ul>
            <div className="mt-6 flex items-start gap-2 text-xs text-ash-grey-400 bg-white/5 p-3 rounded">
              <Calendar size={14} className="mt-0.5 flex-shrink-0" />
              <p>
                We observe major public holidays including Heroes' Day &
                National Youth Day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
