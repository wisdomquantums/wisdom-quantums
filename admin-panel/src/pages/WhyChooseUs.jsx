import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";

export default function WhyChooseUs() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("why-choose-us");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    subtitle: "Why Choose Us",
    title: "Fast & Easy Solutions",
    items: [
      {
        title: "Tailored Solutions",
        text: "Customized strategies to meet your unique business needs.",
      },
      {
        title: "Innovative Technology",
        text: "Leveraging the latest tools for efficient and scalable results.",
      },
      {
        title: "Expert Team",
        text: "Skilled professionals committed to your success.",
      },
      {
        title: "Customer-Centric Approach",
        text: "We prioritize your goals and satisfaction.",
      },
    ],
    isActive: true,
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle" },
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
      subtitle: item.subtitle,
      title: item.title,
      items: item.items || [],
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      subtitle: "Why Choose Us",
      title: "Fast & Easy Solutions",
      items: [
        {
          title: "Tailored Solutions",
          text: "Customized strategies to meet your unique business needs.",
        },
        {
          title: "Innovative Technology",
          text: "Leveraging the latest tools for efficient and scalable results.",
        },
        {
          title: "Expert Team",
          text: "Skilled professionals committed to your success.",
        },
        {
          title: "Customer-Centric Approach",
          text: "We prioritize your goals and satisfaction.",
        },
      ],
      isActive: true,
    });
  };

  const updateItemField = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { title: "", text: "" }],
    });
  };

  const removeItemField = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Why Choose Us</h1>
          <p className="text-gray-600 mt-1">Manage why choose us section</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Section</span>
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
        title={editingItem ? "Edit Why Choose Us" : "Add Why Choose Us"}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <FormInput
            label="Subtitle"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            required
          />

          <FormInput
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Items</h3>
              <button
                type="button"
                onClick={addNewItem}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Item
              </button>
            </div>
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">
                    Item {index + 1}
                  </h4>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemField(index)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <FormInput
                  label="Title"
                  value={item.title}
                  onChange={(e) =>
                    updateItemField(index, "title", e.target.value)
                  }
                  required
                />
                <FormInput
                  label="Text"
                  type="textarea"
                  value={item.text}
                  onChange={(e) =>
                    updateItemField(index, "text", e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>

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
