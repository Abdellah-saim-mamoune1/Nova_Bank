import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Standard", value: 120 },
  { name: "Savings", value: 85 },
  { name: "Business", value: 45 },
  { name: "Premium", value: 30 },
];

export default function AccountTypeBarChart() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");

    const observer = new MutationObserver(() => {
      const updatedTheme = localStorage.getItem("theme") || "light";
      setIsDark(updatedTheme === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const axisColor = isDark ? "#ffffff" : "#374151";
  const gridColor = isDark ? "#4b5563" : "#e5e7eb";
  const tooltipBg = isDark ? "#1f2937" : "#ffffff";
  const tooltipText = isDark ? "#f9fafb" : "#1f2937";
  const tooltipBorder = isDark ? "#4b5563" : "#e2e8f0";

  return (
    <div className="w-full  mx-auto rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Users by Account Type
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="name"
            tick={{ fill: axisColor }}
            axisLine={{ stroke: axisColor }}
            tickLine={{ stroke: axisColor }}
          />
          <YAxis
            tick={{ fill: axisColor }}
            axisLine={{ stroke: axisColor }}
            tickLine={{ stroke: axisColor }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              color: tooltipText,
            }}
            labelStyle={{ color: tooltipText }}
            itemStyle={{ color: tooltipText }}
          />
          <Legend
            wrapperStyle={{
              color: axisColor,
            }}
          />
        <Bar dataKey="value" fill="rgba(75, 192, 192, 0.4)" stroke="rgba(75, 192, 192, 1)" strokeWidth={1} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
