import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Save, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
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
        <div className="relative">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Profile Settings
          </h1>
          <p className="text-slate-300 mt-1">
            Manage your account information and security
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Profile Information
            </h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
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
                  required
                />
              </div>
            </div>

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
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              <Save className="w-5 h-5" />
              Update Profile
            </button>
          </form>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Change Password
            </h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-200 placeholder-slate-400 focus:bg-slate-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
            >
              <Shield className="w-5 h-5" />
              Change Password
            </button>
          </form>
        </motion.div>
      </div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
      >
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/10">
            <label className="text-sm font-medium text-slate-400">Role</label>
            <p className="text-slate-200 mt-2 text-lg font-semibold capitalize">
              {user?.role}
            </p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/10">
            <label className="text-sm font-medium text-slate-400">
              Account Status
            </label>
            <p className="mt-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-sm font-semibold">
                Active
              </span>
            </p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/10">
            <label className="text-sm font-medium text-slate-400">
              User ID
            </label>
            <p className="text-slate-200 mt-2 text-lg font-semibold">
              #{user?.id}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
