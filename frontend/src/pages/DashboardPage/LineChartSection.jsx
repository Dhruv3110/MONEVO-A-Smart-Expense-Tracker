import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

const LineChartSection = ({ trendData, chartOptions }) => {
  const data = {
    labels: trendData.map(d => d.date),
    datasets: [
      {
        label: "Spending",
        data: trendData.map(d => d.amount),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(59,130,246,0.4)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-700 mb-4">7-Day Spending Trend</h3>
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
