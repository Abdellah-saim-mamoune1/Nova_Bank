import { TransactionsTable_Pagination } from "./Table_Pagination"
import { useAppSelector } from "../../../features/Slices/hooks";
import { CircularProgress } from "@mui/material";
export function TransactionHistory(){
const TransactionsHistory= useAppSelector((state: any) => state.ClientInfos.TransactionsHistory);
 if (TransactionsHistory===undefined) {
     return    <div className="w-full h-full flex items-center justify-center dark:bg-gray-900"> <CircularProgress /></div>;
   }
  
    return <div className="flex-1 dark:bg-gray-900 flex flex-col itmes-center justify-center h-full ">
<TransactionsTable_Pagination transactions={TransactionsHistory}/>

    </div>
}