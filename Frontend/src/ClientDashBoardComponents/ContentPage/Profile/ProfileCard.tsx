import {useState } from "react";
import {
  Email,
  Phone,
  DateRange,
  LocationOn,
} from "@mui/icons-material";
import { Edit, CreditCard } from "lucide-react";
import { useAppSelector } from "../../../features/Slices/hooks";
import { EditClientInfos } from "./EditClientInfos";

export function ProfileCard() {
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const informations = useAppSelector((state: any) => state.ClientInfos.client_informations);

  const defaultUser = {
    accountId: informations.accountInfo.accountId,
    firstName: informations.firstName,
    lastName: informations.lastName,
    birthDate: informations.birthDate,
    email: informations.personalEmail,
    address: informations.address,
    phoneNumber: informations.phoneNumber,
  };

  const handleSave = (updatedUser: boolean) => {
    setShowEditInfo(false);
    if (updatedUser) {
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 4000);
    } else {
      setShowErrorCard(true);
      setTimeout(() => setShowErrorCard(false), 4000);
    }
  };

  if (showEditInfo) {
    return (
     
        <EditClientInfos
          userData={defaultUser}
          onClose={() => setShowEditInfo(false)}
          onSave={handleSave}
          title={"Account/Edit infos"}
          from="Client"
       />
    )
  }

  return (
    <div className="w-full text-gray-900  ">
      <h1 className="text-2xl dark:text-gray-200 mb-2">Account</h1>
      <div className="p-6 shadow-lg dark:text-gray-100  dark:bg-gray-800 bg-white rounded-lg w-full flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {informations.firstName + " " + informations.lastName}
            </h2>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2">
                <Email fontSize="small" />
                <span>{informations.personalEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone fontSize="small" />
                <span>{informations.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <DateRange fontSize="small" />
                <span>{informations.birthDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <LocationOn fontSize="small" />
                <span>{informations.address}</span>
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

        <div className="text-center max-w-93 sm:text-left">
          
          <div className="gap-1 text-sm bg-gradient-to-br from-cyan-500 to-blue-500  transition-all hover:scale-[1.02] duration-200 rounded-2xl shadow-xl text-white p-6 flex flex-col justify-between ">
           
           <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="w-5 h-5" /> Nova Card
          </h3>
          <p className="font-mono tracking-widest text-lg mb-2">
            **** **** **** {informations.cardInfo.cardNumber}
          </p>
           
            <p>Expires: {informations.cardInfo.expirationDate}</p>
            <p>CVV: ***</p>
            <p>Account ID: {informations.accountInfo.accountId}</p>
            <p>Balance: {informations.accountInfo.balance} DA</p>
            <p>Created: {informations.accountInfo.createdAt}</p>
          </div>
        </div>
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
