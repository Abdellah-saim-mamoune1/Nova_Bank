import { ITransactionsHistory } from "../../../features/Others/ClientInterfaces";
import { useAppSelector } from "../../../features/Slices/hooks";
// Reusable Transactions Table Component
export function TransactionsTable( ) {
  const transactions:ITransactionsHistory[] = useAppSelector((state: any) => state.ClientInfos.ResentTransactions);
  
if(!transactions)
  return 
  
  return (
   
    <div className="w-full dark:bg-gray-800  mx-auto bg-white p-4 px-7 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
     
      <div className="overflow-x-auto">
        <table className="min-w-full border-1 dark:border-gray-700 border-gray-300 table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b-1 border-b-gray-300 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-400 text-left">
              <th className="p-3 font-bold">N</th>
              <th className="p-3 font-bold">Amount</th>
              <th className="p-3 font-bold">Type</th>
              <th className="p-3 font-bold">Date</th>
            </tr>
          </thead>
          <tbody >
            {transactions&&transactions.map((transaction) => (
              <tr
                key={transaction.n}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <td className="p-3">{transaction.n}</td>
                <td className="p-3 ">{transaction.amount}</td>
                <td className="p-3">{transaction.type}</td>
                <td className="p-3">{transaction.date.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
