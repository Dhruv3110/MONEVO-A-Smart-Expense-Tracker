import React from "react";
import { Pie } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from "chart.js";

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend
);


const PieChartSection = ({ categoryData, COLORS, chartOptions }) => {
  const data = {
    labels: categoryData.map(d => d.name),
    datasets: [
      {
        data: categoryData.map(d => d.value),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Spending by Category</h3>
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
  )
}

export default PieChartSection;
