import { ProfileCard } from "./ProfileCard";
import { useAppSelector } from "../../../features/Slices/hooks";
import { CircularProgress } from "@mui/material";

export function Account() {
 
  const CurrentlientInfo = useAppSelector((state: any) => state.ClientInfos.client_informations);

  if (CurrentlientInfo === null||CurrentlientInfo===undefined) {
  return    <div className="w-full h-full flex items-center justify-center dark:bg-gray-900"> <CircularProgress /></div>;
  }


  return (
    <div className="w-full dark:bg-gray-900 bg-gray-100 flex items-start justify-center h-full">
      <ProfileCard
      />
     
    </div>
  );
}
