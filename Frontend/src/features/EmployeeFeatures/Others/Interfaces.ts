export interface IDashboardStats {
    totalClients: number;
    totalStaff: number;
    newClients: number;
    totalWithdrawls: number;
    totalDeposits: number;
    totalTransfers: number;
  }


export interface returnto{
onreturn:()=>void
}

  interface Person {
    firstName: string;
    lastName: string;
    birthDate:string;
    email: string;
    address: string;
    phoneNumber: string;
  }
  
  interface Account {
    passWord: string;
    balance: number|string;
  }
  
export interface ISendEmloyeeMessage{

   senderAccount:string,
   title: string,
   body: string,
   type: number,
   accountId: string

}
  
export interface IAddNewEmployee{
  person: Person;
  employee:{salary:number|string,typeId:number};
  employeeAccount: {account: string,password: string}
}

  export interface IClient {
    person: Person;
    account: Account;
  }

interface EmployeeAccount{

 accountId: string,
    salary: Number,
    isFrozen:boolean,
    createdAt:Date

}


export interface IAddNewAccount {
  currentAccount: string,
  passWord: string,
  initialBalance: number
}

  export interface IEmployee{
     firstName: string;
    lastName: string;
    birthDate:string;
    personalEmail: string;
    address: string;
    phoneNumber: string;
    type:string;
    roleType:string,
    isActive:boolean,
    accountInfo:EmployeeAccount
  }

  export interface IGetAllClients{
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date; // ISO date string like "2025-05-09"
    personalEmail: string;
    address: string;
    phoneNumber: string;
    roleType: string;
    bankEmails: BankEmail[];
    cards: Card[];
    isActive: boolean;
  }
 
  
  export interface BankEmail {
    accountId: string;
    balance: number;
    isFrozen: boolean;
    createdAt: Date; // ISO date string
  }
  
  export interface Card {
    cardNumber: string;
    expirationDate: string;
  }
  

  export interface TransactionHistory {
    accountId: string;
    clientFullName: string;
    type: string;
    amount: number;
    transactionDate: Date; // أو Date إذا كنت ستحوله إلى كائن تاريخ
  }
  
  export interface TransferFundHistory {
    senderAccount: string;
    recieverAccount: string;
    amount: number;
    date: Date; // أو Date كذلك
  }
  export interface IDGetRecentTransactions {
    transactionsHistory: TransactionHistory[];
    transferFundHistory: TransferFundHistory[];
  }
  
  


  