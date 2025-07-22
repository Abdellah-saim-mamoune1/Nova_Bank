import { useState } from "react";
import { ITransactionsHistory } from "../../../features/Others/ClientInterfaces";
export function TransactionsTable_Pagination({ transactions }: { transactions:ITransactionsHistory []}) {

  if(transactions===null){
    return( <div className="w-full dark:text-gray-100 dark:bg-gray-800 mx-auto bg-white p-4 px-7 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transactions History</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full dark:border-gray-600 table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-900 dark:text-blue-400 dark:border-b-gray-600  text-gray-700 border-b border-gray-300 bg-gray-200">
              <th className=" px-4 py-2 text-left">N</th>
              <th className=" px-4 py-2 text-left">Amount</th>
              <th className=" px-4 py-2 text-left">Type</th>          
              <th className=" px-4 py-2 text-left">Date</th>
           
            </tr>
          </thead>
        </table>
      </div>
    </div>);
  }


  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
const totalpages=Math.ceil(transactions.length/5);
  const handleChangePage = (direction: "prev" | "next") => {
    if (direction === "prev" && page > 0) setPage(page - 1);
    if (direction === "next" && (page + 1) * rowsPerPage < transactions.length) setPage(page + 1);
  };

  const paginatedData = transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="w-full dark:text-gray-100 dark:bg-gray-800 mx-auto bg-white p-4 px-7 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transactions History</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full dark:border-gray-600 table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-900 dark:text-blue-400 dark:border-b-gray-600  text-gray-700 border-b border-gray-300 bg-gray-200">
              <th className=" px-4 py-2 text-left">N</th>
              <th className=" px-4 py-2 text-left">Amount</th>
              <th className=" px-4 py-2 text-left">Type</th>
              <th className=" px-4 py-2 text-left">Date</th>
           
            </tr>
          </thead>
          <tbody>
            {transactions&&paginatedData.map((transaction) => (
              <tr key={transaction.n} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                  <td className="px-4 py-2">{transaction.n}</td>
                <td className="px-4 py-2">{transaction.amount}DA</td>
                <td className="p-3">{transaction.type}</td>
                <td className="p-3">{transaction.date.toString()}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Pagination Buttons */}
      {transactions!==null && transactions!==undefined&&<div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => handleChangePage("prev")}
          disabled={page === 0}
          className="px-4 py-1 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p className="px-2 text-lg">{page+1}/{totalpages}</p>
        <button
          onClick={() => handleChangePage("next")}
          disabled={(page + 1) * rowsPerPage >= transactions.length}
          className="px-4 py-1 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>}
    </div>
  );
}
