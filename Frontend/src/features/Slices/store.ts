import { configureStore } from '@reduxjs/toolkit';
import ClientInfosReducer from './Client_Infos_Slice';
import LeftNavReducer from './LeftNavSlice';
import TopNavReducer from './TopNavSlice';
import ManageClientsReducer from './ManageCientsSlice';
import  ELeftNavReducer from '../EmployeeFeatures/Slices/ELeftNavSlice'
import EPageSlice from '../EmployeeFeatures/Slices/PagesSlice';
import MainSliceReducer from'../Slices/MainSlice';
const store = configureStore({
  reducer: {
    MainSlice:MainSliceReducer,
    ClientInfos: ClientInfosReducer,
    LeftNav: LeftNavReducer,
    TopNav: TopNavReducer,
    ManageClients: ManageClientsReducer,
     


    ELeftNav: ELeftNavReducer,
    EPages:EPageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;