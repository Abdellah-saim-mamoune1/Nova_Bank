import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../../features/Slices/hooks";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF66A1"];

export default function AccountBalancePieChart() {
  const clientInfo = useAppSelector((state: any) => state.ClientInfos.client_informations);
  if (!clientInfo || !Array.isArray(clientInfo.bankEmails)) return null;

  const accountBalances = clientInfo.bankEmails.map((email: any) => email.balance);
  const accountIds = clientInfo.bankEmails.map((email: any) => email.accountId);

  const data = accountBalances.map((balance: any, index: string | number) => ({
    name: accountIds[index],
    value: balance,
  }));

  return (
    <div className="w-full flex justify-center">
      <div className="w-[267px] 2xl:text-xl text-sm sm:w-[334px] h-[240px] sm:h-[279px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="78%"
              dataKey="value"
              labelLine={false}
             
            >
              {data.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toLocaleString()} DA`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
