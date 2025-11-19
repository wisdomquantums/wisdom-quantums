import React, { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import FormInput from "../components/Common/FormInput";
import useCRUD from "../hooks/useCRUD";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Gallery() {
  const { data, loading, deleteItem, fetchData, pagination } =
    useCRUD("gallery");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageInputType, setImageInputType] = useState("upload"); // "upload" or "url"
  const [imageUrl, setImageUrl] = useState("");

  const BASE_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace("/api", "");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "office",
    isActive: true,
  });

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "image",
      label: "Image",
      render: (value) => {
        if (!value) return "-";

        // Construct full image URL
        const imageUrl = value.startsWith("/uploads")
          ? `http://localhost:5000${value}`
          : value;

        console.log("Image URL:", imageUrl); // Debug log

        return (
          <img
            src={imageUrl}
            alt="gallery"
            className="w-16 h-16 object-cover rounded"
            onError={(e) => {
              console.error("Image failed to load:", imageUrl);
              e.target.style.border = "2px solid red";
            }}
          />
        );
      },
    },
  ];
  // --------------------------------------------------------------

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate: either file upload or URL must be provided
    if (!editingItem && !imageFile && !imageUrl) {
      toast.error("Please upload an image or provide an image URL");
      return;
    }

    setUploading(true);

    try {
      let response;

      // If using URL (not file upload)
      if (imageInputType === "url" && imageUrl) {
        const dataToSend = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          isActive: formData.isActive,
          image: imageUrl,
        };

        if (editingItem) {
          response = await api.put(`/gallery/${editingItem.id}`, dataToSend);
        } else {
          response = await api.post("/gallery", dataToSend);
        }
      }
      // If using file upload
      else {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("isActive", formData.isActive);

        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        if (editingItem) {
          response = await api.put(
            `/gallery/${editingItem.id}`,
            formDataToSend,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        } else {
          response = await api.post("/gallery", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      }

      toast.success(response.data.message || "Success");
      fetchData();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);

    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      isActive: item.isActive,
    });

    const raw = item.image?.startsWith("/uploads")
      ? `${BASE_URL}${item.image}`
      : item.image;

    setImagePreview(raw);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
    setImageUrl("");
    setImageInputType("upload");

    setFormData({
      title: "",
      description: "",
      category: "office",
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Gallery</h1>
          <p className="text-gray-600 mt-1">Manage gallery images</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Image</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(item) => deleteItem(item.id)}
        pagination={pagination}
        onPageChange={(page) => fetchData(page, pagination.limit)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? "Edit Image" : "Add Image"}
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
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Image Input - Upload or URL */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image {!editingItem && <span className="text-red-500">*</span>}
            </label>

            {/* Tabs for Upload/URL */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setImageInputType("upload");
                  setImageUrl("");
                  setImagePreview(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg transition ${
                  imageInputType === "upload"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageInputType("url");
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg transition ${
                  imageInputType === "url"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🔗 Image URL
              </button>
            </div>

            {/* Upload Tab Content */}
            {imageInputType === "upload" && (
              <>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-10 h-10 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload image
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, GIF, WEBP up to 5MB
                      </span>
                    </label>
                  </div>
                )}
              </>
            )}

            {/* URL Tab Content */}
            {imageInputType === "url" && (
              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (e.target.value) {
                      setImagePreview(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {imageUrl && (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Invalid+URL";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl("");
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <FormInput
            label="Category"
            type="select"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            options={[
              { value: "office", label: "Office" },
              { value: "events", label: "Events" },
              { value: "team", label: "Team" },
              { value: "projects", label: "Projects" },
            ]}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center justify-center"
            >
              {uploading ? "Uploading..." : editingItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
