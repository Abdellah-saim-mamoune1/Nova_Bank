import { fetchRecentTransactionsXtransfers } from "../features/EmployeeFeatures/Others/APIs";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../features/Slices/hooks";
import { LoadingCircle } from "../SharedComponents/LoadingCircle";

export function DepositWithDrawHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAccountId, setFilterAccountId] = useState("");
  const rowsPerPage = 5;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecentTransactionsXtransfers());
  }, [dispatch]);

  const transactions = useAppSelector(
    (state) => state.EPages.DGetRecentTransactions?.transactionsHistory
  );

  if (!transactions) return <LoadingCircle />;

  // Apply filtering
  const filteredTransactions = filterAccountId
    ? transactions.filter((tx) =>
        tx.accountId?.includes(filterAccountId) ||
        tx.clientFullName?.toLowerCase().includes(filterAccountId.toLowerCase())
      )
    : transactions;

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full dark:text-gray-100 dark:bg-gray-800 mx-auto bg-white p-4 px-7 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
          Recent Transactions
        </h3>
      
      </div>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by ID or Client Name"
          value={filterAccountId}
          onChange={(e) => {
            setCurrentPage(1);
            setFilterAccountId(e.target.value);
          }}
          className="w-52 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full dark:border-gray-600 table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-900 dark:text-blue-400 dark:border-b-gray-600 text-gray-700 border-b border-gray-300 bg-gray-200">
              <th className="px-4 py-2 text-left">Account ID</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((tx, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                  <td className="px-4 py-2 ">
                 {tx.accountId}
                 
                </td>
                <td className="px-4 py-2 flex items-center gap-3">
                  <span className="text-gray-800 dark:text-white font-medium text-sm sm:text-base">
                    {tx.clientFullName}
                  </span>
                </td>
                <td className="px-4 py-2">{tx.type}</td>
                <td className="px-4 py-2 text-green-600 dark:text-green-400 font-semibold">
                  {tx.amount.toLocaleString()}DA
                </td>
                <td className="px-4 py-2 text-gray-500 dark:text-gray-100 text-sm">
                  {new Date(tx.transactionDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {currentTransactions.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length > 0 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 sm:px-4 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p className="px-2 text-lg text-gray-700 dark:text-white">
            {currentPage}/{totalPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 sm:px-4 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
