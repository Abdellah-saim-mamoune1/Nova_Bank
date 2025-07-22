import { useState, useEffect } from "react";
import { TransactionHistory } from "../features/EmployeeFeatures/Others/Interfaces";

export function ClientTransactionsTable({ transactions }: { transactions: TransactionHistory[] }) {
  const [page, setPage] = useState(0);
  const [filterText, setFilterText] = useState("");

  const rowsPerPage = 5;

  // ✅ تصفية المعاملات حسب accountId
  const filteredTransactions = transactions.filter(tx =>
    tx.accountId.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  // ✅ بيانات الصفحة الحالية
  const paginatedData = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ✅ إعادة ضبط الصفحة عند تغيير الفلتر
  useEffect(() => {
    setPage(0);
  }, [filterText]);

  const handleChangePage = (direction: "prev" | "next") => {
    if (direction === "prev" && page > 0) setPage(page - 1);
    if (direction === "next" && (page + 1) * rowsPerPage < filteredTransactions.length) setPage(page + 1);
  };

  return (
    <div className="w-full dark:text-gray-100 dark:bg-gray-800 mx-auto bg-white p-4 px-7 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transactions History</h2>

      {/* ✅ حقل التصفية */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Account ID..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className=" w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full dark:border-gray-600 table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-900 dark:text-blue-400 dark:border-b-gray-600 text-gray-700 border-b border-gray-300 bg-gray-200">
              <th className="px-4 py-2 text-left">Account ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                  <td className="px-4 py-2">{transaction.accountId}</td>
                  <td className="px-4 py-2">{transaction.amount} DA</td>
                  <td className="p-3">{transaction.type}</td>
                  <td className="p-3">{transaction.transactionDate.toString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ أزرار التنقل */}
      {filteredTransactions.length > 0 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => handleChangePage("prev")}
            disabled={page === 0}
            className="px-2 py-1 sm:px-4 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p className="px-2 text-lg">{page + 1}/{totalPages}</p>
          <button
            onClick={() => handleChangePage("next")}
            disabled={(page + 1) * rowsPerPage >= filteredTransactions.length}
            className="px-2 py-1 sm:px-4 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
