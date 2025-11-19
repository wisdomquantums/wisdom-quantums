import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import DualImageUpload from "../components/DualImageUpload";
import useCRUD from "../hooks/useCRUD";

export default function Technologies() {
  const {
    data,
    loading,
    pagination,
    changePage,
    createItem,
    updateItem,
    deleteItem,
  } = useCRUD("technologies");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
    proficiency: 80,
    isActive: true,
    icon: null,
    logo: null,
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    {
      key: "proficiency",
      label: "Proficiency",
      render: (value) => `${value || 0}%`,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any image is a file (upload) or string (URL)
    const hasFileUpload =
      formData.icon instanceof File || formData.logo instanceof File;

    if (hasFileUpload) {
      // Use FormData for file uploads
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (["icon", "logo"].includes(key) && formData[key] instanceof File) {
          submitData.append(key, formData[key]);
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
      category: item.category,
      proficiency: item.proficiency || 80,
      isActive: item.isActive,
      icon: item.icon || null,
      logo: item.logo || null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      category: "frontend",
      proficiency: 80,
      isActive: true,
      icon: null,
      logo: null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Technologies</h1>
          <p className="text-gray-600 mt-1">Manage technologies</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Technology</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={changePage}
        onEdit={handleEdit}
        onDelete={(item) => deleteItem(item.id)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? "Edit Technology" : "Add Technology"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DualImageUpload
              label="Icon"
              name="icon"
              value={formData.icon}
              onChange={(value) => setFormData({ ...formData, icon: value })}
            />
            <DualImageUpload
              label="Logo"
              name="logo"
              value={formData.logo}
              onChange={(value) => setFormData({ ...formData, logo: value })}
            />
          </div>

          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              { value: "frontend", label: "Frontend" },
              { value: "backend", label: "Backend" },
              { value: "database", label: "Database" },
              { value: "devops", label: "DevOps" },
              { value: "mobile", label: "Mobile" },
              { value: "cloud", label: "Cloud" },
            ]}
          />
          <FormInput
            label="Proficiency Level (%)"
            type="number"
            name="proficiency"
            value={formData.proficiency}
            onChange={(e) =>
              setFormData({
                ...formData,
                proficiency: parseInt(e.target.value),
              })
            }
            min="0"
            max="100"
            required
          />
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
