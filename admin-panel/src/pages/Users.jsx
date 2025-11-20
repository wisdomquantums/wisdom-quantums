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
    {
      key: "name",
      label: "Name",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg blur-md opacity-60"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center border border-cyan-400/50">
              <span className="text-sm font-bold text-white">
                {value?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-200">{value}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (value) => {
        const roleStyles = {
          editor: {
            bg: "bg-green-500/20",
            text: "text-green-300",
            border: "border-green-500/30",
            icon: "🖊️",
          },
          admin: {
            bg: "bg-blue-500/20",
            text: "text-blue-300",
            border: "border-blue-500/30",
            icon: "👤",
          },
          superadmin: {
            bg: "bg-purple-500/20",
            text: "text-purple-300",
            border: "border-purple-500/30",
            icon: "⚡",
          },
        };
        const style = roleStyles[value] || roleStyles.admin;
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}
          >
            <span>{style.icon}</span>
            <span className="capitalize">{value}</span>
          </span>
        );
      },
    },
    {
      key: "isActive",
      label: "Status",
      render: (value) =>
        value ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-green-500/20 text-green-300 border-green-500/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-red-500/20 text-red-300 border-red-500/30">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            Inactive
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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Info Banner */}
          <div className="relative p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
            <p className="relative text-sm text-cyan-300">
              {editingItem
                ? "Update user information and permissions"
                : "Create a new admin user with specific role and permissions"}
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="relative w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-500 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                placeholder="e.g., John Doe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="relative w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-500 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                placeholder="user@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              Password
              {editingItem && (
                <span className="text-xs text-slate-500 font-normal">
                  (leave blank to keep current)
                </span>
              )}
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="relative w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-500 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                placeholder="••••••••"
                required={!editingItem}
                minLength={6}
              />
            </div>
            {!editingItem && (
              <p className="mt-1.5 text-xs text-slate-500">
                Minimum 6 characters required
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              User Role
            </label>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  value: "editor",
                  label: "Editor",
                  description: "Can create and edit content",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  value: "admin",
                  label: "Admin",
                  description: "Full content management access",
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  value: "superadmin",
                  label: "Superadmin",
                  description: "Complete system control",
                  color: "from-purple-500 to-pink-600",
                },
              ].map((role) => (
                <label
                  key={role.value}
                  className={`relative flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all group ${
                    formData.role === role.value
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-cyan-500/20 bg-slate-900/30 hover:border-cyan-400/50 hover:bg-slate-900/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="mt-1 w-4 h-4 text-cyan-500 bg-slate-900 border-cyan-500/30 focus:ring-2 focus:ring-cyan-400/50"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color}`}
                      ></div>
                      <span className="font-semibold text-slate-200">
                        {role.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {role.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Active Status */}
          <div className="relative p-4 bg-slate-900/30 rounded-lg border border-cyan-500/20">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 text-cyan-500 bg-slate-900 border-cyan-500/30 rounded focus:ring-2 focus:ring-cyan-400/50 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  Active User Account
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  User can login and access the admin panel
                </p>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-cyan-500/20">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-3 border border-cyan-500/20 text-slate-300 rounded-lg hover:bg-slate-900/50 hover:border-cyan-400/50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
            >
              {editingItem ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
