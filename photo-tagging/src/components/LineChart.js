import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import autocolors from "chartjs-plugin-autocolors";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  autocolors,
  TimeScale
);

export default function LineChart({ title = "" }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  const labels = [
    new Date(2023, 1, 11),
    new Date(2023, 1, 12),
    new Date(2023, 1, 12),
    new Date(2023, 1, 13),
    new Date(2023, 2, 16),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Marvel Universe",
        data: labels.map(() => Math.random() * 300),
      },
      {
        label: "Anime Party",
        data: labels.map(() => Math.random() * 300),
      },
      {
        label: "Pixel Madness",
        data: labels.map(() => Math.random() * 300),
      },
    ],
  };

  return <Line options={options} data={data} />;
}
