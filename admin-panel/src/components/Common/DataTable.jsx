import { Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  loading,
  pagination,
  onPageChange,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-900/30 rounded-2xl border border-cyan-500/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-cyan-500/20">
        <p className="text-slate-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/30 rounded-2xl border border-cyan-500/20 overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-cyan-500/20">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-cyan-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {data.map((row, index) => (
              <motion.tr
                key={row.id || row._id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-slate-900/50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-slate-200"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Always show if pagination exists */}
      {pagination && pagination.total > 0 && (
        <div className="px-6 py-4 border-t border-cyan-500/20 bg-slate-900/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Info */}
            <div className="text-sm text-slate-300">
              Showing{" "}
              <span className="font-semibold text-cyan-400">
                {(pagination.page - 1) * pagination.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-cyan-400">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-cyan-400">
                {pagination.total}
              </span>{" "}
              results
            </div>

            {/* Pagination Controls - Show only if more than 1 page */}
            {pagination.pages > 1 && (
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => onPageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-2 text-sm font-medium text-slate-300 bg-slate-900/50 border border-cyan-500/20 rounded-lg hover:bg-slate-900 hover:border-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, pagination.pages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.pages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.pages - 2) {
                        pageNum = pagination.pages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => onPageChange(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                            pagination.page === pageNum
                              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                              : "text-slate-300 bg-slate-900/50 border border-cyan-500/20 hover:bg-slate-900 hover:border-cyan-400/50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => onPageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-2 text-sm font-medium text-slate-300 bg-slate-900/50 border border-cyan-500/20 rounded-lg hover:bg-slate-900 hover:border-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
