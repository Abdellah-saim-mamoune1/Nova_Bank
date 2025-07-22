import { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TablePagination } from "@mui/material";

// Transaction Data Type
 export interface  ITransfer_Fund_Transaction {
  
  date: string;
  amount: string;
  status:"Completed" | "Pending" | "Failed";
};

// Reusable Transactions Table Component
export function Transfer_Fund_Table({ transactions }: { transactions:  ITransfer_Fund_Transaction[] }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // Set the number of rows per page

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="w-full  mx-auto bg-white p-4 px-7 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transfer Fund History</h2>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="font-bold">Amount</TableCell>
              <TableCell className="font-bold">Date</TableCell>
              <TableCell className="font-bold">Status</TableCell>

            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
              <TableRow  className="hover:bg-gray-100 transition-all">
                <TableCell>{transaction.amount}</TableCell>
                <TableCell className="font-bold">{transaction.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      transaction.status === "Completed" ? "bg-green-500" :
                      transaction.status === "Pending" ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />
    </div>
  );
}
