import { EditClientInfos } from "../ClientDashBoardComponents/ContentPage/Profile/EditClientInfos";
import { useAppSelector } from "../features/Slices/hooks";
import { LoadingCircle } from "../SharedComponents/LoadingCircle";
import { useState } from "react";
import { FreezeUnfreezeClientAccount } from "../features/EmployeeFeatures/Others/APIs";
import { setClientAccountState } from "../features/EmployeeFeatures/Slices/PagesSlice";
import { useAppDispatch } from "../features/Slices/hooks";
import { CircularProgress } from "@mui/material";
import { SendMessageToClient } from "./SendMessageToClient";
import { ArrowBack } from "@mui/icons-material";
import { returnto } from "../features/EmployeeFeatures/Others/Interfaces";
import { ClientTransactionsHistory } from "./ClientTransactionsHistory";

export function ManagedClientInfos({returnaction}:{returnaction:returnto}) {
  const client = useAppSelector(state => state.EPages.ManagedClientsInfos);
  const [showedinfos,setshoweditinfos]=useState(false);
  const [confirmation,setconfirmation]=useState(false);
  const [freeze,setfreeze]=useState<{accountid:string,thestate:boolean}>();
  const [showsendclientmessage,setshowsendclientmessage]=useState(false);
  const [showtransactions,setshowtransactions]=useState(false);
  const[showcircularprogress,setshowcircularprogress]=useState(false);
  const[freezingresult,setfreezingresult]=useState<boolean|null>(null);
  const token=useAppSelector(state=>state.MainSlice.Token);

const dispatch=useAppDispatch();
 const handleSave = () => {
   
   setshoweditinfos(false);
  };
    if (!client) return <LoadingCircle />;
   const defaultUser = {
    accountId: client.bankEmails[0]?.accountId,
    firstName: client.firstName,
    lastName: client.lastName,
    birthDate: client.birthDate,
    email: client.personalEmail,
    address: client.address,
    phoneNumber: client.phoneNumber,
  };

  const Accounts=client.bankEmails.map(p=>p.accountId);

async function  setupdates(){
 
  setshowcircularprogress(true);
  if(freeze!=null){
    const f=await  FreezeUnfreezeClientAccount(freeze.accountid,freeze.thestate?"DisActivate":"Activate",token);
    setfreezingresult(f);
 if(f===true)
  dispatch(setClientAccountState(freeze));
}

else if(freeze===null){
  setfreezingresult(false);
 
}

   setshowcircularprogress(false);
   setconfirmation(false);
 

}

const accounts=client.bankEmails.map(a=>{
 return a.accountId
}
);


  if(!showedinfos&&!showsendclientmessage&&!showtransactions){
  return (
   
    <div className="h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <h1 className="mb-3 text-2xl dark:text-gray-200">
        Manage Clients/Manage {client.firstName} {client.lastName}
      </h1>

    

      {/* Action Buttons */}
    
          <button onClick={returnaction.onreturn} className="ml-2 mb-2 px-2 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow">
        <ArrowBack />
        </button>
          <div className="flex flex-wrap gap-3 px-2 mb-4">
        <button onClick={()=>setshoweditinfos(true)} className="px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
          Update Info
        </button>
        <button onClick={()=>setshowsendclientmessage(true)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow">
          Send Message
        </button>
         <button onClick={()=>setshowtransactions(true)} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg shadow">
          Transactions History
        </button>
       
      </div>

      {/* Client Info */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md space-y-6">
        {/* Basic Info */}
        <section className="space-y-1">
          <h2 className="text-2xl font-bold">
            {client.firstName} {client.lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Role: {client.roleType}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Status: {client.isActive ? "Active" : "Inactive"}
          </p>
        </section>

        {/* Personal Info & Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Personal Info</h3>
            <p><span className="font-medium">Birth Date:</span> {new Date(client.birthDate).toLocaleDateString()}</p>
            <p><span className="font-medium">Phone:</span> {client.phoneNumber}</p>
            <p><span className="font-medium">Email:</span> {client.personalEmail}</p>
            <p><span className="font-medium">Address:</span> {client.address}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Cards</h3>
            <ul className="list-disc list-inside space-y-1">
              {client.cards.map((card, idx) => (
                <li key={idx}>
                  <span className="font-medium">Card:</span> **** **** **** {card.cardNumber.slice(-4)}
                  <span className="ml-2 text-sm text-gray-500">({card.expirationDate})</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bank Accounts */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Bank Accounts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {client.bankEmails.map((acc, idx) => (
              <div key={idx} className="border rounded-lg p-3 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 space-y-2">
                <p><span className="font-medium">Account ID:</span> {acc.accountId}</p>
                <p><span className="font-medium">Balance:</span> {acc.balance.toLocaleString()} DA</p>
                <p><span className="font-medium">Frozen:</span> {acc.isFrozen ? "Yes" : "No"}</p>
                <button
                  className={`mt-2 w-full px-4 py-2 text-white rounded-lg shadow ${
                    acc.isFrozen ? "bg-yellow-600 hover:bg-yellow-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={()=>{setfreeze({accountid:acc.accountId,thestate:acc.isFrozen?false:true}),setconfirmation(true)}}
                >
                  {acc.isFrozen ? "Unfreeze Account" : "Freeze Account"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
  {confirmation && (
   <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white text-center dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
          
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Are you sure?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setconfirmation(false)}
          className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => setupdates()}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded flex items-center justify-center"
        >
          {!showcircularprogress ? "Confirm" : <CircularProgress color="inherit" size={22} />}
        </button>
      </div>
    </div>
  </div>
)}
  {(freezingresult===true||freezingresult===false)&&
            
 <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
           <div className="bg-white text-center dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
          
           { freezingresult===true?
          
               <p className="text-lg font-semibold text-green-800 dark:text-green-700">the process went successfuly!</p>
              : <p className="text-lg font-semibold text-red-800 dark:text-red-700">the process failed</p>}
          <button onClick={()=>setfreezingresult(null)} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded mt-3">Close</button>
            </div>
    </div>
    }
    </div>)}
    if(showedinfos){
return(
        <EditClientInfos
          userData={defaultUser}
          onClose={handleSave}
          onSave={()=>{}}
          title={`Manage Clients/Manage ${client.firstName}/Edit infos`}
          from="Employee Edit Client"
        />
      )}



    else if(showsendclientmessage){
     return(
      <SendMessageToClient name={defaultUser.firstName+" "+defaultUser.lastName} accounts={accounts} onreturn={()=>{setshowsendclientmessage(false)}}/>
     )
    }

    
    else if(showtransactions){
      return(
      <ClientTransactionsHistory accountids={Accounts} onreturn={()=>setshowtransactions(false)} />
    )
    }


    }


