import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Admin from "./pages/Admin";

// Temporary placeholders for pages we haven't built yet
const Services = () => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold text-ash-grey-900">Agronomy Services</h1>
    <p className="text-ash-grey-600 mt-2">Coming in the next step...</p>
  </div>
);
const Contact = () => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold text-ash-grey-900">
      Locations & Contact
    </h1>
    <p className="text-ash-grey-600 mt-2">Coming in the next step...</p>
  </div>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
