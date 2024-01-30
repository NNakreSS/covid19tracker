import {
  BarElement,
  CategoryScale,
  Chart as Chartjs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// redux
import { useSelector } from "react-redux";

const Chart = () => {
  const { selectedCountry, total } = useSelector((state) => state.covid);

  Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Current state in ${selectedCountry || "the world"}`,
      },
    },
  };

  const data = {
    labels: ["Infected", "Recovered", "Deaths", "Active"],
    datasets: [
      {
        label: "People",
        data: [
          total?.confirmed,
          total?.recovered,
          total?.deaths,
          total?.active,
        ],
        backgroundColor: [
          "rgb(191, 219, 254)",
          "rgb(187, 247, 208)",
          "rgb(254, 202, 202)",
          "rgb(254, 240, 138)",
        ],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
