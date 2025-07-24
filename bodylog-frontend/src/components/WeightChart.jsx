import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default function WeightChart({ measurements }) {
  const [visibleLines, setVisibleLines] = useState({
    weight: true,
    waist: false,
    chest: false,
    thigh: false,
  });

  const sorted = [...measurements].reverse();

  const labels = sorted.map((m) => m.date);


  const data = {
    labels,
    datasets: [
      visibleLines.weight &&
      {
        label: "Vægt (kg)",
        data: sorted.map((m) => Number(m.weight)),
        borderColor: "#3b82f6", // Tailwind blue-500
        backgroundColor: "#3B82F688",
        tension: 0.3,
        yAxisID: 'y',
      },
      visibleLines.waist &&
      {
        label: "Talje (cm)",
        data: sorted.map((m) => Number(m.waist)),
        borderColor: "#f59e0b", // Tailwind yellow-500
        backgroundColor: "#F59E0B88",
        tension: 0.3,
        yAxisID: 'y1',
        borderDash: [6, 6],
      },
      visibleLines.chest &&
      {
        label: "Bryst (cm)",
        data: sorted.map((m) => Number(m.chest)),
        borderColor: "#10b981", // Tailwind green-500
        backgroundColor: "#10B98188",
        tension: 0.3,
        yAxisID: 'y1',
        borderDash: [6, 6],
      },
      visibleLines.thigh &&
      {
        label: "Lår (cm)",
        data: sorted.map((m) => Number(m.thigh)),
        borderColor: "#ef4444", // Tailwind red-500
        backgroundColor: "#EF444488",
        tension: 0.3,
        yAxisID: 'y1',
        borderDash: [6, 6],
      },

    ].filter(Boolean),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
    title: {
      display: true,
      text: "Vægt og kropsmål over tid",
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        beginAtZero: false,
        title: { display: true, text: "Vægt (kg)" },
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Kropsmål (cm)" },
        grid: {
          drawOnChartArea: false,
        }
      },
      x: {
        title: { display: true, text: "Dato" },
      },
    },
  };

  if (measurements.length < 2) {
    return <p className="text-center text-gray-500 mt-6">Tilføj flere målinger for at se en graf.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Vægt over tid</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.entries(visibleLines).map(([key, value]) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={value}
              onChange={() => 
                setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            />
            {key === "weight" && "Vægt (kg)"}
            {key === "waist" && "Talje (cm)"}
            {key === "chest" && "Bryst (cm)"}
            {key === "thigh" && "Lår (cm)"}
          </label>
        ))}
      </div>
      <Line data={data} options={options} />
    </div>
  );
}
