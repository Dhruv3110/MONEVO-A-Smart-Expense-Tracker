import React from "react";

const BudgetCard = ({ category, expenses, budgets }) => {
  const spent = expenses
    .filter(e => e.category === category)
    .reduce((sum, e) => sum + e.amount, 0);
  const budget = budgets[category]?.monthly || 0;
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;

  const getColor = () => {
    if (percentage > 90) return "bg-red-500";
    if (percentage > 70) return "bg-yellow-500";
    return "bg-gradient-to-r from-cyan-500 to-blue-500";
  };

  const getGlowColor = () => {
    if (percentage > 90) return "shadow-red-500/50";
    if (percentage > 70) return "shadow-yellow-500/50";
    return "shadow-cyan-500/50";
  };

  const getBarColor = () => {
    if (percentage > 90) return "from-red-500 to-red-600";
    if (percentage > 70) return "from-yellow-500 to-yellow-600";
    return "from-cyan-500 to-blue-500";
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-6 hover:shadow-indigo-500/30 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-100 text-lg">{category}</h4>
        <div className={`w-3 h-3 rounded-full ${getColor()} ${getGlowColor()} shadow-lg`}></div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">
            ₹{spent.toFixed(2)} / ₹{budget.toFixed(2)}
          </span>
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            {percentage.toFixed(0)}%
          </span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div
            className={`h-2.5 rounded-full bg-gradient-to-r ${getBarColor()} transition-all duration-500 shadow-lg`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Remaining</span>
          <span className={`font-semibold ${budget - spent >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
            ₹{(budget - spent).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;