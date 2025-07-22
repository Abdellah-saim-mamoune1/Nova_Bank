import { Banknote, HandCoins, Repeat2, Users, UserCog, UserPlus } from "lucide-react";
import EDashBoardCard from "./EDashBoardCard";
import RecentTransactions from "./RecentTransactions";
import { useAppDispatch } from "../features/Slices/hooks";
import { useAppSelector } from "../features/Slices/hooks";
import { fetchDashboardStats, fetchRecentTransactionsXtransfers } from "../features/EmployeeFeatures/Others/APIs";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import RecentTransfers from "./RecentTransfers";

import { ClientTransactionsChart } from "./ClientTransactionsChart";
export function EDashboard() {
  const dispatch=useAppDispatch();
  useEffect(() => {
     
        dispatch(fetchRecentTransactionsXtransfers());
        dispatch(fetchDashboardStats());
    
    }, []);
  
    
  const dashboardstats=useAppSelector(state=>state.EPages.GetDashboardStats);

 
  if( !dashboardstats){
  return <div className="w-full h-full flex items-center justify-center"><CircularProgress /></div> 
  }

  return (
    <div className=" gap-5 dark:text-gray-100 flex flex-col justify-start items-center w-full h-full">
      <div className="rounded-lg w-full">
        <h1 className="text-2xl mb-[-10px] dark:text-gray-200">Admin Dash Board</h1>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <EDashBoardCard
          title="Clients"
          count={dashboardstats.totalClients}
          icon={Users}
          iconBgColor="bg-blue-100 dark:bg-blue-700"
        />
        <EDashBoardCard
          title="Staff"
          count={dashboardstats.totalStaff}
          icon={UserCog}
          iconBgColor="bg-purple-100 dark:bg-purple-700"
        />
        <EDashBoardCard
          title="Deposits"
          count={dashboardstats.totalDeposits}
          icon={Banknote}
          iconBgColor="bg-green-100 dark:bg-green-700"
        />
        <EDashBoardCard
          title="Withdraws"
          count={dashboardstats.totalWithdrawls}
          icon={HandCoins}
          iconBgColor="bg-red-100 dark:bg-red-700"
        />
        <EDashBoardCard
          title="Transfers"
          count={dashboardstats.totalTransfers}
          icon={Repeat2}
          iconBgColor="bg-yellow-100 dark:bg-yellow-700"
        />
        <EDashBoardCard
          title="New Clients"
          count={dashboardstats.newClients}
          icon={UserPlus}
          iconBgColor="bg-cyan-100 dark:bg-cyan-700"
        />
      </div>
      <RecentTransactions/>
      <RecentTransfers/>
   < ClientTransactionsChart  />
    </div>
  );
}
