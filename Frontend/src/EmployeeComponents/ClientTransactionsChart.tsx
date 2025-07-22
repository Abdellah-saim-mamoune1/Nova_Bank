import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import { useAppSelector } from "../features/Slices/hooks";

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

export function ClientTransactionsChart() {
  const transactions = useAppSelector(
    (state) => state.EPages.DGetRecentTransactions?.transactionsHistory
  );
  const transfers = useAppSelector(
    (state) => state.EPages.DGetRecentTransactions?.transferFundHistory
  );

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
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

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, []);

  if (!transactions || !transfers) return null;

  const textColor = isDarkMode ? "white" : "black";
  const gridColor = isDarkMode ? "#ffffff33" : "#00000022";
  const tooltipBackgroundColor = isDarkMode ? "black" : "#F3F4F6";
  const tooltipTitleColor = isDarkMode ? "white" : "black";
  const tooltipBodyColor = isDarkMode ? "white" : "black";

  const depositData = transactions.filter((t) => t.type === "Deposit");
  const withdrawData = transactions.filter((t) => t.type === "Withdraw");

  // Combine all data with a unified date key for sorting and labeling
  const sortedAll = [
    ...transactions.map((t) => ({
      type: t.type,
      amount: t.amount,
      unifiedDate: t.transactionDate,
    })),
    ...transfers.map((t) => ({
      type: "Transfer",
      amount: t.amount,
      unifiedDate: t.date,
    })),
  ].sort(
    (a, b) =>
      new Date(a.unifiedDate).getTime() - new Date(b.unifiedDate).getTime()
  );

  const formattedLabels = Array.from(
    new Set(
      sortedAll.map((t) =>
        new Date(t.unifiedDate).toISOString().split("T")[0]
      )
    )
  );

  const sumAmountsByDate = (data: any[], labels: any[], dateKey: string) =>
    labels.map((date) =>
      data
        .filter(
          (t) =>
            new Date(t[dateKey]).toISOString().split("T")[0] === date
        )
        .reduce((sum, t) => sum + t.amount, 0)
    );

  const depositAmounts = sumAmountsByDate(depositData, formattedLabels, "transactionDate");
  const withdrawAmounts = sumAmountsByDate(withdrawData, formattedLabels, "transactionDate");
  const transferAmounts = sumAmountsByDate(transfers, formattedLabels, "date");

  const maxAmount = Math.max(
    ...depositAmounts,
    ...withdrawAmounts,
    ...transferAmounts
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
      {
        label: "Transfers",
        data: transferAmounts,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
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
          Deposit, Withdraw & Transfer Trends
        </h2>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
