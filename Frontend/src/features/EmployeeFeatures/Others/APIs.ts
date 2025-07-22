import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IClient } from "./Interfaces";
import { setLogInState, setToken } from "../../Slices/MainSlice";
import { SetNonReadedNotifications } from "../Slices/PagesSlice";
import { fetchClientInfo } from "../../Slices/Client_Infos_Slice";

export  const FetchEmployeeInfos=createAsyncThunk(
  'ClientInfos/FetchEmployeeInfos',
   async (_,thunkAPI) => {
    const state:any = thunkAPI.getState();
     const token = state.MainSlice.Token;
  
  try {
    const response = await axios.get('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/GetEmployeeInfo',
{
     headers: {
       Authorization: `Bearer ${token}`,
      }});

      thunkAPI.dispatch(setLogInState({Type:"Employee",IsLoggedIn:true}));
      thunkAPI.dispatch(FetchEmployeeNotifications(response.data.accountInfo.accountId));
      return response.data

  } catch (error) {
      thunkAPI.dispatch(setLogInState({Type:null,IsLoggedIn:false}));
      return null;
  }
   });

  export const RefreshTokenAPI=createAsyncThunk(
  'a/a',
   async (_,thunkAPI) => {
  
  //localStorage.getItem("account");
    try{
      const Account=localStorage.getItem("account");// "hazim.khalil@Nova.com";   //"A8UKS91R3D";
  const refreshtoken=localStorage.getItem("refreshtoken");
  interface r{
    account:string|null,
    refreshToken:string|null
  }

  const infos:r={
    account:Account,
    refreshToken:refreshtoken
  }
       const type=localStorage.getItem("type");
const data=await axios.put("https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Authorization/RefreshTokens/",infos);

   console.log("token");
   console.log(data.data);
   localStorage.setItem("refreshtoken",data.data.refreshtoken);
   thunkAPI.dispatch(setToken(data.data.token));


     if(type==="Employee"){
       thunkAPI.dispatch(FetchEmployeeInfos());
      }
    else if(type==="Client"){
     thunkAPI.dispatch(fetchClientInfo());
    }
   
   //thunkAPI.dispatch(setLogInState({Type:null,IsLoggedIn:false}));
    return true;
    }catch(err){
       thunkAPI.dispatch(setLogInState({Type:null,IsLoggedIn:false}));
         console.log("token error")
         console.log(err);
        
      return false;
    }
   });
 

export  const FetchAllEmployeesInfos=createAsyncThunk(
  'ClientInfos/FetchAllEmployeesInfos',
 
   async (_,thunkAPI) => {
     const state:any = thunkAPI.getState();
     const token = state.MainSlice.Token;
  
  try {
    const response = await axios.get('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/GetAllEmployeesInfos',{
     headers: {
       Authorization: `Bearer ${token}`,
      }
  });
      return response.data

  } catch (error) {
     
     return null;
   
  }
   });


   
export const UpdateIsEmployeeNotificationViewed = createAsyncThunk(
  'ClientInfos/UpdateIsEmployeeNotificationViewed ',

  async (info:any,thunkAPI) => {
    const state:any= thunkAPI.getState();
    const token = state.MainSlice.Token;
  
   let readednotif =state.EPages.NonReadedNotifications;
    if(readednotif){
      readednotif=readednotif.filter((a:any)=>a.id!==info.id);
      thunkAPI.dispatch(SetNonReadedNotifications(readednotif));
    }
   
      await axios.put(`https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ENotifications/UpdateIsEmployeeNotificationviewed/`,info,{
         headers: {
       Authorization: `Bearer ${token}`,
      }}
      );
      
      
  }
);





   export  const FetchEmployeeNotifications=createAsyncThunk(
  'ClientInfos/FetchEmployeeNotifications',
 
   async (Account:string,thunkAPI) => {
     const state:any= thunkAPI.getState();
     const token = state.MainSlice.Token;
  
  try {
    const response = await axios.get(`https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ENotifications/GetEmployeeNotifications/${Account}`,
{
   headers: {
       Authorization: `Bearer ${token}`,
      }
    });
    if(response.data){
  const r = response.data.filter((a:any)=>a.isviewed===false);
      thunkAPI.dispatch(SetNonReadedNotifications(r));

    }
      return response.data

  } catch (error) {
     
     return null;
   
  }
   });


export const fetchDashboardStats = createAsyncThunk(
    'ClientInfos/fetchDashboardStats',
async (_,thunkAPI) => {

    const state:any= thunkAPI.getState();
    const token = state.MainSlice.Token;
  
    try {
      const response = await axios.get('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/GetCardsInfo', {
        
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      return response.data; 
    } catch (error) {
     
      return null; 
    }
  }
);


 export async function FreezeUnfreezeClientAccount(accountId:string,State:string,token:string|null){
  interface infos{
accountId:string,
state:string
  }
 const state:infos={accountId:accountId,state:State};

    try {
      const response = await axios.put('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ManageClients/FreezeUnfreezeClientAccount',state,
        { headers: {
        Authorization: `Bearer ${token}`,
      }}
      );
  if(response.status===200)
    return true;
  return false;
      
    } catch (error) {
    return false;
    }
 
};
 export async function FreezeUnfreezeEmployeeAccount(accountId:string,State:string,token:string|null){
  interface infos{
accountId:string,
state:string
  }

 const state:infos={accountId:accountId,state:State};

    try {
      const response = await axios.put('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/FreezeUnfreezeEmployeeAccount',state,
        { headers: {
        Authorization: `Bearer ${token}`,
      }}
      );

  if(response.status===200)
    return true;

  return false;
      
    } catch (error) {
    return false;
    }
 
};

export async function SendEmployeeMessage(info:any,token:string|null){
    try {
      const response = await axios.post('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/SendMessageToEmployee',info,
        {headers: {
        Authorization: `Bearer ${token}`,
      }}
      );

  if(response.status===200){
  await FetchEmployeeNotifications(info.accountId);
  return true;
  }
  return false;
      
    } catch (error) {
    return false;
    }
  
};



 export async function UpdateEmployeeInfos(infos:any,token:string|null){
   try{
    const res=await axios.put("https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/UpdateEmployee",infos,
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
 
};

export async function AddNewClientAccount(infos:any,token:string|null){
   try{
    const res=await axios.post("https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ManageClients/AddAccount",infos,
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
 
};

export async function AddNewEmployeeApi(infos:any,token:string|null){
   try{
    
    const res=await axios.post("https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/AddNewEmployee",infos,
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
 
};


 export async function DepositApi(infos:any,token:string|null){
  
    try {
      const response = await axios.post('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ManageClients/Deposit',infos,
        { headers: {
        Authorization: `Bearer ${token}`,
      }}
      );
  if(response.status===200)
    return true;

  return false;
      
    } catch (error) {
      
    return false;
    }
 
};


 export async function WithdrawApi(infos:any,token:string|null){
  
    try {
      const response = await axios.post('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ManageClients/Withdraw',infos,
        { headers: {
        Authorization: `Bearer ${token}`,
      }}
      );
  if(response.status===200)
    return true;

  return false;
      
    } catch (error) {
      
    return false;
    }
 
};
 

export const fetchClientsInfos = createAsyncThunk(
  'ClientInfos/fetchClientsInfos',
 
async (_,thunkAPI) => {
  const state:any= thunkAPI.getState();
  const token = state.MainSlice.Token;
  
  try {
    const response = await axios.get('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ManageClients/GetAllClients',
      {
          headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
 
    return response.data; 
  } catch (error) {
   
    return null;
  }
}
);


export const fetchRecentTransactionsXtransfers = createAsyncThunk(
  'ClientInfos/fetchRecentTransactionsXtransfers',
async (_,thunkAPI) => {
  const state:any= thunkAPI.getState();
  const token = state.MainSlice.Token;
  try {
    const response = await axios.get('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Employee/EGetAllTransactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data; 
  } catch (error) {
    
    return null; 
  }
});



export const AddNewClient = createAsyncThunk(
  'ClientInfos/fetchRecentTransactionsXtransfers',
async (Client:IClient,thunkAPI) => {
  const state:any= thunkAPI.getState();
  const token = state.MainSlice.Token;
  try {
    const response = await axios.post('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/ManageClients/AddNewClient',Client,
      {
        headers: {
        Authorization: `Bearer ${token}`,
      }
      }
    );
if(response.status===200)
    return true; 
  return false;
  } catch (error) {
    return false;
  }
}
);





