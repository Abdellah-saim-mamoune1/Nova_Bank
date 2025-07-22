import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../../../features/Slices/hooks";
import { CreditCard } from "lucide-react";
export function ProfileCards() {
  const clientInfo = useAppSelector((state: any) => state.ClientInfos.client_informations);
if (clientInfo === null||clientInfo===undefined) {
    return    <div className="w-full h-full flex items-center justify-center dark:bg-gray-900"> <CircularProgress /></div>;
  }
  const formatCardNumber = (number: string) => {
    const lastFour = number.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  return (
    <div className="w-full dark:bg-gray-900 min-h-screen grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-1 py-2 sm:px-4 sm:py-4">
      {clientInfo?.cards?.map((card: any, index: number) => (
        <div
          key={index}
          className="bg-gradient-to-br from-cyan-500 to-blue-500 aspect-[16/9] transition-all hover:scale-[1.02] duration-200 rounded-2xl shadow-xl text-white p-6 flex flex-col justify-between "
        >
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Nova Card</p>
            <CreditCard className="w-6 h-6" />
          </div>

          <div className="mt-6">
            <p className="text-lg font-mono tracking-widest mb-2">
              {formatCardNumber(card.cardNumber)}
            </p>
            <div className="flex justify-between text-sm">
              <p>Expires: {card.expirationDate}</p>
              <p>CVV: ***</p>
            </div>
          </div>

          {clientInfo.bankEmails[index] && (
            <div className="mt-4 text-sm text-white/80">
              <p>Account ID: {clientInfo.bankEmails[index].accountId}</p>
              <p>Balance: {clientInfo.bankEmails[index].balance} DA</p>
              <p>Created: {clientInfo.bankEmails[index].createdAt}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
