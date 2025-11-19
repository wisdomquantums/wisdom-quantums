import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import DualImageUpload from "../components/DualImageUpload";
import useCRUD from "../hooks/useCRUD";

export default function ITSolutions() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("it-solutions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    isActive: true,
    order: 0,
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "order", label: "Order" },
    {
      key: "isActive",
      label: "Active",
      render: (value) => (value ? "✓" : "✗"),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFileUpload = formData.image instanceof File;

    if (isFileUpload) {
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
      description: item.description || "",
      category: item.category || "",
      image: item.image || null,
      isActive: item.isActive,
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      image: null,
      isActive: true,
      order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">IT Solutions</h1>
          <p className="text-gray-600 mt-1">Manage IT solutions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Solution</span>
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
        title={editingItem ? "Edit IT Solution" : "Add IT Solution"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <DualImageUpload
            label="Solution Image"
            name="image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />

          <FormInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <FormInput
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
          />

          <FormInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <FormInput
            label="Display Order"
            type="number"
            name="order"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: parseInt(e.target.value) })
            }
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
