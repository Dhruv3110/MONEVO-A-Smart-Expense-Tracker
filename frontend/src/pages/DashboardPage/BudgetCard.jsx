import React from "react";

const BudgetCard = ({category, expenses , budgets }) => {
  const spent = expenses
    .filter(e => e.category === category)
    .reduce((sum, e) => sum + e.amount, 0);
  const budget = budgets[category]?.monthly || 0;
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;

  const getColor = () =>
    percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-gray-700">{category}</h4>
        <div className={`w-3 h-3 rounded-full ${getColor()}`}></div>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">₹{spent.toFixed(2)} / ₹{budget.toFixed(2)}</span>
          <span className="font-semibold">{percentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default BudgetCard;