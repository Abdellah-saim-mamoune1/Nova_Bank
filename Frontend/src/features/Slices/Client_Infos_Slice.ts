import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TransferData } from '../Others/ClientInterfaces';
import { AddNotification } from '../Others/ClientInterfaces';
import { InfosState } from '../Others/ClientInterfaces';
import { ITransactionsHistory } from '../Others/ClientInterfaces';
import { ClientInfo } from '../Others/ClientInterfaces';
import { IClientNotificationsGet } from '../Others/ClientInterfaces';
import { setLogInState } from './MainSlice';
export const fetchClientInfo = createAsyncThunk(
  'ClientInfos/fetchClientInfo',
  async (_,thunkAPI) => {
    const state:any = thunkAPI.getState();
    const token = state.MainSlice.Token;
    try {
      const response = await axios.get('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Client/GetClientInfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
   
    if(response.status===200){
    thunkAPI.dispatch(SetIsLoggedIn(true));
    thunkAPI.dispatch(setLogInState({Type:"Client",IsLoggedIn:true}));
    thunkAPI.dispatch(fetchClientTransactionhistory(response.data.accountInfo.accountId));
    thunkAPI.dispatch(fetchClientNotifications(response.data.accountInfo.accountId));
    }
  

      return response.data; 
    } catch (error) {
      console.log(error);
     // thunkAPI.dispatch(setLogInState({Type:null,IsLoggedIn:false}));
      return null; 
    }
  }
);

export const fetchClientTransactionhistory = createAsyncThunk(
  'ClientInfos/fetchClientTransactionhistory',
  async (v:string|null,thunkAPI) => {
    const state:any = thunkAPI.getState();
    const token = state.MainSlice.Token;
     
    try {
      const response = await axios.get(`https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/TransactionsHistory/GetTransactionHistoryById${v}`,{
       headers: {
          Authorization: `Bearer ${token}`,
        }

      }
      );
    
       if(response.data.length===0)
        thunkAPI.dispatch(SetResentTransactions(null));
      else
      thunkAPI.dispatch(SetResentTransactions(response.data.slice(0,5)));

      return response.data; 
    } catch (error) {
      return null; 
    }
  }
);





export const fetchClientNotifications = createAsyncThunk(
  'ClientInfos/fetchClientNotifications',

  async (n:string|null, thunkAPI) => {
   const state:any = thunkAPI.getState();
    const token = state.MainSlice.Token;
   
    try {
      const response = await axios.get(`https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/CNotifications/GetClientNotifications/${n}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      if(response.data){
      const r = response.data.filter((a:any)=>a.isviewed===false);
      thunkAPI.dispatch(SetNonReadedNotifications(r));
    }
      else
      thunkAPI.dispatch(SetNonReadedNotifications(null));
   
      return response.data; 
    } catch (error) {
      console.log(error);
      return null; 
    }
  }
);



export const TransferFundThunk = createAsyncThunk(
  'ClientInfos/TransferFund',

  async (value:TransferData,thunkAPI) => {
    const state:any = thunkAPI.getState();
    const account =state.ClientInfos.client_informations.accountInfo.accountId;
    const token = state.MainSlice.Token;

    const v:AddNotification={
      title:"Transfer Fund",
      body:null,
      type:3,
      AccountId:account
  }
    try {
      const response = await axios.put('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/TransactionsHistory/TransferFund/',value,{
      headers: {
          Authorization: `Bearer ${token}`,
        }}
      );

   v.body=`The process of transferring ${value.amount} from ${value.senderAccountId} to ${value.recieverAccountId} ${
        response.data==="Valid Requist"?"went successfully":"failed"} `
   
        await sendclientmessage(v,token);
        thunkAPI.dispatch(fetchClientNotifications(account));
        thunkAPI.dispatch(fetchClientInfo());
      return response.data; 
    } catch (error) {
      v.body=`The process of transferring ${value.amount} from ${value.senderAccountId} to ${value.recieverAccountId} failed `
      await sendclientmessage(v,token);
      thunkAPI.dispatch(fetchClientNotifications(account));
      thunkAPI.dispatch(fetchClientInfo());
      return null; 
    }
   
  }
);



export async function sendclientmessage(v:AddNotification,token:string|null){
 
  try{
  console.log(v);
 const res=await axios.post('https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/Client/AddClientNotification',v,
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



export const UpdateIsNotificationViewed = createAsyncThunk(
  'ClientInfos/UpdateIsNotificationViewed',

  async (ClientxNotificationId:number,thunkAPI) => {
    
    const state:any = thunkAPI.getState();
     const token = state.MainSlice.Token;
    
     console.log("notif");
   let readednotif =state.ClientInfos.NonReadedNotifications;
    if(readednotif){
      readednotif=readednotif.filter((a:any)=>a.id!==ClientxNotificationId);
      thunkAPI.dispatch(SetNonReadedNotifications(readednotif));
      console.log("right track");
      console.log(readednotif);
    }
   
      const res=await axios.put(`https://novaapp1-ctdvfydcdfb8ctcq.spaincentral-01.azurewebsites.net/api/CNotifications/UpdateIsNotificationviewed/${ClientxNotificationId}`,{},
        { headers: {
          Authorization: `Bearer ${token}`,
        }}
       
      );
       console.log(res.status);
  }
);





const initialState: InfosState = {
  client_informations: null,
  ClientNotifications:null,
  TransactionsHistory:null,
  ResentTransactions:null,
  NonReadedNotifications:null,
  IsLoggedIn:null,
  hasFetched:false,
  Account: null,
};


const usersSlice = createSlice({
  name: 'ClientInfos',
  initialState,
  reducers: {
    SetIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.IsLoggedIn = action.payload;
    },
    SetAccount: (state, action: PayloadAction<string>) => {
      state.Account = action.payload;
    },
    SetResentTransactions: (state, action: PayloadAction<ITransactionsHistory[]|null>) => {
      state.ResentTransactions = action.payload;
    },
    SetNonReadedNotifications: (state, action: PayloadAction<IClientNotificationsGet|null>) => {
      state.NonReadedNotifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClientInfo.fulfilled, (state, action: PayloadAction<ClientInfo | null>) => {
      state.client_informations = action.payload; 
   
      state.hasFetched = true;
    })
   .addCase(fetchClientInfo.rejected, (state) => {
      state.client_informations = null; 
    })
    .addCase(fetchClientNotifications.fulfilled, (state, action: PayloadAction<IClientNotificationsGet | null>) => {
      state.ClientNotifications = action.payload;
     
    })
    .addCase(fetchClientNotifications.rejected, (state) => {
      state.ClientNotifications = null;
     
    })
    .addCase(fetchClientTransactionhistory.fulfilled, (state, action: PayloadAction<ITransactionsHistory[] | null>) => {
      state.TransactionsHistory = action.payload?.length===0?null:action.payload;
     
    })
    .addCase(fetchClientTransactionhistory.rejected, (state) => {
      state.TransactionsHistory = null;
     
    });
  },

  
  

});


export const { SetIsLoggedIn, SetAccount,SetResentTransactions,SetNonReadedNotifications } = usersSlice.actions;

export default usersSlice.reducer;
