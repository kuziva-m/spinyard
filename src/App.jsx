import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

// -- TEMPORARY PLACEHOLDERS (To prevent build errors until we create these files) --
const Catalog = () => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold text-ash-grey-900">Product Catalog</h1>
    <p className="text-ash-grey-600 mt-2">Coming in the next step...</p>
  </div>
);
const Services = () => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold text-ash-grey-900">Agronomy Services</h1>
    <p className="text-ash-grey-600 mt-2">Coming soon...</p>
  </div>
);
const Contact = () => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold text-ash-grey-900">
      Locations & Contact
    </h1>
    <p className="text-ash-grey-600 mt-2">Coming soon...</p>
  </div>
);
// --------------------------------------------------------------------------------

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
