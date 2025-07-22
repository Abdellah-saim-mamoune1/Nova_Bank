import { useState } from "react";
import { Typography, Divider } from "@mui/material";
import { IAddNewAccount } from "../../../features/EmployeeFeatures/Others/Interfaces";
import { AddNewClientAccount } from "../../../features/EmployeeFeatures/Others/APIs";
import { ConfirmationCard } from "../../../SharedComponents/ConfirmationCard";
import { ConfirmInfos } from "../../../SharedComponents/ConfirmationCard";
import { ConfirmationResultCard } from "../../../SharedComponents/ConfirmationResultCard";
import { IConfirmationResultCard } from "../../../SharedComponents/ConfirmationResultCard";
import { useAppSelector } from "../../../features/Slices/hooks";
export function AddSecondAccountForm() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    balance: "",
    password: "",
    currentAccount: "",
  });

 const [showconfirmation, setshowconfirmation] = useState(false);
 const [showcircularprogress, setshowcircularprogress] = useState(false);
 const [showcresult,setshowcresult]=useState(false);
 const [error,seterror]=useState(false);
 const token=useAppSelector(state=>state.MainSlice.Token);
const confirminfo:ConfirmInfos={
onclose:()=>{setshowconfirmation(false)},
onconfirm:()=>{handleFormSubmit()},
title:null,
body:null,
showcircularprogress:showcircularprogress
};
const confirmationresult:IConfirmationResultCard={
    onclose:()=>{setshowcresult(false)},
    message:"Proocess Succeded",
    messagestate:error,
}


  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(((name==="balance"||name=="password")&&value.length>7)||(name==="currentAccount"&&value.length>10))
      return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

function validate(){
  if(!validateForm())
    return;

  setshowconfirmation(true);
}

  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {};

    if (!formData.balance) {
      validationErrors.balance = "Balance is required.";
    }

    if (!formData.currentAccount) {
      validationErrors.currentAccount = "Client current account is required.";
    }

    if (!formData.password || formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  async function handleFormSubmit() {
       setshowcircularprogress(true);
    if (validateForm()) {

      const info:IAddNewAccount={
        currentAccount:formData.currentAccount,
        initialBalance:Number(formData.balance),
        passWord:formData.password
      }
     
      const result=await AddNewClientAccount(info,token);
       setshowcircularprogress(false);
       setshowconfirmation(false);
      if(result===false){
      seterror(true);
      }
       setshowcresult(true);

    }
  };

  const handleCancel = () => {
    console.log("Form canceled");
    setFormData({ balance: "", password: "", currentAccount: "" });
    setErrors({});
  };

  return (
    <div className="w-full ">
      <h1 className="text-2xl dark:text-gray-200 mb-2">Clients/Add a New Client Account </h1>
      <div className="w-full dark:bg-gray-800 dark:text-gray-100 rounded-lg bg-white px-6 py-6 flex flex-col items-center justify-center shadow-lg">
        <div className="w-[96%] sm:w-[55%]">
          

          <Typography variant="body1" sx={{  textAlign: "center" }}>
            Please fill out the details below to add a new client account.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Current Account Input */}
          <div className="mb-4">
            <input
              type="text"
              name="currentAccount"
              value={formData.currentAccount}
              onChange={handleChange}
              placeholder="Client's existing Account"
              className="w-full p-2 border dark:border-gray-100 border-gray-700 rounded"
              required
            />
            {errors.currentAccount && <p className="text-red-500 text-sm mt-1">{errors.currentAccount}</p>}
          </div>

       

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New account password"
              className="w-full p-2 border dark:border-gray-100 border-gray-700 rounded"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

             {/* Balance Input */}
          <div className="mb-4">
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="Balance"
              className="w-full p-2 border dark:border-gray-100 border-gray-700 rounded"
              required
            />
            {errors.balance && <p className="text-red-500 text-sm mt-1">{errors.balance}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 mt-4">
            <button
              onClick={validate}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {showconfirmation&&<ConfirmationCard info={confirminfo} />}
      {showcresult&&< ConfirmationResultCard infos={confirmationresult}/>}
    </div>
  );
}
