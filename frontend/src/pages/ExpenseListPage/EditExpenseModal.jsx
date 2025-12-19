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
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setEditingExpense]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() => setEditingExpense(null)}
    >
      <div 
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative animate-scaleIn border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setEditingExpense(null)}
          className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 text-center">
          Edit Expense
        </h3>

        {/* Form */}
        <form onSubmit={handleEditSave} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-slate-300 font-medium mb-2">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  defaultValue={editingExpense[field.name]}
                  required
                  className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-xl text-slate-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all cursor-pointer"
                >
                  {field.options.map((opt) => (
                    <option key={opt} className="bg-slate-900">{opt}</option>
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
                  className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;