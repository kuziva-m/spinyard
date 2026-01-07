import { CheckCircle2 } from "lucide-react";

export default function AgronomistCTA() {
  return (
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
  );
}
