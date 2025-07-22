import { createSlice } from '@reduxjs/toolkit';

type Sublist = {
  name: string;
  link: string;
};

type NavItem = {
  icon: string; // Use string instead of LucideIcon
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
    { icon: 'Home', name: 'Dashboard', onelinke: '/dashboard', sublist: null },
    {
      icon: 'Users',
      name: 'Accounts',
      onelinke: null,
      sublist: [
        { name: 'Current Account', link: '/Account' },
        { name: 'All Accounts', link: '/ProfileCards' },
     
      ]
    },
    { icon: 'History', name: 'Transaction history', onelinke: '/TransactionHistory', sublist: null },
    { icon: 'ReceiptText', name: 'Transfer Fund', onelinke: '/transferFund', sublist: null },
    { icon: 'HelpCircle', name: 'Get Help', onelinke: '/GetHelp', sublist: null }
  ],
  SetMainScreen: 'DashBoard'
};

const LeftNavSlice = createSlice({
  name: 'LeftNav',
  initialState,
  reducers: {
    GetLeftNav: () => initialState
  }
});

export const LeftNavActions = LeftNavSlice.actions;
export default LeftNavSlice.reducer;
