
import { fetchRecentTransactionsXtransfers } from "../features/EmployeeFeatures/Others/APIs";
import { useEffect } from "react";
import { useAppSelector } from "../features/Slices/hooks";
import { useAppDispatch } from "../features/Slices/hooks";


const RecentTransactions = () => {
const dispatch=useAppDispatch();
useEffect(()=>{
dispatch(fetchRecentTransactionsXtransfers());
},[]);

const transactions=useAppSelector(state=>state.EPages.DGetRecentTransactions?.transactionsHistory);

if(!transactions)
  return <div>gg</div>
  
  return (
    <div className="w-full  rounded-2xl shadow-xl bg-white dark:bg-gray-800  overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
          Recent Transactions
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm sm:text-[15px] text-left">
          <thead className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-blue-400 uppercase tracking-wide text-xs sm:text-sm">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Transaction Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.slice(0, 5).map((tx,index) => {
             
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-150"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                   
                    <span className="text-gray-800 dark:text-white font-medium text-sm sm:text-base">
                      {tx.clientFullName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                   
                      {tx.type}
                   
                  </td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">
                    {tx.amount.toLocaleString()}DA
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-100 text-sm">
                    {new Date(tx.transactionDate).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
