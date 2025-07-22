import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../features/Slices/hooks";
import { fetchRecentTransactionsXtransfers } from "../features/EmployeeFeatures/Others/APIs";
import { TransferFundHistory } from "../features/EmployeeFeatures/Others/Interfaces";
import { LoadingCircle } from "../SharedComponents/LoadingCircle";
export function TransfersHistory() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [filterAccountId, setFilterAccountId] = useState("");
  const rowsPerPage = 5;

  useEffect(() => {
    dispatch(fetchRecentTransactionsXtransfers());
  }, [dispatch]);

  const Resenttransfers: TransferFundHistory[] | undefined = useAppSelector(
    (state) => state.EPages.DGetRecentTransactions?.transferFundHistory
  );

  if (!Resenttransfers) return <LoadingCircle/>;

  // Filter logic
  const filteredTransfers = filterAccountId
    ? Resenttransfers.filter(
        (t) =>
          t.senderAccount.includes(filterAccountId) ||
          t.recieverAccount.includes(filterAccountId)
      )
    : Resenttransfers;

  const totalPages = Math.ceil(filteredTransfers.length / rowsPerPage);
  const paginatedData = filteredTransfers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (direction: "prev" | "next") => {
    if (direction === "prev" && page > 0) setPage(page - 1);
    if (direction === "next" && (page + 1) * rowsPerPage < filteredTransfers.length)
      setPage(page + 1);
  };

  return (
    <div className="w-full dark:text-gray-100 dark:bg-gray-800 mx-auto bg-white p-4 px-7 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transfers History</h2>

      {/* Filter input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Account ID"
          value={filterAccountId}
          onChange={(e) => {
            setPage(0);
            setFilterAccountId(e.target.value);
          }}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full dark:border-gray-600 table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-900 dark:text-blue-400 dark:border-b-gray-600 text-gray-700 border-b border-gray-300 bg-gray-200">
              <th className="px-4 py-2 text-left">Sender ID</th>
              <th className="px-4 py-2 text-left">Recipient ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((transfer, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <td className="px-4 py-2">{transfer.senderAccount}</td>
                <td className="px-4 py-2">{transfer.recieverAccount}</td>
                <td className="p-3 text-green-600 dark:text-green-400 font-semibold">
                  {transfer.amount.toLocaleString()}DA
                </td>
                <td className="p-3 text-gray-500 dark:text-gray-100 text-sm">
                  {new Date(transfer.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No transfers found for this Account ID.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredTransfers.length > 0 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => handleChangePage("prev")}
            disabled={page === 0}
            className="px-2 py-1 sm:px-4 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p className="px-2 text-lg">
            {page + 1}/{totalPages}
          </p>
          <button
            onClick={() => handleChangePage("next")}
            disabled={(page + 1) * rowsPerPage >= filteredTransfers.length}
            className="px-2 py-1 sm:px-4 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
