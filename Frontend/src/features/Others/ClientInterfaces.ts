
export interface BankEmail {
  accountId: string;
  balance: number;
  isFrozen: boolean;
  createdAt:Date
}



export interface BankCard {
  cardNumber:string;
  expirationDate: string;
 
}

export interface AddNotification{
  title: string,
  body:string|null,
  type: number,
  AccountId: string

}

export interface ClientInfo {
  id: number;
  firstName: string;
  lastName: string;
  accountInfo:BankEmail;
  cardInfo:BankCard;
  personalEmail: string;
  birthDate: string; // Could be Date type depending on how you handle it
  address: string;
  phoneNumber: string;
  roleType: string;
  bankEmails: BankEmail[];
  cards:BankCard[];
  isActive: boolean;
}


export interface IClientNotificationsGet{
  id:number,
  notification:string,
  title: string,
  type:string,
  date: Date,
  isviewed: boolean

}

export interface AddGetHelpRequist{
accountId: string,
title: string,
body: string,
type:number,



}

export interface SetNotificationViewed{
  account:string|undefined,
  id:number|null
}

 export interface TransferData {
  senderAccountId: string;
  recieverAccountId: string;
  amount: number|string; // ← يتم تحويله لاحقًا إلى رقم
  description: string;
}

export interface ITransactionsHistory{
  n:number|null
  type:string,
  amount: number,
  date: Date
}


export interface InfosState {
  client_informations: ClientInfo | null;
  ClientNotifications:IClientNotificationsGet | null;
  TransactionsHistory:ITransactionsHistory[] | null;
  ResentTransactions:ITransactionsHistory[] | null;
  NonReadedNotifications:IClientNotificationsGet| null;
  IsLoggedIn: boolean|null;
  hasFetched:boolean;
  Account: string | null;
}
