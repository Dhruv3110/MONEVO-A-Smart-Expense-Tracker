import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
import PieChartSection from "./PieChartSection";
import LineChartSection from "./LineChartSection";
import BudgetOverview from "./BudgetOverview";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler

);

const DashboardPage = ({ expenses, budgets, categories, COLORS }) => {

  const getCategoryData = () => {
    const categoryTotals = {};
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  // Trend data
  const getTrendData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const total = expenses
        .filter(e => e.date === date)
        .reduce((sum, e) => sum + e.amount, 0);
      return { date: date.slice(5), amount: total };
    });
  };

  const categoryData = getCategoryData();
  const trendData = getTrendData();

  // Common chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151", // Tailwind gray-700
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#374151",
        },
      },
      x: {
        ticks: {
          color: "#374151",
        },
      },
    },
  };

  

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <TrendingUp className="text-blue-600" />
        Dashboard
      </h2>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <PieChartSection 
          categoryData={categoryData} 
          COLORS={COLORS} 
          chartOptions={chartOptions} 
        />
        <LineChartSection 
          trendData={trendData}
          chartOptions={chartOptions}
        />
      </div>


      {/* Budget Overview Section */}
      <BudgetOverview
        expenses={expenses}
        budgets={budgets}
        categories={categories}
      />
    </div>
  );
};

export default DashboardPage;
