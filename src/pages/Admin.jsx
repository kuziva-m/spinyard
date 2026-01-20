import { useState } from "react";
import ProductManager from "../components/admin/ProductManager";
import EmailManager from "../components/admin/EmailManager";
import { Package, Mail, LogOut } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("inventory"); // 'inventory' | 'email'

  return (
    <div className="min-h-screen bg-soft-linen-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* DASHBOARD HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-ash-grey-900">
            Admin Dashboard
          </h1>
          <p className="text-ash-grey-500">
            Manage your inventory and communications.
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-8 border-b border-ash-grey-200">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 px-4 flex items-center gap-2 font-bold text-sm transition-colors border-b-2 ${
              activeTab === "inventory"
                ? "border-olive-leaf-600 text-olive-leaf-600"
                : "border-transparent text-ash-grey-500 hover:text-ash-grey-700"
            }`}
          >
            <Package size={18} /> Inventory
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`pb-3 px-4 flex items-center gap-2 font-bold text-sm transition-colors border-b-2 ${
              activeTab === "email"
                ? "border-olive-leaf-600 text-olive-leaf-600"
                : "border-transparent text-ash-grey-500 hover:text-ash-grey-700"
            }`}
          >
            <Mail size={18} /> Email Center
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === "inventory" ? <ProductManager /> : <EmailManager />}
        </div>
      </div>
    </div>
  );
}
