import React, { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import DualImageUpload from "../components/DualImageUpload";
import useCRUD from "../hooks/useCRUD";

export default function Services() {
  const {
    data,
    loading,
    pagination,
    changePage,
    createItem,
    updateItem,
    deleteItem,
  } = useCRUD("services");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "web-development",
    isActive: true,
    isFeatured: false,
    image: null,
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "isActive",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "isFeatured",
      label: "Featured",
      render: (value) => (value ? "⭐" : "-"),
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
        ? await updateItem(editingitem.id, submitData, true)
        : await createItem(submitData, true);
      if (result.success) handleCloseModal();
    } else {
      // Use JSON for URL submissions
      const submitData = { ...formData };

      const result = editingItem
        ? await updateItem(editingitem.id, submitData, false)
        : await createItem(submitData, false);
      if (result.success) handleCloseModal();
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      shortDescription: item.shortDescription || "",
      category: item.category,
      isActive: item.isActive,
      isFeatured: item.isFeatured,
      image: item.image || null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      shortDescription: "",
      category: "web-development",
      isActive: true,
      isFeatured: false,
      image: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Services</h1>
          <p className="text-gray-600 mt-1">Manage your services</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={changePage}
        onEdit={handleEdit}
        onDelete={(item) => deleteItem(item.id)}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? "Edit Service" : "Add Service"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <DualImageUpload
            label="Service Image"
            name="image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />

          <FormInput
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
          />

          <FormInput
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <FormInput
            label="Category"
            type="select"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            options={[
              { value: "web-development", label: "Web Development" },
              { value: "mobile-app", label: "Mobile App" },
              { value: "cloud-solutions", label: "Cloud Solutions" },
              { value: "it-consulting", label: "IT Consulting" },
              { value: "crm", label: "CRM" },
              { value: "other", label: "Other" },
            ]}
          />

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured
              </span>
            </label>
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
