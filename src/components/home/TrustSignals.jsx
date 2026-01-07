import { ShieldCheck, Sun, Sprout } from "lucide-react";

export default function TrustSignals() {
  return (
    <section className="rounded-2xl p-8 md:p-12 bg-gradient-to-b from-ash-grey-900 to-[#051808] shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          {
            icon: ShieldCheck,
            title: "Disease-Free Certified",
            desc: "Grown in sterile media to ensure your crop starts clean and stays healthy.",
          },
          {
            icon: Sun,
            title: "Properly Hardened",
            desc: "Acclimatized to full sun before sale to reduce transplant shock in your field.",
          },
          {
            icon: Sprout,
            title: "High-Yield Varieties",
            desc: "We stock premium hybrids like Star 9037 and Trinity known for local performance.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/5"
          >
            <div className="h-14 w-14 bg-soft-linen-100 rounded-lg flex items-center justify-center mb-5 text-olive-leaf-700 border border-soft-linen-200">
              <feature.icon strokeWidth={1.5} size={32} />
            </div>
            <h3 className="text-xl font-bold text-ash-grey-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-ash-grey-600 leading-relaxed text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
