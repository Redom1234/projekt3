import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export const TrendChart = ({ items }) => {
  if (!items.length) {
    return (
      <div className="glass-panel">
        <p className="text-sm text-slate-400">Diagrammet visas när data finns.</p>
      </div>
    )
  }

  const sorted = [...items].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )

  const data = {
    labels: sorted.map((item) => new Date(item.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Värde',
        data: sorted.map((item) => item.value),
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5f5',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.2)' },
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.2)' },
      },
    },
  }

  return (
    <div className="glass-panel">
      <h3 className="mb-4 text-lg font-semibold text-white">Trend</h3>
      <Line data={data} options={options} />
    </div>
  )
}

