import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";

export default function BusinessDevelopment() {
  const { data, loading, createItem, updateItem, deleteItem } = useCRUD(
    "business-development"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    tagline: "We are Avers",
    title: "Business Development & Innovation",
    cards: [
      {
        title: "Strategic Growth Acceleration",
        text: "Focused strategies that simplify processes and strengthen business growth.",
        icon: "BarChart3",
      },
      {
        title: "Intelligent Tech Integration",
        text: "Smart tools and automation that increase efficiency and accuracy.",
        icon: "Cpu",
      },
      {
        title: "Future-Ready Innovation",
        text: "Modern ideas and automation to keep your business ahead.",
        icon: "Bot",
      },
    ],
    isActive: true,
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "tagline", label: "Tagline" },
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
      tagline: item.tagline,
      title: item.title,
      cards: item.cards || [],
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      tagline: "We are Avers",
      title: "Business Development & Innovation",
      cards: [
        {
          title: "Strategic Growth Acceleration",
          text: "Focused strategies that simplify processes and strengthen business growth.",
          icon: "BarChart3",
        },
        {
          title: "Intelligent Tech Integration",
          text: "Smart tools and automation that increase efficiency and accuracy.",
          icon: "Cpu",
        },
        {
          title: "Future-Ready Innovation",
          text: "Modern ideas and automation to keep your business ahead.",
          icon: "Bot",
        },
      ],
      isActive: true,
    });
  };

  const updateCard = (index, field, value) => {
    const newCards = [...formData.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setFormData({ ...formData, cards: newCards });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">
            Business Development
          </h1>
          <p className="text-gray-600 mt-1">
            Manage business development section
          </p>
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
        title={
          editingItem ? "Edit Business Development" : "Add Business Development"
        }
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <FormInput
            label="Tagline"
            value={formData.tagline}
            onChange={(e) =>
              setFormData({ ...formData, tagline: e.target.value })
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
            <h3 className="font-semibold text-gray-900">Cards (3 required)</h3>
            {formData.cards.map((card, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <h4 className="font-medium text-gray-700">Card {index + 1}</h4>
                <FormInput
                  label="Title"
                  value={card.title}
                  onChange={(e) => updateCard(index, "title", e.target.value)}
                  required
                />
                <FormInput
                  label="Text"
                  type="textarea"
                  value={card.text}
                  onChange={(e) => updateCard(index, "text", e.target.value)}
                  required
                />
                <FormInput
                  label="Icon (lucide-react name)"
                  value={card.icon}
                  onChange={(e) => updateCard(index, "icon", e.target.value)}
                  placeholder="e.g., BarChart3, Cpu, Bot"
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
