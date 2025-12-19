import { useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import CustomModal from "./CustomModal";

const ExpenseList = ({
  filteredExpenses,
  setEditingExpense,
  COLORS,
  categories,
  handleDelete,
  showDeleteModal,
  setShowDeleteModal,
  setSelectedId,
  modalRef
}) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowDeleteModal(false);
        setSelectedId(null);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowDeleteModal(false);
        setSelectedId(null);
      }
    };
    if (showDeleteModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showDeleteModal]);

  return (
    <>
      <div className="space-y-3">
        {filteredExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg"
                style={{
                  backgroundColor:
                    COLORS[categories.indexOf(expense.category) % COLORS.length],
                }}
              >
                ₹{expense.amount}
              </div>
              <div>
                <div className="font-semibold text-slate-100">
                  {expense.description}
                </div>
                <div className="text-sm text-slate-400">
                  {expense.category} • {expense.date}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setEditingExpense(expense)}
                className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-slate-700/50"
                title="Edit expense"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => {
                  setSelectedId(expense.id);
                  setShowDeleteModal(true);
                }}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-700/50"
                title="Delete expense"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {filteredExpenses.length === 0 && (
          <p className="text-center text-slate-400 py-6">No expenses found</p>
        )}
      </div>
      
      {/* Confirm Modal */}
      <CustomModal
        handleDelete={handleDelete}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        modalRef={modalRef}
        setSelectedId={setSelectedId}
      />
    </>
  );
};

export default ExpenseList;