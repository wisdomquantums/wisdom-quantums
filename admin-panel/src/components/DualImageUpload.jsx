import React, { useState, useEffect } from "react";
import { Upload, X, Link } from "lucide-react";

const DualImageUpload = ({
  label,
  name,
  value,
  onChange,
  required = false,
  accept = "image/*",
  preview = true,
}) => {
  const [inputType, setInputType] = useState("upload"); // "upload" or "url"
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Initialize based on existing value
  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        // It's a URL
        setInputType("url");
        setImageUrl(value);
        setPreviewUrl(value);
      } else if (value instanceof File) {
        // It's a file
        setInputType("upload");
        setImageFile(value);
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(value);
      }
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      onChange(file);
      if (preview) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    onChange(url);
    if (url) {
      setPreviewUrl(url);
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
      setImageFile(file);
      onChange(file);
      if (preview) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
    setImageUrl("");
    setImageFile(null);
    onChange(null);
  };

  const switchToUpload = () => {
    setInputType("upload");
    setImageUrl("");
    setPreviewUrl("");
    onChange(null);
  };

  const switchToUrl = () => {
    setInputType("url");
    setImageFile(null);
    setPreviewUrl("");
    onChange(null);
  };

  const getImageSrc = (url) => {
    if (!url) return "";

    // If it's already a full URL, return as is
    if (url.startsWith("http")) return url;

    // If it's a relative path starting with /uploads, prepend base URL
    if (url.startsWith("/uploads")) {
      const baseUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000/api"
      ).replace("/api", "");
      return `${baseUrl}${url}`;
    }

    // For data URLs or other formats, return as is
    return url;
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={switchToUpload}
          className={`flex-1 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
            inputType === "upload"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload File
        </button>
        <button
          type="button"
          onClick={switchToUrl}
          className={`flex-1 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
            inputType === "url"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Link className="w-4 h-4" />
          Image URL
        </button>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="relative inline-block w-full">
          <img
            src={getImageSrc(previewUrl)}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=Invalid+URL";
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload Interface */}
      {inputType === "upload" && !previewUrl && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDragging
              ? "border-primary-500 bg-primary-50"
              : "border-gray-300 hover:border-primary-400"
          }`}
        >
          <input
            type="file"
            name={name}
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${name}`}
            required={required && !previewUrl}
          />
          <label
            htmlFor={`file-upload-${name}`}
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              Drag & drop or{" "}
              <span className="text-primary-500 font-medium">browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF, WEBP up to 5MB
            </p>
          </label>
        </div>
      )}

      {/* URL Interface */}
      {inputType === "url" && (
        <div className="space-y-3">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={handleUrlChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required={required && !previewUrl}
          />
        </div>
      )}
    </div>
  );
};

export default DualImageUpload;
