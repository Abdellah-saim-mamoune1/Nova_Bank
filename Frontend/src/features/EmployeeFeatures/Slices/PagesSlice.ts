import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDashboardStats } from '../Others/Interfaces';
import { fetchDashboardStats } from '../Others/APIs';
import { fetchRecentTransactionsXtransfers } from '../Others/APIs';
import { IDGetRecentTransactions } from '../Others/Interfaces';
import { fetchClientsInfos } from '../Others/APIs';
import { IGetAllClients } from '../Others/Interfaces';
import { TransferFundHistory } from '../Others/Interfaces';
import { TransactionHistory } from '../Others/Interfaces';
import { FetchEmployeeInfos } from '../Others/APIs';
import { FetchEmployeeNotifications } from '../Others/APIs';
import { IEmployee } from '../Others/Interfaces';
import { FetchAllEmployeesInfos } from '../Others/APIs';
import { IClientNotificationsGet } from '../../Others/ClientInterfaces';
interface MainPagesInfos {
    EmployeeInfos:IEmployee|null;
    EmployeesInfos:IEmployee[]|null;
    ManagedEmployeeInfos:IEmployee|null;
    ENotifications:IClientNotificationsGet|null;
    NonReadedNotifications:IClientNotificationsGet|null;
    GetDashboardStats: IDashboardStats|null;
    DGetRecentTransactions:IDGetRecentTransactions|null;
    GetAllClientsInfos:IGetAllClients[]|null;
    ManagedClientsInfos:IGetAllClients|null;
    clienttransactionshistory:TransactionHistory[]|null;
    clienttransfershistory: TransferFundHistory[]|null;
}

export interface freeze{
  accountid:string,
  thestate:boolean
}
const initialState: MainPagesInfos = {
    EmployeeInfos:null,
    EmployeesInfos:null,
    ManagedEmployeeInfos:null,
    ENotifications:null,
    NonReadedNotifications:null,
    GetDashboardStats:null,
    DGetRecentTransactions:null,
    GetAllClientsInfos:null,
    ManagedClientsInfos:null,
    clienttransactionshistory:null,
    clienttransfershistory:null
};

const EPagesSlice = createSlice({
  name: 'EPages',
  initialState,
  reducers: {
 setManagedClientsInfos:(state,actions:PayloadAction<IGetAllClients|null>)=>{
state.ManagedClientsInfos=actions.payload;
 },
 
 setClientAccountState:(state,actions:PayloadAction<freeze>)=>{
  const info=actions.payload;
      state.ManagedClientsInfos?.bankEmails.map(p=>{
        if(p.accountId===info.accountid){
          p.isFrozen=info.thestate;
        return;}
      })
 },
  SetNonReadedNotifications: (state, action: PayloadAction<IClientNotificationsGet|null>) => {
      state.NonReadedNotifications = action.payload;
    },

 setaccounttransactionshistory:(state,actions:PayloadAction<string[]>)=>{
  if(state.DGetRecentTransactions){
    const r=actions.payload;
state.clienttransactionshistory=state.DGetRecentTransactions.transactionsHistory.filter(p=>r.includes(p.accountId));
  }
 },
 
 setclienttransfershistory:(state,actions:PayloadAction<string[]>)=>{
  if(state.DGetRecentTransactions){
    const r=actions.payload;
state.clienttransfershistory=state.DGetRecentTransactions.transferFundHistory.filter(p=>r.includes(p.senderAccount));
  }
 },
 setManagedEmployeeInfos:(state,actions:PayloadAction<IEmployee|null>)=>{
state.ManagedEmployeeInfos=actions.payload;
 },
 setEmployeeAccountState:(state,actions:PayloadAction<boolean>)=>{
  if(state.ManagedEmployeeInfos)
  state.ManagedEmployeeInfos.accountInfo.isFrozen=actions.payload;
        
      },
 
 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<IDashboardStats | null>) => {
      state.GetDashboardStats = action.payload; 
    })
   .addCase(fetchDashboardStats.rejected, (state) => {
      state.GetDashboardStats = null; 
    })
    .addCase( FetchEmployeeInfos.fulfilled, (state, action: PayloadAction<IEmployee| null>) => {
      state.EmployeeInfos = action.payload; 
    })
   .addCase( FetchEmployeeInfos.rejected, (state) => {
      state.EmployeeInfos = null; 
    })
     .addCase( FetchAllEmployeesInfos.fulfilled, (state, action: PayloadAction<IEmployee[]| null>) => {
      state.EmployeesInfos = action.payload; 
    })
   .addCase( FetchAllEmployeesInfos.rejected, (state) => {
      state.EmployeesInfos = null; 
    })
    .addCase(  FetchEmployeeNotifications.fulfilled, (state, action: PayloadAction<IClientNotificationsGet | null>) => {
      state.ENotifications = action.payload; 
    })
   .addCase(  FetchEmployeeNotifications.rejected, (state) => {
      state.ENotifications = null; 
    })
   .addCase(fetchRecentTransactionsXtransfers.fulfilled, (state, action: PayloadAction<IDGetRecentTransactions| null>) => {
      state.DGetRecentTransactions = action.payload; 
    })
   .addCase(fetchRecentTransactionsXtransfers.rejected, (state) => {
      state.DGetRecentTransactions = null; 
    })
    .addCase(fetchClientsInfos.fulfilled, (state, action: PayloadAction<IGetAllClients[]| null>) => {
      state.GetAllClientsInfos = action.payload; 
    })
   .addCase(fetchClientsInfos.rejected, (state) => {
      state.GetAllClientsInfos = null; 
    })
}});

export const {setclienttransfershistory,
  SetNonReadedNotifications,setaccounttransactionshistory,setClientAccountState,
  setManagedClientsInfos,setManagedEmployeeInfos,setEmployeeAccountState} = EPagesSlice.actions;

export default EPagesSlice.reducer;
