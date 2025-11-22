import { useState } from "react";
import { Plus, X } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";

export default function HeroSection() {
  const {
    data,
    loading,
    createItem,
    updateItem,
    deleteItem,
    fetchData,
    pagination,
  } = useCRUD("hero-sections");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    images: ["", "", ""],
    quotes: [
      { title: "", subtitle: "" },
      { title: "", subtitle: "" },
      { title: "", subtitle: "" },
    ],
    ctaText: "Explore Services",
    ctaLink: "/it-solutions",
    isActive: true,
    order: 0,
  });

  const columns = [
    {
      key: "images",
      label: "Images",
      render: (value) => `${value?.length || 0} images`,
    },
    {
      key: "quotes",
      label: "Quotes",
      render: (value) => `${value?.length || 0} quotes`,
    },
    {
      key: "isActive",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty images and quotes
    const cleanedData = {
      ...formData,
      images: formData.images.filter((img) => img.trim()),
      quotes: formData.quotes.filter(
        (q) => q.title.trim() && q.subtitle.trim()
      ),
    };

    const result = editingItem
      ? await updateItem(editingItem.id, cleanedData)
      : await createItem(cleanedData);

    if (result.success) handleCloseModal();
  };

  const handleEdit = (item) => {
    setEditingItem(item);

    // Parse images and quotes if they are strings
    const parseImages = (imgs) => {
      try {
        if (typeof imgs === "string") {
          return JSON.parse(imgs);
        }
        return Array.isArray(imgs) ? imgs : ["", "", ""];
      } catch (error) {
        console.error("Error parsing images:", error);
        return ["", "", ""];
      }
    };

    const parseQuotes = (quotes) => {
      try {
        if (typeof quotes === "string") {
          return JSON.parse(quotes);
        }
        return Array.isArray(quotes)
          ? quotes
          : [
              { title: "", subtitle: "" },
              { title: "", subtitle: "" },
              { title: "", subtitle: "" },
            ];
      } catch (error) {
        console.error("Error parsing quotes:", error);
        return [
          { title: "", subtitle: "" },
          { title: "", subtitle: "" },
          { title: "", subtitle: "" },
        ];
      }
    };

    setFormData({
      images: parseImages(item.images),
      quotes: parseQuotes(item.quotes),
      ctaText: item.ctaText || "Explore Services",
      ctaLink: item.ctaLink || "/it-solutions",
      isActive: item.isActive,
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      images: ["", "", ""],
      quotes: [
        { title: "", subtitle: "" },
        { title: "", subtitle: "" },
        { title: "", subtitle: "" },
      ],
      ctaText: "Explore Services",
      ctaLink: "/it-solutions",
      isActive: true,
      order: 0,
    });
  };

  const updateImage = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const updateQuote = (index, field, value) => {
    const newQuotes = [...formData.quotes];
    newQuotes[index] = { ...newQuotes[index], [field]: value };
    setFormData({ ...formData, quotes: newQuotes });
  };

  const addQuote = () => {
    setFormData({
      ...formData,
      quotes: [...formData.quotes, { title: "", subtitle: "" }],
    });
  };

  const removeQuote = (index) => {
    const newQuotes = formData.quotes.filter((_, i) => i !== index);
    setFormData({ ...formData, quotes: newQuotes });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Hero Section</h1>
          <p className="text-gray-600 mt-1">Manage homepage hero carousel</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Hero Section</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(item) => deleteItem(item.id)}
        pagination={pagination}
        onPageChange={(page) => fetchData(page, pagination.limit)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? "Edit Hero Section" : "Add Hero Section"}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          {/* Carousel Images */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Carousel Images (URLs)
              </label>
              <button
                type="button"
                onClick={addImage}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Image
              </button>
            </div>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <FormInput
                  placeholder={`Image ${index + 1} URL`}
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quotes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Quotes
              </label>
              <button
                type="button"
                onClick={addQuote}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Quote
              </button>
            </div>
            {formData.quotes.map((quote, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">
                    Quote {index + 1}
                  </h4>
                  {formData.quotes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuote(index)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <FormInput
                  label="Title"
                  value={quote.title}
                  onChange={(e) => updateQuote(index, "title", e.target.value)}
                  placeholder="e.g., Beyond Software — We Build Experiences"
                />
                <FormInput
                  label="Subtitle"
                  type="textarea"
                  value={quote.subtitle}
                  onChange={(e) =>
                    updateQuote(index, "subtitle", e.target.value)
                  }
                  placeholder="e.g., Crafting meaningful digital journeys..."
                />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="CTA Button Text"
              value={formData.ctaText}
              onChange={(e) =>
                setFormData({ ...formData, ctaText: e.target.value })
              }
            />
            <FormInput
              label="CTA Button Link"
              value={formData.ctaLink}
              onChange={(e) =>
                setFormData({ ...formData, ctaLink: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Order"
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
            />
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 text-primary-600 rounded"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-700"
              >
                Active
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              {editingItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
