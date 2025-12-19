import { Trash2, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CustomModal = ({
  handleDelete,
  showDeleteModal,
  setShowDeleteModal,
  modalRef,
  setSelectedId
}) => {
  return (
    <AnimatePresence>
      {showDeleteModal && (
        // overlay
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20"
          aria-modal="true"
          role="dialog"
        >
          {/* dim backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* sheet/card */}
          <motion.div
            ref={modalRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-[90%] max-w-md rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl ring-1 ring-slate-700 border border-slate-700"
          >
            {/* Header with X */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500/20 border border-red-500/30">
                  <Trash2 className="text-red-400" size={18} />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                  Delete expense
                </h3>
              </div>

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
                className="p-2 rounded-md hover:bg-slate-700 transition text-slate-400 hover:text-slate-200"
                aria-label="Close"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm text-slate-300">
                Are you sure you want to delete this expense? This action
                cannot be undone.
              </p>

              <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-cyan-400">Tip:</span> You can recover details from your bank or receipts manually.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
                className="px-4 py-2 rounded-full bg-slate-700 hover:bg-slate-600 transition text-sm font-medium text-slate-200"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium shadow-lg hover:shadow-red-500/50 transition-all"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;