import {  Trash2, X as XIcon } from "lucide-react";
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* sheet/card */}
          <motion.div
            ref={modalRef}
            initial={{ y: -20, opacity: 0 }}        // slide down from top
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            {/* Header with X */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100">
                  <Trash2 className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete expense
                </h3>
              </div>

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this expense? This action
                cannot be undone.
              </p>

              <div className="mt-4 text-sm text-gray-500">
                <em className="block">Tip:</em>
                <span>
                  You can recover details from your bank or receipts manually.
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CustomModal;