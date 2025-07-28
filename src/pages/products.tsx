import { useState, useRef } from "react";
import { Menu, Plus } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"; // ✅ added sidebar hook
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Products = () => {
  const { toggleSidebar } = useSidebar(); // ✅ used sidebar toggle
  const [products, setProducts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    type: "",
    imageUrls: [] as string[],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    type: "",
  });

  const handleAddProduct = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      description: formData.description ? "" : "Description is required",
      price: formData.price ? "" : "Price is required",
      category: formData.category ? "" : "Category is required",
      type: formData.type ? "" : "Type is required",
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category,
      type: formData.type,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "You",
    };

    setProducts([...products, newProduct]);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      type: "",
      imageUrls: [],
    });

    setErrors({
      name: "",
      description: "",
      price: "",
      category: "",
      type: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    }
  };

  const removeImage = (index: number) => {
    const updated = formData.imageUrls.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      imageUrls: updated,
    }));
    if (updated.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6">
      {/* ✅ Hamburger + Heading */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Products</h2>
        </div>

        {/* Add Product Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`border rounded-md px-3 py-2 text-sm w-full resize-y ${
                  errors.description ? "border-red-500" : ""
                }`}
                rows={3}
                style={{ minHeight: "50px", maxHeight: "150px" }}
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}

              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price}</p>
              )}

              <div className="flex gap-2">
                <div className="w-1/2">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full border rounded-md px-3 py-2 text-sm text-gray-700 ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Books">Books</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs">{errors.category}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <Input
                    placeholder="Type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className={errors.type ? "border-red-500" : ""}
                  />
                  {errors.type && (
                    <p className="text-red-500 text-xs">{errors.type}</p>
                  )}
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                className="border rounded-md px-3 py-2 text-sm"
              />

              {formData.imageUrls.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt="Preview"
                        className="h-24 w-24 object-cover rounded"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handleAddProduct}
                disabled={
                  !formData.name ||
                  !formData.description ||
                  !formData.price ||
                  !formData.category ||
                  !formData.type
                }
                className="cursor-pointer"
              >
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto border rounded-md shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Sr.</th>
              <th className="px-4 py-2 border-b">Product Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Type</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Created By</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted-foreground py-4">
                  No data found
                </td>
              </tr>
            ) : (
              products.map((prod, index) => (
                <tr key={prod.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{prod.name}</td>
                  <td className="px-4 py-2">{prod.category}</td>
                  <td className="px-4 py-2">{prod.type}</td>
                  <td className="px-4 py-2">{prod.createdAt}</td>
                  <td className="px-4 py-2">{prod.createdBy}</td>
                  <td className="px-4 py-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2 cursor-pointer"
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="cursor-pointer">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
