
import { useAppSelector, useAppDispatch } from "../../features/Slices/hooks";
import { LoadingCircle } from "../../SharedComponents/LoadingCircle";
import { useState } from "react";
import { setEmployeeAccountState } from "../../features/EmployeeFeatures/Slices/PagesSlice";
import { CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { returnto } from "../../features/EmployeeFeatures/Others/Interfaces";
import { EditEmployeeInfos } from "../EditEmployeeInfos";
import { FreezeUnfreezeEmployeeAccount } from "../../features/EmployeeFeatures/Others/APIs";
import { SendMessageToEmployee } from "../SendMessageToEmployee";
export function ManagedEmployeeInfos({ returnaction }: { returnaction: returnto }) {
  const employee = useAppSelector((state) => state.EPages.ManagedEmployeeInfos);
  const dispatch = useAppDispatch();
 const token=useAppSelector(state=>state.MainSlice.Token);
  const [showEditInfos, setShowEditInfos] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [freeze, setFreeze] = useState<{ accountid: string; thestate: boolean }>();
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [showTransactions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [freezeResult, setFreezeResult] = useState<boolean | null>(null);

  if (!employee) return <LoadingCircle />;

  const defaultUser = {
    accountId: employee.accountInfo.accountId,
    firstName: employee.firstName,
    lastName: employee.lastName,
    birthDate: employee.birthDate,
    email: employee.personalEmail,
    address: employee.address,
    phoneNumber: employee.phoneNumber,
    type:employee.type
  };

  const handleSave = () => setShowEditInfos(false);

  const handleFreezeToggle = async () => {
    setLoading(true);
    if (freeze) {
      const result = await FreezeUnfreezeEmployeeAccount(freeze.accountid,freeze.thestate?"Activate":"DisActivate",token);
      setFreezeResult(result);
      if (result) 
        dispatch(setEmployeeAccountState(!freeze.thestate));
    } else {
      setFreezeResult(false);
    }
    setLoading(false);
    setConfirmation(false);
  };

  
  if (showEditInfos) {
    return (
      <EditEmployeeInfos
        userData={defaultUser}
        onClose={handleSave}
        onSave={() => {}}
        title={`Manage Employees/${employee.firstName}/Edit Infos`}
        from ="from managing"
      />
    );
  }

   if (showSendMessage) return (<SendMessageToEmployee name={employee.firstName} account={employee.accountInfo.accountId} onreturn={()=>setShowSendMessage(false)}/>);
  if (!showEditInfos && !showSendMessage && !showTransactions) {
    return (
      <div className="h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white ">
        {/* Header */}
        <div className=" mb-2">
          <h1 className="text-2xl dark:text-white">
            Manage Employees/{employee.firstName} {employee.lastName}
          </h1>
          <button
            onClick={returnaction.onreturn}
            className="p-2 ml-2 mt-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow"
          >
            <ArrowBack />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex ml-2 flex-wrap gap-3 mb-4">
          <button
            onClick={() => setShowEditInfos(true)}
            className="px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            Update Info
          </button>
          <button
            onClick={() => setShowSendMessage(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
          >
            Send Message
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold mb-1">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Role: {employee.type}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Status: {employee.isActive ? "Active" : "Inactive"}
            </p>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Personal Info</h3>
              <p>
                <span className="font-medium">Birth Date:</span>{" "}
                {new Date(employee.birthDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {employee.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Email:</span> {employee.personalEmail}
              </p>
              <p>
                <span className="font-medium">Address:</span> {employee.address}
              </p>
            </div>
          </div>

          {/* Bank Account Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Bank Account</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 dark:border-gray-600 bg-gray-50 break-words dark:bg-gray-700 space-y-2">
                <p>
                  <span className="font-medium">Account ID:</span> {employee.accountInfo.accountId}
                </p>
                <p>
                  <span className="font-medium">Balance:</span>{" "}
                  {employee.accountInfo.salary.toLocaleString()} DA
                </p>
                <p>
                  <span className="font-medium">Frozen:</span>{" "}
                  {employee.accountInfo.isFrozen ? "Yes" : "No"}
                </p>
                <button
                  onClick={() => {
                    setFreeze({
                      accountid: employee.accountInfo.accountId,
                      thestate: employee.accountInfo.isFrozen,
                    });
                    setConfirmation(true);
                  }}
                  className={`mt-2 w-full px-4 py-2 text-white rounded-lg shadow ${
                    employee.accountInfo.isFrozen
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {employee.accountInfo.isFrozen ? "Unfreeze Account" : "Freeze Account"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmation && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
              <p className="text-lg font-semibold mb-4 dark:text-white">Are you sure?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setConfirmation(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFreezeToggle}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded flex items-center justify-center"
                >
                  {!loading ? "Confirm" : <CircularProgress color="inherit" size={22} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result Modal */}
        {freezeResult !== null && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
              <p
                className={`text-lg font-semibold ${
                  freezeResult ? "text-teal-700 dark:text-teal-500" : "text-red-700 dark:text-red-500"
                }`}
              >
                {freezeResult
                  ? "The process was successful!"
                  : "The process failed. Please try again."}
              </p>
              <button
                onClick={() => setFreezeResult(null)}
                className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
