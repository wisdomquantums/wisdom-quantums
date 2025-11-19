import { motion } from "framer-motion";

export default function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-900 p-3 rounded-xl border border-cyan-400/50 group-hover:border-cyan-400 transition-colors">
                <Icon className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-slate-400 text-sm max-w-2xl">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </motion.div>
  );
}
