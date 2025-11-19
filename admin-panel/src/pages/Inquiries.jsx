import { useState } from "react";
import { Download, Filter, FileText } from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import useCRUD from "../hooks/useCRUD";
import { format } from "date-fns";

export default function Inquiries() {
  const { data, loading, updateItem, deleteItem } = useCRUD("inquiries");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
    type: "",
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        const colors = {
          new: "bg-blue-100 text-blue-800",
          "in-progress": "bg-yellow-100 text-yellow-800",
          resolved: "bg-green-100 text-green-800",
          closed: "bg-gray-100 text-gray-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${colors[value]}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => format(new Date(value), "MMM dd, yyyy"),
    },
  ];

  const handleView = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (status) => {
    if (selectedItem) {
      await updateItem(selectedItem.id, { status });
      setIsModalOpen(false);
    }
  };

  const handleExport = async (format = "excel") => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();

      if (filters.startDate) queryParams.append("startDate", filters.startDate);
      if (filters.endDate) queryParams.append("endDate", filters.endDate);
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.type) queryParams.append("type", filters.type);

      const endpoint = format === "pdf" ? "pdf" : "excel";
      const fileExt = format === "pdf" ? "pdf" : "xlsx";
      const mimeType =
        format === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/inquiries/export/${endpoint}?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Export error response:", errorText);
        throw new Error("Export failed");
      }

      // Check content type
      const contentType = response.headers.get("content-type");
      console.log("Response content-type:", contentType);

      const blob = await response.blob();
      console.log("Blob size:", blob.size, "Blob type:", blob.type);

      // Create blob with correct MIME type
      const properBlob = new Blob([blob], { type: mimeType });

      const url = window.URL.createObjectURL(properBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Inquiries_${
        new Date().toISOString().split("T")[0]
      }.${fileExt}`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    } catch (error) {
      console.error("Export error:", error);
      alert(`Failed to export inquiries as ${format.toUpperCase()}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-400">Inquiries</h1>
          <p className="text-gray-600 mt-1">Manage customer inquiries</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button
            onClick={() => handleExport("excel")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Download className="w-5 h-5" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FileText className="w-5 h-5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
          <h3 className="font-semibold text-gray-900">Filter Inquiries</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Types</option>
                <option value="general">General</option>
                <option value="service">Service</option>
                <option value="career">Career</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setFilters({ startDate: "", endDate: "", status: "", type: "" })
              }
              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onView={handleView}
        onDelete={(item) => deleteItem(item.id)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Inquiry Details"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900 mt-1">{selectedItem.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900 mt-1">{selectedItem.email}</p>
            </div>
            {selectedItem.phone && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="text-gray-900 mt-1">{selectedItem.phone}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <p className="text-gray-900 mt-1">{selectedItem.subject}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                {selectedItem.message}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Update Status
              </label>
              <div className="flex gap-2">
                {["new", "in-progress", "resolved", "closed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      selectedItem.status === status
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
