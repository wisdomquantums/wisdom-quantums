import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";

export default function Founders() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("founders");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    description: "",
    social: {
      twitter: "",
      linkedin: "",
      instagram: "",
    },
    order: 0,
    isActive: true,
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "order", label: "Order" },
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
    const result = editingItem
      ? await updateItem(editingItem.id, formData)
      : await createItem(formData);

    if (result.success) handleCloseModal();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      image: item.image,
      description: item.description,
      social: item.social || { twitter: "", linkedin: "", instagram: "" },
      order: item.order || 0,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      image: "",
      description: "",
      social: { twitter: "", linkedin: "", instagram: "" },
      order: 0,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Founders</h1>
          <p className="text-gray-600 mt-1">Manage company founders</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Founder</span>
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
        title={editingItem ? "Edit Founder" : "Add Founder"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <FormInput
            label="Role"
            name="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g., Founder & CEO"
            required
          />

          <FormInput
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            placeholder="https://example.com/founder.jpg"
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
            required
          />

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Social Links</h3>
            <FormInput
              label="Twitter URL"
              value={formData.social.twitter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social: { ...formData.social, twitter: e.target.value },
                })
              }
              placeholder="https://twitter.com/username"
            />
            <FormInput
              label="LinkedIn URL"
              value={formData.social.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social: { ...formData.social, linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com/in/username"
            />
            <FormInput
              label="Instagram URL"
              value={formData.social.instagram}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social: { ...formData.social, instagram: e.target.value },
                })
              }
              placeholder="https://instagram.com/username"
            />
          </div>

          <FormInput
            label="Display Order"
            type="number"
            name="order"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: parseInt(e.target.value) })
            }
          />

          <div className="flex items-center gap-2">
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
