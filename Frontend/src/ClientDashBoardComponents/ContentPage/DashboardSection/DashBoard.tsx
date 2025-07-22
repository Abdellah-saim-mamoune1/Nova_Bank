import { useState } from "react";
import { TransactionsTable } from "../Others/Table";
import { TransactionsChart } from "./Transactionschart";
import { useAppSelector } from "../../../features/Slices/hooks";
import AccountBalancePieChart from "./AnimatedProgressProvider";
import { LoadingCircle } from "../../../SharedComponents/LoadingCircle";
import { ITransactionsHistory } from "../../../features/Others/ClientInterfaces";

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 1;
   const transactions: ITransactionsHistory []= useAppSelector((state: any) => state.ClientInfos.TransactionsHistory);
    
  const clientInfo = useAppSelector((state) => state.ClientInfos.client_informations);
  const clientName = `${clientInfo?.firstName ?? ""} ${clientInfo?.lastName ?? ""}`.trim();
  const clientEmails = clientInfo?.bankEmails ?? [];

  if (!clientInfo || clientEmails.length === 0) {
    return <LoadingCircle />;
  }

  const totalPages = Math.ceil(clientEmails.length / cardsPerPage);
  const currentAccount = clientEmails[currentPage];

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="dark:bg-gray-900 gap-4 dark:text-gray-100 flex flex-col justify-start items-center w-full h-full">
      {/* Welcome */}
      <div className="p-4 dark:bg-gray-800 rounded-lg bg-white w-full shadow-md">
        <h1 className="text-2xl mb-1">
          Welcome <span className="text-blue-600">{clientName}</span>
        </h1>
        <p>Access and manage your accounts, cards efficiently.</p>
      </div>

      {/* Charts & Cards */}
      <div className="w-full min-h-60 h-auto flex flex-col md:flex-row gap-4">
        {/* Balance Pie Chart */}
        <div className="flex dark:bg-gray-800 flex-col rounded-xl bg-white w-full md:w-[60%] shadow-lg p-4">
          <h2 className="text-xl text-center mb-4 font-semibold">
            Your Total Current Balance 
          </h2>
          <div className="flex justify-center">
      
            <AccountBalancePieChart />
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex-1 bg-white dark:bg-gray-800 py-4 px-6 text-center flex flex-col items-center min-h-[200px] rounded-xl shadow-lg">
          <div className="w-full flex justify-between items-center mb-2">
            <h4 className="text-xl">Your Cards</h4>
            <p className="text-xl font-bold">Total: {clientEmails.length}</p>
          </div>

          {/* Card Preview */}
          <div className="h-49 w-full max-w-95 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-2">
            <div className="w-full  h-full flex flex-col justify-center items-start rounded-lg text-white p-4">
              <h3 className="text-2xl font-semibold">{currentAccount.balance} DA</h3>
              <div className="flex mt-auto w-full">
                <p className="mr-auto font-semibold">{clientName}</p>
                <p className="font-semibold">12/4</p>
              </div>
              <div className="flex w-full mt-2">
                <p className="mr-auto font-semibold">**** **** **** 1573</p>
                <p className="font-semibold">***</p>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="bg-gray-300 dark:bg-gray-200 dark:text-black px-3 py-1 rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <p className="text-lg">{currentPage + 1} / {totalPages}</p>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="bg-gray-300 dark:bg-gray-300 dark:text-black px-3 py-1 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>

        </div>
      </div>

      {/* Table & Chart */}
      <TransactionsTable /> 
      <TransactionsChart transactions={transactions}  />
    </div>
  );
}
