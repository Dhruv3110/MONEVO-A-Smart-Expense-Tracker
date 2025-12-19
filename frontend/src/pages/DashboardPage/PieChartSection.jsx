import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartSection = ({ categoryData, COLORS, chartOptions }) => {
  const data = {
    labels: categoryData.map(d => d.name),
    datasets: [
      {
        data: categoryData.map(d => d.value),
        backgroundColor: COLORS,
        borderColor: "#1e293b", // slate-900
        borderWidth: 2,
        hoverBorderColor: "#0ea5e9", // cyan-500
        hoverBorderWidth: 3,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-6 hover:shadow-cyan-500/20 hover:shadow-3xl transition-all duration-300 border border-slate-700">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
        Spending by Category
      </h3>
      <div className="w-full h-80 max-w-full overflow-hidden">
        <Pie
          data={data}
          options={{
            ...chartOptions,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default PieChartSection;