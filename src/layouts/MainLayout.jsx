import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-soft-linen-50 font-sans text-ash-grey-900 antialiased selection:bg-olive-leaf-200 selection:text-olive-leaf-900">
      <Navbar />

      {/* Main Content Area 
        flex-grow pushes the footer to the bottom even on short pages
      */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>

      <Footer />
    </div>
  );
}
