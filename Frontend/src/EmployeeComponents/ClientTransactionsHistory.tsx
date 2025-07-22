import React from "react";
import { useAppDispatch,useAppSelector } from "../features/Slices/hooks";
import { setaccounttransactionshistory } from "../features/EmployeeFeatures/Slices/PagesSlice";
import { LoadingCircle } from "../SharedComponents/LoadingCircle";
import { ClientTransactionsTable } from "./ClientTransactionsTable";
import { useEffect } from "react";
import { ClientTransfersTable } from "./ClientTransfersHistory";
import { setclienttransfershistory } from "../features/EmployeeFeatures/Slices/PagesSlice";
import { ArrowBack } from "@mui/icons-material";
interface ClientTransactionsHistoryProps {
  accountids: string[];
  onreturn:()=>void;
}

export const ClientTransactionsHistory: React.FC<ClientTransactionsHistoryProps> = ({ accountids,onreturn }) => {
  const dispatch = useAppDispatch();
    const transactions=useAppSelector(state=>state.EPages.clienttransactionshistory);
    const transfers=useAppSelector(state=>state.EPages.clienttransfershistory);

   useEffect (()=>{
 dispatch(setaccounttransactionshistory(accountids));
dispatch(setclienttransfershistory(accountids))


   },[])
     
if(!transactions||!transfers)
    return (< LoadingCircle/>)

console.log(transactions);


  return (
    <div>
      <h2 className="text-2xl dark:text-gray-100 mb-3">Client Transactions</h2>
     <button onClick={onreturn} className="ml-2 w-10 mb-2 px-2 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow">
        <ArrowBack />
        </button>
      <div className="flex flex-col gap-4">
<ClientTransactionsTable  transactions={transactions}/>
<ClientTransfersTable transfers={transfers} />
      </div>
    </div>
  );
};
