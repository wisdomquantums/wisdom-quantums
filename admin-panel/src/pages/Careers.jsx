import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";

export default function Careers() {
  const {
    data,
    loading,
    pagination,
    changePage,
    createItem,
    updateItem,
    deleteItem,
  } = useCRUD("careers");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "engineering",
    location: "",
    type: "full-time",
    description: "",
    isActive: true,
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "department", label: "Department" },
    { key: "location", label: "Location" },
    { key: "type", label: "Type" },
    {
      key: "isActive",
      label: "Active",
      render: (value) => (value ? "✓" : "✗"),
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
      title: item.title,
      department: item.department,
      location: item.location,
      type: item.type,
      description: item.description,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      department: "engineering",
      location: "",
      type: "full-time",
      description: "",
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Careers</h1>
          <p className="text-gray-600 mt-1">Manage job postings</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Job</span>
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
        title={editingItem ? "Edit Job" : "Add Job"}
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
          <FormInput
            label="Department"
            type="select"
            name="department"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            options={[
              { value: "engineering", label: "Engineering" },
              { value: "design", label: "Design" },
              { value: "marketing", label: "Marketing" },
              { value: "sales", label: "Sales" },
              { value: "hr", label: "HR" },
            ]}
          />
          <FormInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
          <FormInput
            label="Type"
            type="select"
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={[
              { value: "full-time", label: "Full Time" },
              { value: "part-time", label: "Part Time" },
              { value: "contract", label: "Contract" },
              { value: "internship", label: "Internship" },
            ]}
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
