import { createSlice } from '@reduxjs/toolkit';

type Sublist = {
  name: string;
  link: string;
};

type NavItem = {
  icon: string; 
  name: string;
  onelinke: string | null;
  sublist: Sublist[] | null;
};

interface LeftNavState {
  NavItems: NavItem[];
  SetMainScreen: string;
}

const initialState: LeftNavState = {
  NavItems: [
    { icon: 'Home', name: 'Dashboard', onelinke: '/EDashboard', sublist: null },
    { icon: 'User', name: 'Account', onelinke: '/EmployeeProfileCard', sublist: null },
 
    {
      icon: 'Users', name: 'Clients',onelinke: null,
      sublist: [
        { name: 'Add Client', link: '/AddClient' },
        { name: 'Manage Clients', link: '/GetAllClients' },
        { name: 'Add New Account', link: '/Manage-Clients' }
      ]
    },
    {
      icon: 'BadgeCheck', name: 'Employees',onelinke: null,
      sublist: [
        { name: 'Add Employee', link: '/AddNewEmployee' },
        { name: 'Manage Employees', link: '/ManageEmployees' }
       
      ]
    },


    // { icon: 'Users', name: 'Staff', onelinke: '/Account', sublist: null }
    { icon: 'History', name: 'Finances',onelinke: null,sublist: [
          { name: 'Deposit', link: '/Deposit' },
          { name: 'Withdraw', link: '/Withdraw' },
        ]
      },

     { icon: 'Send', name: 'Transactions',onelinke: null,sublist: [
         { name: 'Deposit WithDraw History', link: '/DepositWithDrawHistory' },
         { name: 'Transfers History', link: '/TransfersHistory' },
        ]
      },
  
  
   
  ],
  SetMainScreen: 'DashBoard'
};

const ELeftNavSlice = createSlice({
  name: 'ELeftNav',
  initialState,
  reducers: {
    GetLeftNav: () => initialState
  }
});

export const ELeftNavActions = ELeftNavSlice.actions;
export default ELeftNavSlice.reducer;
