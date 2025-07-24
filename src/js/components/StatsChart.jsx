import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { getPastDates } from '../utils/dateUtils';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StatsChart({ habits = [] }) {
  const [range, setRange] = useState(7); // 7 または 30

  const safeHabits = Array.isArray(habits) ? habits : [];
  const days = getPastDates(range);

  const labels = safeHabits.map((h) => h.name);
  const percentages = safeHabits.map((h) => {
    const doneCount = days.reduce(
      (acc, d) => acc + (h.history?.[d] ? 1 : 0),
      0
    );
    return Math.round((doneCount / days.length) * 100);
  });

  const data = {
    labels,
    datasets: [
      {
        label: `過去${range}日間の達成率 (%)`,
        data: percentages,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: { suggestedMax: 100, ticks: { stepSize: 20 } },
    },
  };

  if (safeHabits.length === 0) {
    return (
      <div className="mt-8 bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          習慣ごとの達成率
        </h3>
        <p className="text-gray-500">習慣を追加するとグラフが表示されます。</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        習慣ごとの達成率
      </h3>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setRange(7)}
          disabled={range === 7}
          className={`px-4 py-2 rounded ${
            range === 7
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          1週間
        </button>
        <button
          onClick={() => setRange(30)}
          disabled={range === 30}
          className={`px-4 py-2 rounded ${
            range === 30
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          1ヶ月
        </button>
      </div>

      <Bar data={data} options={options} />
    </div>
  );
}
