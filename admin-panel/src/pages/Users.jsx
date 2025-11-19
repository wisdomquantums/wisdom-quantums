import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Users as UsersIcon,
  Shield,
  Mail,
  User,
  Lock,
} from "lucide-react";
import DataTable from "../components/Common/DataTable";
import Modal from "../components/Common/Modal";
import useCRUD from "../hooks/useCRUD";

export default function Users() {
  const { data, loading, createItem, updateItem, deleteItem } =
    useCRUD("admin/users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    isActive: true,
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "isActive",
      label: "Active",
      render: (value) => (value ? "✓" : "✗"),
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
      name: item.name,
      email: item.email,
      password: "",
      role: item.role,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "admin",
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/30 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                User Management
              </h1>
            </div>
            <p className="text-slate-300">
              Manage admin users (Superadmin only)
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>
      </motion.div>

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
        title={editingItem ? "Edit User" : "Add New User"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                placeholder="user@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {editingItem
                ? "Password (leave blank to keep current)"
                : "Password"}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                placeholder="••••••••"
                required={!editingItem}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all appearance-none"
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          </div>

          {/* Active Status */}
          <label className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-cyan-500/20 cursor-pointer hover:border-cyan-400/50 transition-colors">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-5 h-5 text-cyan-500 bg-slate-900 border-cyan-500/30 rounded focus:ring-2 focus:ring-cyan-400/50"
            />
            <span className="text-sm font-medium text-slate-300">
              Active User
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-3 border border-cyan-500/20 text-slate-300 rounded-lg hover:bg-slate-900/50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              {editingItem ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
