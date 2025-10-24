import React, { useEffect } from "react";
import { X } from "lucide-react";

const EditExpenseModal = ({ 
  editingExpense, 
  setEditingExpense, 
  handleEditSave, 
  categories
}) => {
  if (!editingExpense) return null;
  const fields = [
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Enter description",
    },
    {
      label: "Amount (₹)",
      name: "amount",
      type: "number",
      placeholder: "Enter amount",
      step: "0.01",
    },
    { label: "Date", name: "date", type: "date" },
    { label: "Category", name: "category", type: "select", options: categories },
  ];

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setEditingExpense(null);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setEditingExpense])

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 "
      onClick={() => setEditingExpense(null)}
    >
      <div 
        className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        >
        {/* Close Button */}
        <button
          onClick={() => setEditingExpense(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Expense
        </h3>

        {/* Form */}
        <form onSubmit={handleEditSave} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  defaultValue={editingExpense[field.name]}
                  required
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                >
                  {field.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  defaultValue={editingExpense[field.name]}
                  placeholder={field.placeholder}
                  step={field.step}
                  required
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 hover:shadow-lg transition-all duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;