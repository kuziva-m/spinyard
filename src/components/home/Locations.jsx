import { MapPin } from "lucide-react";

export default function Locations() {
  return (
    <section className="bg-soft-linen-100 rounded-2xl p-8 md:p-12 border border-soft-linen-200">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-ash-grey-900 tracking-tight mb-4">
          Visit Our Nurseries
        </h2>
        <p className="text-ash-grey-600">
          Come select your seedlings in person. Our teams at both locations are
          ready to assist you.
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
  );
}
