import React from "react";
import BudgetCard from "./BudgetCard";

const BudgetOverview = ({ expenses, categories, budgets }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories.map(cat => (
        <BudgetCard
          key={cat}
          category={cat}
          expenses={expenses}
          budgets={budgets}
        />
      ))}
    </div>
  );
};

export default BudgetOverview;