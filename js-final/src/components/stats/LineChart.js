import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function LineChart({
  labelsArray,
  dataArray,
  color,
  title = "Untitled",
}) {
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
  };

  const data = {
    labels: labelsArray,
    datasets: [
      {
        fill: true,
        label: "Count",
        data: dataArray,
        // borderColor: "rgb(53, 162, 235)",
        backgroundColor: color,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
