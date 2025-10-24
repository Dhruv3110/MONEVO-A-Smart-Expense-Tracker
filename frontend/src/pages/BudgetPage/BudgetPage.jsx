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
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <DollarSign className="text-blue-600" />
        Budget Setup
      </h2>
      
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-700 mb-4">{cat}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Monthly Budget</label>
                <input
                  type="number"
                  value={budgets[cat]?.monthly || 0}
                  onChange={(e) => setBudgets({
                    ...budgets,
                    [cat]: { ...budgets[cat], monthly: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Weekly Budget </label>
                <input
                  type="number"
                  value={budgets[cat]?.weekly || 0}
                  onChange={(e) => setBudgets({
                    ...budgets,
                    [cat]: { ...budgets[cat], weekly: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-end gap-4">
        <button
          onClick={handleResetBudgets}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl"
        >
          Reset Default
        </button>

        <button
          onClick={handleSaveBudgets}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Budgets"}
        </button>
      </div>
    </div>
  )
}

export default BudgetPage;