import React, { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import DualImageUpload from "../components/DualImageUpload";
import useCRUD from "../hooks/useCRUD";

export default function Team() {
  const { data, loading, createItem, updateItem, deleteItem } = useCRUD("team");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "engineering",
    email: "",
    bio: "",
    linkedin: "",
    twitter: "",
    github: "",
    isActive: true,
    image: null,
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    { key: "email", label: "Email" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is a file (upload) or string (URL)
    const isFileUpload = formData.image instanceof File;

    // Prepare social data
    const social = {};
    if (formData.linkedin) social.linkedin = formData.linkedin;
    if (formData.twitter) social.twitter = formData.twitter;
    if (formData.github) social.github = formData.github;

    if (isFileUpload) {
      // Use FormData for file uploads
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData[key] instanceof File) {
          submitData.append("image", formData[key]);
        } else if (
          key !== "linkedin" &&
          key !== "twitter" &&
          key !== "github" &&
          formData[key] !== null &&
          formData[key] !== undefined
        ) {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append("social", JSON.stringify(social));

      const result = editingItem
        ? await updateItem(editingItem.id, submitData, true)
        : await createItem(submitData, true);
      if (result.success) handleCloseModal();
    } else {
      // Use JSON for URL submissions
      const submitData = {
        ...formData,
        social,
      };
      delete submitData.linkedin;
      delete submitData.twitter;
      delete submitData.github;

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
      position: item.position,
      department: item.department,
      email: item.email || "",
      bio: item.bio || "",
      linkedin: item.social?.linkedin || "",
      twitter: item.social?.twitter || "",
      github: item.social?.github || "",
      isActive: item.isActive,
      image: item.image || null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      position: "",
      department: "engineering",
      email: "",
      bio: "",
      linkedin: "",
      twitter: "",
      github: "",
      isActive: true,
      image: null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Teams</h1>
          <p className="text-gray-600 mt-1">Manage team members</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
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
        title={editingItem ? "Edit Member" : "Add Member"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <DualImageUpload
            label="Profile Image"
            name="image"
            value={formData.image}
            onChange={(value) => setFormData({ ...formData, image: value })}
          />

          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormInput
            label="Position"
            name="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
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
              { value: "cto", label: "Leadership" },
              { value: "leadership", label: "Leadership" },
              { value: "design", label: "Designer Head" },
              { value: "marketing", label: "Marketing Head" },
              { value: "sales", label: "Sales Head" },
              { value: "hr", label: "HR Head" },
              { value: "hr", label: "HR Head" },
              { value: "technical", label: "Technical Head" },
              { value: "mobile", label: "Software Developer" },
            ]}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <FormInput
            label="Bio / Quote"
            type="textarea"
            name="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Short bio or professional quote..."
            rows={3}
          />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Social Links
            </h3>
            <FormInput
              label="LinkedIn URL"
              name="linkedin"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              placeholder="https://linkedin.com/in/username"
            />
            <FormInput
              label="Twitter URL"
              name="twitter"
              value={formData.twitter}
              onChange={(e) =>
                setFormData({ ...formData, twitter: e.target.value })
              }
              placeholder="https://twitter.com/username"
            />
            <FormInput
              label="GitHub URL"
              name="github"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              placeholder="https://github.com/username"
            />
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
