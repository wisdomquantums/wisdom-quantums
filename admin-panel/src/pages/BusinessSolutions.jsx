import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";

export default function BusinessSolutions() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("business-solutions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    subtitle: "",
    title: "",
    mainImage: "",
    smallImage: "",
    features: [
      "Technology Integration",
      "Problem-Solving Approach",
      "Scalable Growth",
      "Adaptability and Agility",
      "Customer-Centric Design",
    ],
    benefits: [
      "Increased Efficiency",
      "Enhanced Competitiveness",
      "Better Decision-Making",
      "Sustainable Growth",
      "Improved Customer Engagement",
    ],
    stats: {
      projects: "500+",
      technologies: "10+",
      companies: "400+",
    },
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
      mainImage: item.mainImage,
      smallImage: item.smallImage,
      features: item.features || [],
      benefits: item.benefits || [],
      stats: item.stats || {
        projects: "500+",
        technologies: "10+",
        companies: "400+",
      },
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      subtitle: "",
      title: "",
      mainImage: "",
      smallImage: "",
      features: [
        "Technology Integration",
        "Problem-Solving Approach",
        "Scalable Growth",
        "Adaptability and Agility",
        "Customer-Centric Design",
      ],
      benefits: [
        "Increased Efficiency",
        "Enhanced Competitiveness",
        "Better Decision-Making",
        "Sustainable Growth",
        "Improved Customer Engagement",
      ],
      stats: { projects: "500+", technologies: "10+", companies: "400+" },
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">
            Business Solutions
          </h1>
          <p className="text-gray-600 mt-1">
            Manage business solutions section
          </p>
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
        title={editingItem ? "Edit Business Solution" : "Add Business Solution"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <FormInput
            label="Main Image URL"
            name="mainImage"
            value={formData.mainImage}
            onChange={(e) =>
              setFormData({ ...formData, mainImage: e.target.value })
            }
            placeholder="https://example.com/main-image.jpg"
            required
          />

          <FormInput
            label="Small Image URL"
            name="smallImage"
            value={formData.smallImage}
            onChange={(e) =>
              setFormData({ ...formData, smallImage: e.target.value })
            }
            placeholder="https://example.com/small-image.jpg"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features (one per line)
            </label>
            <textarea
              value={formData.features.join("\n")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  features: e.target.value.split("\n").filter((f) => f.trim()),
                })
              }
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits (one per line)
            </label>
            <textarea
              value={formData.benefits.join("\n")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  benefits: e.target.value.split("\n").filter((b) => b.trim()),
                })
              }
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Projects Stat"
              value={formData.stats.projects}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, projects: e.target.value },
                })
              }
            />
            <FormInput
              label="Technologies Stat"
              value={formData.stats.technologies}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, technologies: e.target.value },
                })
              }
            />
            <FormInput
              label="Companies Stat"
              value={formData.stats.companies}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, companies: e.target.value },
                })
              }
            />
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
