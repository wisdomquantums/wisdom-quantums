import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";

export default function HowWeWork() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("how-we-work");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "How we work",
    subtitle: "Simple Easy Steps to Follow",
    centerLogo: "",
    steps: [
      {
        title: "Understanding Your Vision",
        text: "We begin by listening. Our team collaborates closely with you to understand your business goals, challenges, and vision.",
      },
      {
        title: "Quality Assurance",
        text: "Our process is iterative and transparent. By following agile methodologies, we adapt quickly to feedback.",
      },
      {
        title: "Strategic Planning",
        text: "Our experts analyze your requirements and develop a detailed plan. Through innovation and efficiency.",
      },
      {
        title: "Support & Optimization",
        text: "Our partnership doesn't end at delivery. We provide continuous support, monitor performance.",
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
      title: item.title,
      subtitle: item.subtitle,
      centerLogo: item.centerLogo,
      steps: item.steps || [],
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: "How we work",
      subtitle: "Simple Easy Steps to Follow",
      centerLogo: "",
      steps: [
        {
          title: "Understanding Your Vision",
          text: "We begin by listening. Our team collaborates closely with you to understand your business goals, challenges, and vision.",
        },
        {
          title: "Quality Assurance",
          text: "Our process is iterative and transparent. By following agile methodologies, we adapt quickly to feedback.",
        },
        {
          title: "Strategic Planning",
          text: "Our experts analyze your requirements and develop a detailed plan. Through innovation and efficiency.",
        },
        {
          title: "Support & Optimization",
          text: "Our partnership doesn't end at delivery. We provide continuous support, monitor performance.",
        },
      ],
      isActive: true,
    });
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">How We Work</h1>
          <p className="text-gray-600 mt-1">Manage how we work section</p>
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
        title={editingItem ? "Edit How We Work" : "Add How We Work"}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
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
            label="Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            required
          />

          <FormInput
            label="Center Logo URL"
            name="centerLogo"
            value={formData.centerLogo}
            onChange={(e) =>
              setFormData({ ...formData, centerLogo: e.target.value })
            }
            placeholder="https://example.com/logo.png"
            required
          />

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Steps (4 required)</h3>
            {formData.steps.map((step, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <h4 className="font-medium text-gray-700">Step {index + 1}</h4>
                <FormInput
                  label="Title"
                  value={step.title}
                  onChange={(e) => updateStep(index, "title", e.target.value)}
                  required
                />
                <FormInput
                  label="Description"
                  type="textarea"
                  value={step.text}
                  onChange={(e) => updateStep(index, "text", e.target.value)}
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
