import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataItem {
  name: string; // Date
  received: number;
  sent: number;
}

interface LineChartComponentProps {
  data: DataItem[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
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
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const gridColor = isDarkMode ? "#ffffff33" : "#00000022";
  const tooltipBg = isDarkMode ? "#1f2937" : "#f9fafb";

  return (
    <div className="w-full dark:bg-gray-800 bg-white rounded-lg overflow-x-auto max-w-full">
      <div className="min-w-[350px]">
        <h5 className="p-5 text-xl font-bold text-black dark:text-white">
          Received Transfer & Sent Transfer (Last 30 Days)
        </h5>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} tick={{ fill: textColor }} />
            <YAxis stroke={textColor} tick={{ fill: textColor }} />
            <Tooltip
              contentStyle={{ backgroundColor: tooltipBg, border: "none" }}
              labelStyle={{ color: textColor }}
              itemStyle={{ color: textColor }}
            />
            <Legend wrapperStyle={{ color: textColor }} />
            <Line type="monotone" dataKey="received" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sent" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
