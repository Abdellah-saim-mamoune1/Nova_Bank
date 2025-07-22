import { AddGetHelpRequist } from "./ClientInterfaces";
import axios from "axios";
export async function  AddNewGetHelpRequist(v: AddGetHelpRequist,token:string|null){
  
  await axios.post("https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Client/AddGetHelpRequist",v,{
 headers: {
          Authorization: `Bearer ${token}`,
        }
 });

}

export async function  UpdateClientPersonalInfos(v:any,token:any){
  try{
     
      
    const res=await axios.put("https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Client/UpdateClient",v,
{ headers: {
          Authorization: `Bearer ${token}`,
        }}

    );
    if(res.status===200)
   return true;

    return false;
}
    catch(err){
    return false;
    }
   }
   
