import { useState } from "react";
import { useAppDispatch } from "../features/Slices/hooks";
import { AddNewClient } from "../features/EmployeeFeatures/Others/APIs";
import { IClient } from "../features/EmployeeFeatures/Others/Interfaces";
import { ConfirmationCard } from "../SharedComponents/ConfirmationCard";
import { ConfirmationResultCard } from "../SharedComponents/ConfirmationResultCard";
import { ConfirmInfos } from "../SharedComponents/ConfirmationCard";
import { IConfirmationResultCard } from "../SharedComponents/ConfirmationResultCard";
export function AddClient() {
  const dispatch = useAppDispatch();
  const [confirmation,setconfirmation]=useState(false);
  const[confirmresult,setconfirmresult]=useState(false);
  const [showcircularprogress,setshowcircularprogress]=useState(false);
  const [error,seterror]=useState(false);
  const confirminfo:ConfirmInfos={
  onclose:()=>{setconfirmation(false)},
  onconfirm:()=>{handleSubmit()},
  title:null,
  body:null,
  showcircularprogress:showcircularprogress
  };
  
  const confirmationresult:IConfirmationResultCard={
      onclose:()=>{setconfirmresult(false)},
      message:"Client was added successfuly",
      messagestate:error,
  }
  

  const [formData, setFormData] = useState<IClient>({
    person: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
    account: {
      passWord: "",
      balance: "",
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    section: "person" | "account",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: field === "balance" ? Number(value) : value,
      },
    }));

    // Clear error on change
    const key = `${section}.${field}`;
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const { person, account } = formData;

    if (!person.firstName.trim()) newErrors["person.firstName"] = "First name is required.";
    if (!person.lastName.trim()) newErrors["person.lastName"] = "Last name is required.";
    if (!person.birthDate.trim()) newErrors["person.birthDate"] = "Birthdate is required.";
    if (!person.email.trim()) newErrors["person.email"] = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(person.email)) newErrors["person.email"] = "Invalid email format.";
    if (!person.address.trim()) newErrors["person.address"] = "Address is required.";
    if (!person.phoneNumber.trim()) newErrors["person.phoneNumber"] = "Phone number is required.";
    if (!account.passWord.trim()) newErrors["account.passWord"] = "Password is required.";
    if (Number(account.balance) <1000) newErrors["account.balance"] = "Balance must be zero or more.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function checkerror(){
    if(validate())
    setconfirmation(true);
  }
  async function handleSubmit () {
    setshowcircularprogress(true);
    if (!validate()){
      seterror(true);
      return;}


    const payload = {
      ...formData,
      person: {
        ...formData.person,
        birthDate: formData.person.birthDate,
      },
    };

   const result= await dispatch(AddNewClient(payload));
if(!result)
 seterror(true);
else
seterror(false);
    setshowcircularprogress(false);
    setconfirmation(false);
    setconfirmresult(true);
  };

  const renderError = (field: string) =>
    errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>;

  return (
    <div className="h-full  flex-1">
      <h2 className="text-2xl mb-3  dark:text-gray-100 ">
        Clients/Add New Client
      </h2>
      <div className="w-full shadow-lg p-4 flex items-center flex-col bg-white dark:bg-gray-800 space-y-4 dark:text-gray-100">
        <div className="w-full">
          <input
            type="text"
            placeholder="First Name"
            value={formData.person.firstName}
            onChange={(e) => handleChange("person", "firstName", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.firstName")}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Last Name"
            value={formData.person.lastName}
            onChange={(e) => handleChange("person", "lastName", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.lastName")}
        </div>

        <div className="w-full">
          <input
            type="date"
            value={formData.person.birthDate}
            onChange={(e) => handleChange("person", "birthDate", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.birthDate")}
        </div>

        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            value={formData.person.email}
            onChange={(e) => handleChange("person", "email", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />




          
          {renderError("person.email")}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Address"
            value={formData.person.address}
            onChange={(e) => handleChange("person", "address", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.address")}
        </div>

        <div className="w-full">
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.person.phoneNumber}
            onChange={(e) => handleChange("person", "phoneNumber", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.phoneNumber")}
        </div>

        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            value={formData.account.passWord}
            onChange={(e) => handleChange("account", "passWord", e.target.value)}
            className="w-full p-2 dark:border-gray-400 border rounded"
          />
          {renderError("account.passWord")}
        </div>

        <div className="w-full">
          <input
            type="number"
            placeholder="Balance"
            value={formData.account.balance}
            onChange={(e) => handleChange("account", "balance", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("account.balance")}
        </div>

        <button
          onClick={checkerror}
          className="mt-1 sm:w-[20%] lg:w-[12%] bg-teal-500 hover:bg-teal-600 text-white font-semibold p-2 rounded"
        >
          Submit
        </button>
      </div>
      {confirmation&&
      < ConfirmationCard info={confirminfo}/>}

      {confirmresult &&<ConfirmationResultCard infos={confirmationresult}/>}
    </div>
  );
}



