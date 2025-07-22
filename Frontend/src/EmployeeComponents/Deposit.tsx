import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { DepositApi } from "../features/EmployeeFeatures/Others/APIs";
import { useAppSelector } from "../features/Slices/hooks";

export function Deposit() {
  const employeeaccount=useAppSelector(s=>s.EPages.EmployeeInfos?.accountInfo.accountId);
  const [formData, setFormData] = useState({
    clientAccount: "",
    amount:"",
    employeeAccount: employeeaccount,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDepositResult, setShowDepositResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token=useAppSelector(s=>s.MainSlice.Token);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if((e.target.name==="amount"&&e.target.value.length>7)||e.target.name==="clientAccount"&&e.target.value.length>10)
      return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.clientAccount.trim()) newErrors.clientAccount = "Invalid ID.";
    if (Number(formData.amount)<1000||Number(formData.amount)>100000) {
      newErrors.amount = "Invalid amount";
    } else if (isNaN(+formData.amount) || +formData.amount <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmDeposit = async () => {
    setLoading(true);

  

    const success = await DepositApi(formData,token);

    setShowConfirmation(false);
    setLoading(false);
    setShowDepositResult(success ? "success" : "error");

 
  };

  return (
    <div className="w-full h-full flex-col flex flex-1">
      <h2 className="text-2xl dark:text-gray-100 mb-2">Finance/Deposit</h2>

      <div className="relative flex-1 shadow-lg flex bg-white rounded-lg dark:bg-gray-800 dark:text-gray-100 h-full items-center py-7 justify-center">
        
        {/* ✅ Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Deposit?</h2>
              <div className="text-left text-sm mb-4 space-y-1">
                <p><strong>Account ID:</strong> {formData.clientAccount}</p>
                <p><strong>Amount:</strong> {formData.amount} DA</p>
             
              </div>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">
                  Cancel
                </button>
                <button onClick={handleConfirmDeposit} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded">
                  {!loading ? "Confirm" : <CircularProgress color="inherit" size={22} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Result Modal */}
        {showDepositResult && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
              <h2 className={`${showDepositResult === "success" ? "text-teal-600" : "text-red-600"} text-lg font-semibold mb-4`}>
                {showDepositResult === "success"
                  ? "Deposit completed successfully."
                  : "Deposit failed. Please try again."}
              </h2>
              <button onClick={() => setShowDepositResult(null)} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded">
                Close
              </button>
            </div>
          </div>
        )}

        {/* ✅ Form */}
        <div className="h-full dark:bg-gray-800 flex items-center flex-col justify-center w-[90%] sm:w-[65%]">
          {[
            { name: "clientAccount", label: "Account ID" },
            { name: "amount", label: "Amount (DA)", type: "number" },
            
          ].map(({ name, label, type = "text" }) => (
            <div key={name} className="w-full mb-3">
              <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                className="w-full p-2 border rounded"
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <div className="flex justify-center gap-2 mt-4 w-full">
          
            <button onClick={handleSubmit} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
