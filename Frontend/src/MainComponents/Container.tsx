
import TopNav from "../ClientDashBoardComponents/TopNav";
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from "../ClientDashBoardComponents/ContentPage/DashboardSection/DashBoard";
import { TransferFund } from "../ClientDashBoardComponents/ContentPage/Others/TransferFund";
import { TransactionHistory } from "../ClientDashBoardComponents/ContentPage/Others/TransactionHistory";
import { Account } from "../ClientDashBoardComponents/ContentPage/Profile/Account";
import { ProfileCards } from "../ClientDashBoardComponents/ContentPage/Others/ProfileCards";
import { AddSecondAccountForm } from "../ClientDashBoardComponents/ContentPage/Others/AddAccountForm";
import { GetHelp } from "../ClientDashBoardComponents/ContentPage/Others/GetHelp";
import { useAppSelector } from "../features/Slices/hooks";
import { useAppDispatch } from "../features/Slices/hooks";
import { useEffect} from "react";
import { MainBankRoutes } from "../MainBankPages/MainBankRoutes";
import { Navigate } from "react-router-dom";
import { Notifications } from "../ClientDashBoardComponents/ContentPage/NotificationsSection/Notifications";
import { CircularProgress } from "@mui/material";
import { EDashboard } from "../EmployeeComponents/EDashBoard";
import { AddClient } from "../EmployeeComponents/AddClient";
import { AllClientsInformations } from "../EmployeeComponents/ManageClients";
import { Deposit } from "../EmployeeComponents/Deposit";
import { Withdraw } from "../EmployeeComponents/Withdraw";
import { TransfersHistory } from "../EmployeeComponents/TransfersHistory";
import { DepositWithDrawHistory } from "../EmployeeComponents/DepositWithdrawHistory";
import { AddNewEmployee } from "../EmployeeComponents/AddNewEmployee";
import { EmployeeProfileCard } from "../EmployeeComponents/EmployeeInfosPage";
import { ManageEmployees } from "../EmployeeComponents/FManageEmployees/ManageEmployees";
import { RefreshTokenAPI } from "../features/EmployeeFeatures/Others/APIs";
import A from "../ClientDashBoardComponents/A";
import B from "../ClientDashBoardComponents/B";

export function Container() {
  const dispatch = useAppDispatch();
  const LoginInfos =useAppSelector((state:any) => state.MainSlice.logininfos);
  const a=localStorage.getItem('theme');
  const theme = a===null||undefined?'light':a;
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
   localStorage.setItem('theme', theme);
   dispatch(RefreshTokenAPI());

  }, []);

  
  if (LoginInfos === null || LoginInfos  === undefined) {

    return <div className="flex items-center justify-center h-screen items-center justify-center w-full h-full"><CircularProgress/></div>;
    
  }


  else if (LoginInfos.IsLoggedIn === false)//||!LoginInfos.Type)
    return <MainBankRoutes />
  


  return (
    <div className="w-full h-full flex flex-row">
      {LoginInfos.Type==="Employee"?<B/>:<A/>}
      <div className="flex-1 h-full overflow-y-auto flex flex-col">
      <TopNav />
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-3">
        {LoginInfos.Type==="Employee"&&
          <Routes>
         
            <Route path="/EDashboard" element={<EDashboard />} />
            <Route path="/EmployeeProfileCard" element={< EmployeeProfileCard />} />
            <Route path="/Manage-Clients" element={<AddSecondAccountForm />} />
            <Route path="/TransactionHistory" element={<TransactionHistory />} />
            <Route path="/transferFund" element={<TransferFund />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/ProfileCards" element={<ProfileCards />} />
            <Route path="/GetHelp" element={<GetHelp />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/GetAllClients" element={<AllClientsInformations />} />
            <Route path="*" element={<Navigate to="/EDashboard" />} />
            <Route path="/AddClient" element={< AddClient />} />
            <Route path="/Deposit" element={< Deposit />} />
            <Route path="/Withdraw" element={< Withdraw />} />
            <Route path="/TransfersHistory" element={< TransfersHistory />} />
            <Route path="/DepositWithDrawHistory" element={< DepositWithDrawHistory />} />
            <Route path="/AddNewEmployee" element={< AddNewEmployee />} />
            <Route path="/ManageEmployees" element={<  ManageEmployees />} />
           
           
          </Routes>}
          {LoginInfos.Type==="Client"&&
           <Routes>
         
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/Manage-Clients" element={<AddSecondAccountForm />} />

           <Route path="/TransactionHistory" element={<TransactionHistory />} />
           <Route path="/transferFund" element={<TransferFund />} />
           <Route path="/Account" element={<Account />} />
           <Route path="/ProfileCards" element={<ProfileCards />} />
           <Route path="/GetHelp" element={<GetHelp />} />
           <Route path="/Notifications" element={<Notifications />} />
           <Route path="*" element={<Navigate to="/dashboard" />} />

         
           
         </Routes>
          }
        </div>
      </div>
    </div>
  );
}
