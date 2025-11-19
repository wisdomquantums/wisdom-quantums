import React, { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const ImageUpload = ({
  label,
  name,
  value,
  onChange,
  required = false,
  accept = "image/*",
  preview = true,
}) => {
  const [previewUrl, setPreviewUrl] = useState(value || "");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
      if (preview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
      if (preview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
    onChange(null);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {previewUrl ? (
        <div className="relative inline-block">
          <img
            src={
              previewUrl.startsWith("http") || previewUrl.startsWith("/uploads")
                ? `${
                    import.meta.env.VITE_API_URL || "http://localhost:5000"
                  }${previewUrl}`
                : previewUrl
            }
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="file"
            name={name}
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${name}`}
            required={required}
          />
          <label
            htmlFor={`file-upload-${name}`}
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              Drag & drop or{" "}
              <span className="text-blue-500 font-medium">browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF, WEBP up to 5MB
            </p>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
