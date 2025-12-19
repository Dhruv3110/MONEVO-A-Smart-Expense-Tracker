import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { db, auth } from '../../firebaseConfig';
import { ref, set } from "firebase/database";

const BudgetPage = ({ 
  budgets, 
  setBudgets, 
  categories, 
  userId, 
  addNotifications 
}) => {
  const defaultBudgets = {
    Food: { monthly: 500, weekly: 125 },
    Beverages: { monthly: 150, weekly: 37.5 },
    Grocery: { monthly: 400, weekly: 100 },
    Electronics: { monthly: 300, weekly: 75 },
    Clothing: { monthly: 250, weekly: 62.5 },
    Entertainment: { monthly: 200, weekly: 50 },
    Utilities: { monthly: 350, weekly: 87.5 },
    Transport: { monthly: 200, weekly: 50 },
    Other: { monthly: 100, weekly: 25 },
  };
  const [loading, setLoading] = useState(false);

  const handleSaveBudgets = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const budgetRef = ref(db, `budgets/${userId}`);
      await set(budgetRef, budgets)
      addNotifications({
        id: Date.now(),
        type: "success",
        message: "Budgets saved successfully",
      });
    }
    catch (err) {
      console.error("Error saving budgets:", err);
      addNotifications({
        id: Date.now(),
        type: "error",
        message: "Failed to save budgets",
      });
    }
    finally {
      setLoading(false);
    }
  }

  const handleResetBudgets = async () => {
    if (!userId) return;
    try {
      setBudgets(defaultBudgets);
      const budgetRef = ref(db, `budgets/${userId}`);
      await set(budgetRef, defaultBudgets);
      addNotifications({
        id: Date.now(),
        type: "success",
        message: "Budgets reset to default",
      });
    }
    catch (err) {
      console.error("Error resetting budgets:", err);
      addNotifications({
        id: Date.now(),
        type: "error",
        message: "Failed to reset budgets",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 flex items-center gap-3">
        <DollarSign className="text-cyan-400" />
        Budget Setup
      </h2>
      
      <div className="space-y-4">
        {categories.map((cat) => (
          <div 
            key={cat} 
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-6 hover:shadow-cyan-500/30 transition-all duration-300 border border-slate-700"
          >
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></span>
              {cat}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Monthly Budget
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-semibold">₹</span>
                  <input
                    type="number"
                    value={budgets[cat]?.monthly || 0}
                    onChange={(e) => setBudgets({
                      ...budgets,
                      [cat]: { ...budgets[cat], monthly: parseFloat(e.target.value) || 0 }
                    })}
                    className="w-full pl-8 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Weekly Budget
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 font-semibold">₹</span>
                  <input
                    type="number"
                    value={budgets[cat]?.weekly || 0}
                    onChange={(e) => setBudgets({
                      ...budgets,
                      [cat]: { ...budgets[cat], weekly: parseFloat(e.target.value) || 0 }
                    })}
                    className="w-full pl-8 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 flex justify-end gap-4">
        <button
          onClick={handleResetBudgets}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105"
        >
          Reset Default
        </button>

        <button
          onClick={handleSaveBudgets}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </span>
          ) : (
            "Save Budgets"
          )}
        </button>
      </div>
    </div>
  )
}

export default BudgetPage;