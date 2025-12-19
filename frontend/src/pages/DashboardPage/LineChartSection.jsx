import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

const LineChartSection = ({ trendData, chartOptions }) => {
  const data = {
    labels: trendData.map(d => d.date),
    datasets: [
      {
        label: "Spending",
        data: trendData.map(d => d.amount),
        borderColor: "#06b6d4", // cyan-500
        backgroundColor: "rgba(6, 182, 212, 0.15)", // cyan with transparency
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#22d3ee", // cyan-400
        pointBorderColor: "#164e63", // cyan-900
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#67e8f9", // cyan-300
        pointHoverBorderColor: "#06b6d4",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-6 hover:shadow-blue-500/20 hover:shadow-3xl transition-all duration-300 border border-slate-700">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 mb-4">
        7-Day Spending Trend
      </h3>
      <div className="w-full h-80 max-w-full overflow-hidden">
        <Line
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

export default LineChartSection;