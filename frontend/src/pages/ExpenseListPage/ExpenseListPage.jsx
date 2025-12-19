import { useState, useRef } from "react";
import { Search } from "lucide-react";
import { ref, update, remove } from "firebase/database";
import { db, auth } from "../../firebaseConfig";

import EditExpenseModal from "./EditExpenseModal";
import ExpenseList from "./ExpenseList";
import SearchFilter from "./SearchFilter";

const ExpenseListPage = ({
  expenses,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  categories,
  COLORS,
  userId,
  addNotifications,

}) => {
  const [filterDate, setFilterDate] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const modalRef = useRef(null);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || expense.category === filterCategory;
    const matchesDate = !filterDate || expense.date === filterDate;

    return matchesSearch && matchesCategory && matchesDate;
  });

  const handleEditSave = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedExpense = {
      ...editingExpense,
      description: form.description.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value),
      date: form.date.value,
    };
    const user = auth.currentUser;
    if (!user) return;

    try {
      const expenseRef = ref(db, `expenses/${user.uid}/${editingExpense.id}`);
      await update(expenseRef, updatedExpense);

      addNotifications({
        id: Date.now(),
        type: "success",
        message: "Expense updated successfully",
      });
      setEditingExpense(null); // close modal
    } catch (err) {
      console.error("Error updating:", err);
      addNotifications({
        id: Date.now(),
        type: "error",
        message: "Failed to update expense",
      });
    }
  };

  const handleDelete = async () => {
    if (!userId || !selectedId) return;
    try {
      const expenseRef = ref(db, `expenses/${userId}/${selectedId}`);
      await remove(expenseRef);
      addNotifications({
        id: Date.now(),
        type: "success",
        message: "Expense deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting expense:", error);
      addNotifications({
        id: Date.now(),
        type: "error",
        message: "Error deleting expense",
      });
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto sm:px-6 relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 flex items-center gap-3">
        <Search className="text-cyan-400" />
        Expense List
      </h2>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-6 mb-6 border border-slate-700">
        {/* Search + Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          categories={categories}
        />

        {/* Expense List */}
        <ExpenseList
          filteredExpenses={filteredExpenses}
          setEditingExpense={setEditingExpense}
          COLORS={COLORS}
          categories={categories}
          userId={userId}
          addNotifications={addNotifications}
          handleDelete={handleDelete}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          modalRef={modalRef}
          setSelectedId={setSelectedId}
        />
      </div>

      {/* Edit Modal */}
      {editingExpense && (
        <EditExpenseModal
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
          categories={categories}
          handleEditSave={handleEditSave}
        />
      )}

    </div>
  );
};

export default ExpenseListPage;
