import { useState } from "react";
import { sendclientmessage } from "../features/Slices/Client_Infos_Slice";
import { AddNotification } from "../features/Others/ClientInterfaces";
import { ConfirmationCard } from "../SharedComponents/ConfirmationCard";
import { ConfirmInfos } from "../SharedComponents/ConfirmationCard";
import { ConfirmationResultCard } from "../SharedComponents/ConfirmationResultCard";
import { IConfirmationResultCard } from "../SharedComponents/ConfirmationResultCard";
import { ArrowBack } from "@mui/icons-material";
import { useAppSelector } from "../features/Slices/hooks";

type SimpleName = {
  name: string;
  accounts: string[];
  onreturn:()=>void,
};

export function SendMessageToClient({ name, accounts,onreturn }: SimpleName) {
  const types=["Withdraw","Deposite","Transfer Fund","Message","Warning"];
  const [selectedAccount, setSelectedAccount] = useState(accounts[0] || "");
  const [selectedtype, setSelectedtype] = useState(types[3]);
  const [message, setMessage] = useState("");
  const [title, settitle] = useState("");
  const [error, seterror] = useState<boolean|null>(null);
  const [confirmation, setconfirmation] = useState(false);
  const [showcircularprogress, setshowcircularprogress] = useState(false);
  const [showsendresult, setshowsendresult] = useState(false);
  const token=useAppSelector(state=>state.MainSlice.Token);


const confirminfo:ConfirmInfos={
onclose:()=>{setconfirmation(false)},
onconfirm:()=>{handleSend()},
title:null,
body:null,
showcircularprogress:showcircularprogress
};


const confirmationresult:IConfirmationResultCard={
    onclose:()=>{setshowsendresult(false)},
    message:"Message was sent successfuly",
    messagestate:error,
}

  async function handleSend ()  {
    let res=false;
    setshowcircularprogress(true);
    if (!message.trim()||!title.trim()){
       seterror(true);
    }

    else{
    seterror(false);
const infos:AddNotification={
      title:title,
      body:message,
      type:selectedtype==="withdraw"?1:selectedtype==="Deposite"?2:selectedtype==="Transfer Fund"?3:selectedAccount==="Message"?4:5,
      AccountId:selectedAccount
}

res=await sendclientmessage(infos,token);
  
}
res?seterror(false):seterror(true);
setshowcircularprogress(false);
setconfirmation(false);
setshowsendresult(true);

  };

  return (
    <div className=" h-full flex-col flex flex-1 dark:bg-gray-900">
      <h2 className="text-2xl mb-3 dark:text-gray-100 text-gray-800">
        Manage Clients/Manage {name}/Send Message
      </h2>
  <button onClick={onreturn} className="ml-2 w-10 mb-2 px-2 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow">
        <ArrowBack />
        </button>
      <div className="w-full shadow-lg p-4 h-full flex items-center flex-col bg-white dark:bg-gray-800 space-y-4 dark:text-gray-100">
        {/* Dropdown list */}
        <div className="flex w-full gap-3 ">
        <div className="flex w-full flex-col space-y-1">
          <label htmlFor="account-select" className="text-xl font-medium">Account</label>
          <select
            id="account-select"
            className="w-full p-2 border sm:w-[48%] lg:w-[28%] dark:border-gray-400 rounded bg-white dark:bg-gray-700 dark:text-white"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            {accounts.map((account, index) => (
              <option key={index} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>
 <div className="flex w-full flex-col space-y-1">
          <label htmlFor="account-select" className="text-xl font-medium">Type</label>
          <select
            id="account-select"
            className="w-full p-2 border sm:w-[50%] lg:w-[28%] dark:border-gray-400 rounded bg-white dark:bg-gray-700 dark:text-white"
            value={selectedtype}
            onChange={(e) => setSelectedtype(e.target.value)}
          >
            {types.map((type, index) => (
              <option key={index+1} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        </div>
{error&&<p className="text-red-600">Please Enter Valid Informations</p>}
        {/* Text area for the message */}
          <input
          placeholder="Title"
          className="w-full p-2 border dark:border-gray-400 rounded resize-none"
         // rows={8}
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <textarea
          placeholder="Enter your message"
          className="w-full flex-1 p-2 border dark:border-gray-400 rounded resize-none"
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send button */}
        <button
          onClick={()=> setconfirmation(true)}
          className="w-full sm:w-[30%] lg:w-[15%] bg-teal-500 hover:bg-teal-600 text-white py-2 rounded"
        >
          Send
        </button>
      </div>
      {confirmation&&
      <ConfirmationCard info={confirminfo}/>}

{showsendresult&&
<ConfirmationResultCard infos={confirmationresult}/>
        }
    </div>
  );
}
