import { useState } from "react";
import { Email, Phone, DateRange, LocationOn } from "@mui/icons-material";
import { Edit } from "lucide-react";
import { useAppSelector } from "../features/Slices/hooks";
import { EditClientInfos } from "../ClientDashBoardComponents/ContentPage/Profile/EditClientInfos";
import { LoadingCircle } from "../SharedComponents/LoadingCircle";

export function EmployeeProfileCard() {
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const informations = useAppSelector((state) => state.EPages.EmployeeInfos);

  if (!informations) return <LoadingCircle />;

  const defaultUser = {
    accountId: informations.accountInfo.accountId,
    firstName: informations.firstName,
    lastName: informations.lastName,
    birthDate: informations.birthDate,
    email: informations.personalEmail,
    address: informations.address,
    phoneNumber: informations.phoneNumber,
    type: informations.type,
  };

  const handleSave = (updatedUser: boolean) => {
    setShowEditInfo(false);
    if (updatedUser) {
      setNotificationVisible(true);
    } else {
      setShowErrorCard(true);
    }
  };

  if (showEditInfo) {
    return (
      <EditClientInfos
        userData={defaultUser}
        onClose={() => setShowEditInfo(false)}
        onSave={handleSave}
        title={"Account/Edit infos"}
        from="Employee"
      />
    );
  }

  return (
    <div className="w-full text-gray-900">
      <h1 className="text-2xl dark:text-gray-200 mb-2">Account</h1>
      <div className="p-6 shadow-lg dark:text-gray-100 break-words dark:bg-gray-800 bg-white rounded-lg w-full flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <div className="flex-1 text-center sm:text-left break-words max-w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words max-w-full">
              {informations.firstName + " " + informations.lastName}
            </h2>
            <div className="flex flex-col gap-1 text-sm break-words max-w-full">
              <div className="flex items-center gap-2">
                <Email fontSize="small" />
                <span className="break-words max-w-full overflow-hidden">{informations.personalEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone fontSize="small" />
                <span className="break-words max-w-full overflow-hidden">{informations.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <DateRange fontSize="small" />
                <span className="break-words max-w-full overflow-hidden">{informations.birthDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <LocationOn fontSize="small" />
                <span className="break-words max-w-full overflow-hidden">{informations.address}</span>
              </div>

              <div className="flex ml-1 mt-3 items-center gap-2">
                <span className="break-words max-w-full overflow-hidden">
                  Account: {informations.accountInfo.accountId}
                </span>
              </div>
              <div className="flex ml-1 items-center gap-2">
                <span className="break-words max-w-full overflow-hidden">
                  Salary: {informations.accountInfo.salary.toString()} DA
                </span>
              </div>
              <div className="flex ml-1 items-center gap-2">
                <span className="break-words max-w-full overflow-hidden">
                  Created at: {informations.accountInfo.createdAt.toString()}
                </span>
              </div>
              <div className="flex ml-1 items-center gap-2">
                <span className="break-words max-w-full overflow-hidden">Type: {informations.type}</span>
              </div>
            </div>
            <button
              onClick={() => setShowEditInfo(true)}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 flex items-center gap-2 mx-auto sm:mx-0"
            >
              <Edit size={16} /> Edit Info
            </button>
          </div>
        </div>

        <hr className="mb-8 border-gray-300 dark:border-gray-700" />

        <div className="text-center max-w-93 sm:text-left"></div>
      </div>

      {/* Notifications */}
      {notificationVisible && (
        <div className="fixed top-[-5px] left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-6 py-4 rounded-xl shadow-2xl z-[9999] animate-slide-down max-w-[90%] sm:max-w-md">
          <p className="font-semibold">Changing informations process went successfully!</p>
        </div>
      )}
      {showErrorCard && (
        <div className="fixed top-[-5px] left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl z-[9999] animate-slide-down max-w-[90%] sm:max-w-md">
          <p className="font-semibold">Changing informations process failed!</p>
        </div>
      )}
    </div>
  );
}
