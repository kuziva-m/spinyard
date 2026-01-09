import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  Trash2,
  Edit2,
  Plus,
  X,
  Search,
  Image as ImageIcon,
  Upload,
  Loader2,
  Save,
  Sprout,
  MousePointerClick,
} from "lucide-react";

const CATEGORIES = [
  "Tomatoes",
  "Leafy Vegetables",
  "Brassicas",
  "Herbs",
  "Fruit Trees",
  "Other",
];

const STORAGE_BUCKET = "product-images";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // EDITING / ADDING STATE
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  // SELECTION STATE FOR PASTING
  // Can be 'image_url' or 'plant_image_url' or null
  const [selectedUploadField, setSelectedUploadField] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Tomatoes",
    image_url: "",
    plant_image_url: "",
    available_meyrick: true,
    available_umwinsdale: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- PASTE LISTENER ---
  useEffect(() => {
    const handlePaste = (e) => {
      // Only paste if modal is open AND a specific field is selected
      if (!isEditing || !selectedUploadField) return;

      if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              // Upload specifically to the selected field
              uploadFile(file, selectedUploadField);
              e.preventDefault();
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [isEditing, selectedUploadField]); // Re-binds when selection changes

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      image_url: product.image_url,
      plant_image_url: product.plant_image_url || "",
      available_meyrick: product.available_meyrick,
      available_umwinsdale: product.available_umwinsdale,
    });
    setSelectedUploadField(null); // Reset selection
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: "Tomatoes",
      image_url: "",
      plant_image_url: "",
      available_meyrick: true,
      available_umwinsdale: true,
    });
    setSelectedUploadField(null); // Reset selection
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
    else alert("Error deleting product");
  };

  const uploadFile = async (file, fieldName) => {
    try {
      setUploading(true);
      const fileExt = file.name ? file.name.split(".").pop() : "png";
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, [fieldName]: data.publicUrl }));
    } catch (error) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let error;
    if (currentProduct) {
      const { error: updateError } = await supabase
        .from("products")
        .update(formData)
        .eq("id", currentProduct.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("products")
        .insert([formData]);
      error = insertError;
    }

    setLoading(false);
    if (!error) {
      setIsEditing(false);
      fetchProducts();
    } else {
      alert("Error saving product: " + error.message);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-soft-linen-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-ash-grey-900">
              Inventory Manager
            </h1>
            <p className="text-ash-grey-500">
              Manage stock, images, and availability.
            </p>
          </div>
          <button
            onClick={handleAddNewClick}
            className="flex items-center justify-center gap-2 bg-olive-leaf-600 text-white px-6 py-3 rounded-lg hover:bg-olive-leaf-700 transition-colors shadow-sm font-bold uppercase tracking-wide text-sm"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* SEARCH & STATS */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-ash-grey-200 mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ash-grey-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-ash-grey-50 border border-ash-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-leaf-500"
            />
          </div>
          <div className="text-sm font-medium text-ash-grey-600 hidden sm:block">
            Total Items: {products.length}
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="bg-white rounded-xl shadow-sm border border-ash-grey-200 overflow-hidden">
          {loading && !isEditing ? (
            <div className="p-12 flex justify-center text-olive-leaf-600">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-ash-grey-50 border-b border-ash-grey-200">
                <tr>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase tracking-wider">
                    Images
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase tracking-wider">
                    Product
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase tracking-wider text-center">
                    Availability
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ash-grey-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-ash-grey-50/50 transition-colors"
                  >
                    <td className="p-4 w-32">
                      <div className="flex gap-2">
                        <div className="h-12 w-12 bg-ash-grey-100 rounded-lg overflow-hidden border border-ash-grey-200">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-ash-grey-300">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        {product.plant_image_url && (
                          <div className="h-12 w-12 bg-olive-leaf-50 rounded-lg overflow-hidden border border-olive-leaf-200">
                            <img
                              src={product.plant_image_url}
                              alt="Mature Plant"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-ash-grey-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-ash-grey-100 text-ash-grey-600 rounded-md">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                            product.available_meyrick
                              ? "bg-olive-leaf-50 text-olive-leaf-700 border-olive-leaf-200"
                              : "bg-red-50 text-red-500 border-red-100"
                          }`}
                        >
                          Meyrick: {product.available_meyrick ? "ON" : "OFF"}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                            product.available_umwinsdale
                              ? "bg-terracotta-50 text-terracotta-700 border-terracotta-200"
                              : "bg-red-50 text-red-500 border-red-100"
                          }`}
                        >
                          Umwins: {product.available_umwinsdale ? "ON" : "OFF"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 text-ash-grey-500 hover:text-olive-leaf-600 hover:bg-olive-leaf-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-ash-grey-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* EDIT/ADD MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-ash-grey-50 border-b border-ash-grey-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-ash-grey-900">
                {currentProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-ash-grey-400 hover:text-ash-grey-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-ash-grey-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-ash-grey-300 rounded-lg focus:ring-2 focus:ring-olive-leaf-500 focus:border-olive-leaf-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-ash-grey-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-ash-grey-300 rounded-lg focus:ring-2 focus:ring-olive-leaf-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-ash-grey-100 my-4" />

              {/* SECTION: IMAGES */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase text-ash-grey-400 tracking-wider">
                    Product Imagery
                  </h3>
                  <span className="text-xs text-ash-grey-400 italic">
                    Click an image box to select for Paste (Ctrl+V)
                  </span>
                </div>

                {/* 1. PRIMARY IMAGE (SEEDLING) */}
                <div>
                  <label className="block text-sm font-bold text-ash-grey-700 mb-2">
                    1. Seedling Image (Primary)
                  </label>
                  <div className="flex items-center gap-4">
                    {/* CLICKABLE PREVIEW BOX */}
                    <div
                      onClick={() => setSelectedUploadField("image_url")}
                      className={`h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                        selectedUploadField === "image_url"
                          ? "border-2 border-red-500 ring-4 ring-red-100"
                          : "border border-ash-grey-200 bg-ash-grey-100 hover:border-ash-grey-400"
                      }`}
                    >
                      {formData.image_url ? (
                        <img
                          src={formData.image_url}
                          alt="Seedling"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex flex-col items-center justify-center text-ash-grey-400">
                          {selectedUploadField === "image_url" ? (
                            <MousePointerClick
                              className="text-red-500"
                              size={20}
                            />
                          ) : (
                            <ImageIcon size={20} />
                          )}
                        </div>
                      )}
                    </div>

                    {/* MANUAL UPLOAD BUTTON */}
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-ash-grey-300 rounded-lg hover:bg-ash-grey-50 transition-colors text-sm font-medium text-ash-grey-700">
                      {uploading ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <Upload size={16} />
                      )}
                      Upload Seedling
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          uploadFile(e.target.files[0], "image_url")
                        }
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>

                {/* 2. SECONDARY IMAGE (MATURE PLANT) */}
                <div>
                  <label className="block text-sm font-bold text-olive-leaf-600 mb-2 flex items-center gap-2">
                    <Sprout size={16} /> 2. Mature Plant Image (Optional)
                  </label>

                  <div className="flex items-center gap-4">
                    {/* CLICKABLE PREVIEW BOX */}
                    <div
                      onClick={() => setSelectedUploadField("plant_image_url")}
                      className={`h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                        selectedUploadField === "plant_image_url"
                          ? "border-2 border-red-500 ring-4 ring-red-100"
                          : "border border-olive-leaf-200 bg-olive-leaf-50 hover:border-olive-leaf-400"
                      }`}
                    >
                      {formData.plant_image_url ? (
                        <img
                          src={formData.plant_image_url}
                          alt="Mature Plant"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-olive-leaf-300">
                          {selectedUploadField === "plant_image_url" ? (
                            <MousePointerClick
                              className="text-red-500"
                              size={20}
                            />
                          ) : (
                            <Sprout size={20} />
                          )}
                        </div>
                      )}
                    </div>

                    {/* MANUAL UPLOAD BUTTON */}
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-olive-leaf-50 border border-olive-leaf-200 rounded-lg hover:bg-olive-leaf-100 transition-colors text-sm font-medium text-olive-leaf-700">
                      {uploading ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <Upload size={16} />
                      )}
                      Upload Mature Plant
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          uploadFile(e.target.files[0], "plant_image_url")
                        }
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-ash-grey-100 my-4" />

              {/* Availability Toggles */}
              <div>
                <h3 className="text-xs font-bold uppercase text-ash-grey-400 tracking-wider mb-2">
                  Inventory Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 border border-ash-grey-200 rounded-lg cursor-pointer hover:bg-ash-grey-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.available_meyrick}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          available_meyrick: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-olive-leaf-600 rounded focus:ring-olive-leaf-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-ash-grey-900">
                        Meyrick Park
                      </span>
                      <span className="text-xs text-ash-grey-500">
                        In Stock
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-ash-grey-200 rounded-lg cursor-pointer hover:bg-ash-grey-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.available_umwinsdale}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          available_umwinsdale: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-terracotta-600 rounded focus:ring-terracotta-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-ash-grey-900">
                        Umwinsdale
                      </span>
                      <span className="text-xs text-ash-grey-500">
                        In Stock
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-ash-grey-600 hover:bg-ash-grey-100 rounded-lg font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="px-6 py-2 bg-olive-leaf-600 text-white rounded-lg hover:bg-olive-leaf-700 font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
