import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
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
  "Cabbages",
  "Peppers",
  "Leafy Vegetables",
  "Lettuce",
  "Beetroot",
  "Herbs",
  "Fruit Trees",
  "Other",
];

const STORAGE_BUCKET = "product-images";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  useEffect(() => {
    const handlePaste = (e) => {
      if (!isEditing || !selectedUploadField) return;
      if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              uploadFile(file, selectedUploadField);
              e.preventDefault();
            }
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [isEditing, selectedUploadField]);

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
    setSelectedUploadField(null);
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
    setSelectedUploadField(null);
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
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ash-grey-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-ash-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-leaf-500"
          />
        </div>
        <button
          onClick={handleAddNewClick}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-olive-leaf-600 text-white px-6 py-2 rounded-lg hover:bg-olive-leaf-700 transition-colors font-bold text-sm"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-ash-grey-200 overflow-hidden">
        {loading && !isEditing ? (
          <div className="p-12 flex justify-center text-olive-leaf-600">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-ash-grey-50 border-b border-ash-grey-200">
                <tr>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase">
                    Images
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase">
                    Product
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase hidden sm:table-cell">
                    Category
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase text-center">
                    Stock
                  </th>
                  <th className="p-4 font-semibold text-ash-grey-600 text-sm uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ash-grey-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-ash-grey-50/50">
                    <td className="p-4 w-32">
                      <div className="flex gap-2">
                        <div className="h-10 w-10 bg-ash-grey-100 rounded border border-ash-grey-200 overflow-hidden">
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt="Main"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        {product.plant_image_url && (
                          <div className="h-10 w-10 bg-olive-leaf-50 rounded border border-olive-leaf-200 overflow-hidden">
                            <img
                              src={product.plant_image_url}
                              alt="Mature"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-ash-grey-900">
                      {product.name}
                    </td>
                    <td className="p-4 hidden sm:table-cell text-sm text-ash-grey-600">
                      {product.category}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${product.available_meyrick ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-100"}`}
                        >
                          Meyrick
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${product.available_umwinsdale ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-100"}`}
                        >
                          Umwins
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 text-olive-leaf-600 hover:bg-olive-leaf-50 rounded"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT/ADD MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 bg-ash-grey-50 border-b border-ash-grey-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-ash-grey-900">
                {currentProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setIsEditing(false)}>
                <X size={24} className="text-ash-grey-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <input
                type="text"
                required
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="space-y-4 pt-2">
                {/* Image 1 */}
                <div
                  onClick={() => setSelectedUploadField("image_url")}
                  className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors flex items-center gap-4 ${selectedUploadField === "image_url" ? "border-olive-leaf-500 bg-olive-leaf-50" : "border-ash-grey-300 hover:border-ash-grey-400"}`}
                >
                  <div className="h-16 w-16 bg-ash-grey-100 rounded overflow-hidden flex-shrink-0">
                    {formData.image_url ? (
                      <img
                        src={formData.image_url}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <ImageIcon className="text-ash-grey-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ash-grey-700">
                      Primary Image (Seedling)
                    </p>
                    <p className="text-xs text-ash-grey-500">
                      Click to select, then Ctrl+V to paste
                    </p>
                  </div>
                </div>

                {/* Image 2 */}
                <div
                  onClick={() => setSelectedUploadField("plant_image_url")}
                  className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors flex items-center gap-4 ${selectedUploadField === "plant_image_url" ? "border-olive-leaf-500 bg-olive-leaf-50" : "border-ash-grey-300 hover:border-ash-grey-400"}`}
                >
                  <div className="h-16 w-16 bg-ash-grey-100 rounded overflow-hidden flex-shrink-0">
                    {formData.plant_image_url ? (
                      <img
                        src={formData.plant_image_url}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Sprout className="text-olive-leaf-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ash-grey-700">
                      Secondary Image (Mature)
                    </p>
                    <p className="text-xs text-ash-grey-500">
                      Click to select, then Ctrl+V to paste
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available_meyrick}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        available_meyrick: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-bold">Meyrick Park</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available_umwinsdale}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        available_umwinsdale: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-bold">Umwinsdale</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full py-3 bg-olive-leaf-600 text-white font-bold rounded-lg hover:bg-olive-leaf-700 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}{" "}
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
