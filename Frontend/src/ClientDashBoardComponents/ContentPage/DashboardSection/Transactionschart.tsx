import { useState } from "react";
import { Line } from "react-chartjs-2";
import { ITransactionsHistory } from "../../../features/Others/ClientInterfaces";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function TransactionsChart({transactions}:{transactions:ITransactionsHistory []}) {
  //const transactions: ITransactionsHistory []= useAppSelector((state: any) => state.ClientInfos.TransactionsHistory);
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark")
  );



  if(!transactions)
    return 
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    const observer = new MutationObserver(handleChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    mediaQuery.addEventListener("change", handleChange);

   
 

  const textColor = isDarkMode ? "white" : "black";
  const gridColor = isDarkMode ? "#ffffff33" : "#00000022";
  const tooltipBackgroundColor = isDarkMode ? "black" : "#F3F4F6";
  const tooltipTitleColor = isDarkMode ? "white" : "black";
  const tooltipBodyColor = isDarkMode ? "white" : "black";

  const depositData = transactions.filter((t) => t.type === "Deposit");
  const withdrawData = transactions.filter((t) => t.type === "Withdraw");

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formattedLabels = Array.from(
    new Set(
      sortedTransactions.map((t) =>
        new Date(t.date).toISOString().split("T")[0]
      )
    )
  );

  // Sum deposits per date
  const depositAmounts = formattedLabels.map((date) => {
    const total = depositData
      .filter((t) => new Date(t.date).toISOString().split("T")[0] === date)
      .reduce((sum, t) => sum + t.amount, 0);
    return total;
  });

  // Sum withdrawals per date
  const withdrawAmounts = formattedLabels.map((date) => {
    const total = withdrawData
      .filter((t) => new Date(t.date).toISOString().split("T")[0] === date)
      .reduce((sum, t) => sum + t.amount, 0);
    return total;
  });

  const maxAmount = Math.max(
    Math.max(...depositAmounts),
    Math.max(...withdrawAmounts)
  );

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Deposits",
        data: depositAmounts,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.3,
      },
      {
        label: "Withdrawals",
        data: withdrawAmounts,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        backgroundColor: tooltipBackgroundColor,
        titleColor: tooltipTitleColor,
        bodyColor: tooltipBodyColor,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxAmount + 100,
        ticks: {
          stepSize: Math.ceil(maxAmount / 10),
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 10,
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className="w-full dark:bg-gray-800 p-5 bg-white rounded-lg overflow-x-auto max-w-full">
      <div className="min-w-[500px]">
        <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>
          Deposit & Withdraw Trends
        </h2>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
