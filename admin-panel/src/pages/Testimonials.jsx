import React, { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import DualImageUpload from "../components/DualImageUpload";
import useCRUD from "../hooks/useCRUD";

export default function Testimonials() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("testimonials");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    image: null,
    isActive: true,
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "rating", label: "Rating", render: (value) => "⭐".repeat(value) },
    {
      key: "isActive",
      label: "Active",
      render: (value) => (value ? "✓" : "✗"),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is a file (upload) or string (URL)
    const isFileUpload = formData.image instanceof File;

    if (isFileUpload) {
      // Use FormData for file uploads
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData[key] instanceof File) {
          submitData.append("image", formData[key]);
        } else if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });

      const result = editingItem
        ? await updateItem(editingItem.id, submitData, true)
        : await createItem(submitData, true);
      if (result.success) handleCloseModal();
    } else {
      // Use JSON for URL submissions
      const submitData = { ...formData };

      const result = editingItem
        ? await updateItem(editingItem.id, submitData, false)
        : await createItem(submitData, false);
      if (result.success) handleCloseModal();
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      position: item.position,
      company: item.company,
      content: item.content,
      rating: item.rating,
      image: item.image || null,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      position: "",
      company: "",
      content: "",
      rating: 5,
      image: null,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage client testimonials</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(item) => deleteItem(item.id)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <DualImageUpload
            label="Client Photo / Company Logo"
            name="image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />

          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormInput
            label="Position"
            name="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            required
          />
          <FormInput
            label="Company"
            name="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            required
          />
          <FormInput
            label="Testimonial"
            type="textarea"
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          />
          <FormInput
            label="Rating"
            type="number"
            name="rating"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: parseInt(e.target.value) })
            }
            min="1"
            max="5"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-primary-600 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
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
