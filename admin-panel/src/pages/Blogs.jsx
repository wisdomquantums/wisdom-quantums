import React, { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import DualImageUpload from "../components/DualImageUpload";
import useCRUD from "../hooks/useCRUD";

export default function Blogs() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("blogs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "technology",
    isPublished: false,
    image: null,
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "isPublished",
      label: "Published",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value ? "Published" : "Draft"}
        </span>
      ),
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
      title: item.title,
      content: item.content,
      excerpt: item.excerpt || "",
      category: item.category,
      isPublished: item.isPublished,
      image: item.image || null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "technology",
      isPublished: false,
      image: null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Blogs</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Blog</span>
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
        title={editingItem ? "Edit Blog" : "Add Blog"}
        size="lg"
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
            label="Blog Image"
            name="image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />

          <FormInput
            label="Excerpt"
            type="textarea"
            name="excerpt"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
          />
          <FormInput
            label="Content"
            type="textarea"
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            rows={8}
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
              { value: "technology", label: "Technology" },
              { value: "business", label: "Business" },
              { value: "development", label: "Development" },
              { value: "design", label: "Design" },
            ]}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) =>
                setFormData({ ...formData, isPublished: e.target.checked })
              }
              className="w-4 h-4 text-primary-600 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Publish</span>
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
