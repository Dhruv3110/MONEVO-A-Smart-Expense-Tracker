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

  // Dark theme chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e0e7ff", // Indigo-100
          font: {
            size: 12,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)", // slate-900
        titleColor: "#e0e7ff",
        bodyColor: "#cbd5e1",
        borderColor: "#3b82f6",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#94a3b8", // slate-400
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)", // subtle grid
        },
      },
      x: {
        ticks: {
          color: "#94a3b8", // slate-400
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 flex items-center gap-3">
        <TrendingUp className="text-cyan-400" />
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