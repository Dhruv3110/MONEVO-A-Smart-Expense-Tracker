import { useEffect } from "react";
import { Edit, Trash2} from "lucide-react";
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
      if(modalRef.current && !modalRef.current.contains(e.target)) {
        setShowDeleteModal(false)
        setSelectedId(null);
      }
    }
    const handleEsc = (e) => {
      if (e.key === "Escape"){
        setShowDeleteModal(false);
        setSelectedId(null);
      }
    }
    if(showDeleteModal) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEsc)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [showDeleteModal])

  
  return (
    <>
    
    <div className="space-y-3">
      {filteredExpenses.map((expense) => (
        <div
          key={expense.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-4 mb-3 sm:mb-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base"
              style={{
                backgroundColor:
                  COLORS[categories.indexOf(expense.category) % COLORS.length],
              }}
            >
              {expense.amount}
            </div>
            <div>
              <div className="font-semibold text-gray-800">
                {expense.description}
              </div>
              <div className="text-sm text-gray-500">
                {expense.category} • {expense.date}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditingExpense(expense)}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => {
                setSelectedId(expense.id);
                setShowDeleteModal(true);
              }}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      {filteredExpenses.length === 0 && (
        <p className="text-center text-gray-500 py-6">No expenses found</p>
      )}
    </div>
    {/* Confirm Modal (Apple-like sheet / centered card) */}
      <CustomModal
        handleDelete = {handleDelete}
        showDeleteModal = {showDeleteModal}
        setShowDeleteModal = {setShowDeleteModal}
        modalRef = {modalRef}
        setSelectedId={setSelectedId}
      />
    </>

  )
}
export default ExpenseList;