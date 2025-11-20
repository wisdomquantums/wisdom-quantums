import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  FolderOpen,
  FileText,
  Mail,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
  Eye,
  Calendar,
} from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/dashboard/stats");
      setStats(response.data.data);
      setLoading(false);
    } catch (error) {
      if (loading) {
        toast.error("Failed to fetch statistics");
      }
      setLoading(false);
    }
  };

  const statCards = stats
    ? [
        {
          title: "Total Services",
          value: stats.services,
          icon: Briefcase,
          gradient: "from-blue-500 to-blue-600",
          change: stats.serviceTrend,
          trend: "up",
          link: "/admin/services",
        },
        {
          title: "Total Projects",
          value: stats.projects,
          icon: FolderOpen,
          gradient: "from-green-500 to-emerald-600",
          change: stats.projectTrend,
          trend: "up",
          link: "/admin/projects",
          subtitle: `${stats.recentProjects} this week`,
        },
        {
          title: "Total Blogs",
          value: stats.blogs,
          icon: FileText,
          gradient: "from-purple-500 to-purple-600",
          change: stats.blogTrend,
          trend: "up",
          link: "/admin/blogs",
          subtitle: `${stats.recentBlogs} this week`,
        },
        {
          title: "New Inquiries",
          value: stats.newInquiries,
          icon: Mail,
          gradient: "from-red-500 to-rose-600",
          change: stats.inquiryTrend,
          trend: "up",
          link: "/admin/inquiries",
          subtitle: `${stats.inquiriesLastWeek} this week`,
        },
        {
          title: "Active Jobs",
          value: stats.activeJobs,
          icon: Users,
          gradient: "from-yellow-500 to-orange-600",
          change: `${stats.careers} total`,
          trend: "neutral",
          link: "/admin/careers",
        },
        {
          title: "Testimonials",
          value: stats.testimonials,
          icon: Star,
          gradient: "from-pink-500 to-rose-600",
          change: stats.testimonialTrend,
          trend: "up",
          link: "/admin/testimonials",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-cyan-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Welcome Back! 👋
            </h1>
            <p className="text-slate-300 text-lg">
              Here's what's happening with your platform today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl blur-lg opacity-60"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/50">
                <Calendar className="w-12 h-12 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Link key={stat.title} to={stat.link || "#"}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden backdrop-blur-sm cursor-pointer hover:scale-105"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
              ></div>

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity`}
                    ></div>
                    <div
                      className={`relative p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {stat.trend !== "neutral" && (
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full border ${
                        stat.trend === "up"
                          ? "bg-green-500/20 border-green-500/30"
                          : "bg-red-500/20 border-red-500/30"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span
                        className={`text-sm font-semibold ${
                          stat.trend === "up"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-400 font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-4xl font-bold text-slate-100 mb-2">
                  {stat.value}
                </p>
                {stat.subtitle && (
                  <p className="text-xs text-cyan-400 font-medium">
                    {stat.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Quick Actions
            </h2>
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="space-y-3">
            <QuickActionButton
              icon={Briefcase}
              title="Add New Service"
              description="Create a new service offering"
              href="/admin/services"
              color="blue"
            />
            <QuickActionButton
              icon={FolderOpen}
              title="Add New Project"
              description="Showcase your latest work"
              href="/admin/projects"
              color="green"
            />
            <QuickActionButton
              icon={FileText}
              title="Write Blog Post"
              description="Share your insights"
              href="/admin/blogs"
              color="purple"
            />
            <QuickActionButton
              icon={Mail}
              title="View Inquiries"
              description={`${stats?.newInquiries || 0} new messages`}
              href="/admin/inquiries"
              color="red"
            />
          </div>
        </motion.div>

        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Recent Inquiries
            </h2>
            <Mail className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="space-y-3">
            {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
              stats.recentInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  to="/admin/inquiries"
                  className="block p-3 rounded-xl bg-slate-900/30 hover:bg-slate-900/50 border border-cyan-500/10 hover:border-cyan-400/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-200 text-sm">
                        {inquiry.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {inquiry.subject}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        inquiry.status === "new"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(inquiry.time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-slate-400 text-center py-4">
                No recent inquiries
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            Last 30 Days
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30">
              <span className="text-slate-300 text-sm">Projects Added</span>
              <span className="text-cyan-400 font-bold">
                {stats?.projectsLastMonth || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30">
              <span className="text-slate-300 text-sm">Blogs Published</span>
              <span className="text-purple-400 font-bold">
                {stats?.blogsLastMonth || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30">
              <span className="text-slate-300 text-sm">Inquiries</span>
              <span className="text-red-400 font-bold">
                {stats?.inquiriesLastWeek || 0}
              </span>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              System Status
            </h3>
            <Eye className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="space-y-3">
            <StatusItem label="API Status" status="Operational" color="green" />
            <StatusItem label="Database" status="Connected" color="green" />
            <StatusItem
              label="Last Updated"
              status={
                stats?.lastUpdated
                  ? new Date(stats.lastUpdated).toLocaleTimeString()
                  : "Now"
              }
              color="green"
            />
          </div>
        </motion.div>

        {/* Content Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 p-6 backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            Content Overview
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30">
              <span className="text-slate-300 text-sm">Team Members</span>
              <span className="text-blue-400 font-bold">
                {stats?.team || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30">
              <span className="text-slate-300 text-sm">Gallery Items</span>
              <span className="text-green-400 font-bold">
                {stats?.gallery || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30">
              <span className="text-slate-300 text-sm">Total Users</span>
              <span className="text-yellow-400 font-bold">
                {stats?.users || 0}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, title, description, href, color }) {
  const colors = {
    blue: "from-cyan-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    red: "from-red-500 to-rose-600",
  };

  return (
    <Link
      to={href}
      className="group relative flex items-center justify-between p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden bg-slate-900/30 hover:bg-slate-900/50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${colors[color]} rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity`}
          ></div>
          <div
            className={`relative p-3 bg-gradient-to-br ${colors[color]} rounded-xl shadow-md group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all relative z-10" />
    </Link>
  );
}

function StatusItem({ label, status, color }) {
  const colors = {
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30 hover:bg-slate-900/50 transition-colors border border-cyan-500/10">
      <span className="text-slate-300 font-medium text-sm">{label}</span>
      <span
        className={`px-3 py-1 rounded-lg text-xs font-semibold border ${colors[color]}`}
      >
        {status}
      </span>
    </div>
  );
}
