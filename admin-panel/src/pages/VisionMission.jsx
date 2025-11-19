import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import DualImageUpload from "../components/DualImageUpload";
import useCRUD from "../hooks/useCRUD";

export default function VisionMission() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("vision-mission");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    vision: "",
    mission: "",
    ctaText: "Contact Us",
    ctaLink: "/contact-us",
    circleImage1: null,
    circleImage2: null,
    isActive: true,
  });

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "isActive",
      label: "Active",
      render: (value) => (value ? "✓" : "✗"),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any image is a file (upload)
    const hasFileUpload =
      formData.circleImage1 instanceof File ||
      formData.circleImage2 instanceof File;

    if (hasFileUpload) {
      // Use FormData for file uploads
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (
          (key === "circleImage1" || key === "circleImage2") &&
          formData[key] instanceof File
        ) {
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
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description,
      vision: item.vision,
      mission: item.mission,
      ctaText: item.ctaText || "Contact Us",
      ctaLink: item.ctaLink || "/contact-us",
      circleImage1: item.circleImage1 || null,
      circleImage2: item.circleImage2 || null,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      vision: "",
      mission: "",
      ctaText: "Contact Us",
      ctaLink: "/contact-us",
      circleImage1: null,
      circleImage2: null,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Vision & Mission</h1>
          <p className="text-gray-600 mt-1">
            Manage company vision and mission
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Vision & Mission</span>
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
        title={editingItem ? "Edit Vision & Mission" : "Add Vision & Mission"}
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

          <FormInput
            label="Subtitle"
            type="textarea"
            name="subtitle"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            required
            rows={2}
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
            rows={3}
          />

          <FormInput
            label="Vision"
            type="textarea"
            name="vision"
            value={formData.vision}
            onChange={(e) =>
              setFormData({ ...formData, vision: e.target.value })
            }
            required
            rows={4}
          />

          <FormInput
            label="Mission"
            type="textarea"
            name="mission"
            value={formData.mission}
            onChange={(e) =>
              setFormData({ ...formData, mission: e.target.value })
            }
            required
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="CTA Button Text"
              name="ctaText"
              value={formData.ctaText}
              onChange={(e) =>
                setFormData({ ...formData, ctaText: e.target.value })
              }
            />
            <FormInput
              label="CTA Button Link"
              name="ctaLink"
              value={formData.ctaLink}
              onChange={(e) =>
                setFormData({ ...formData, ctaLink: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Circle Images (Optional)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <DualImageUpload
                label="Top-Left Circle (Image/GIF)"
                name="circleImage1"
                value={formData.circleImage1}
                onChange={(value) =>
                  setFormData({ ...formData, circleImage1: value })
                }
              />
              <DualImageUpload
                label="Bottom-Right Circle (Image/GIF)"
                name="circleImage2"
                value={formData.circleImage2}
                onChange={(value) =>
                  setFormData({ ...formData, circleImage2: value })
                }
              />
            </div>
          </div>

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
