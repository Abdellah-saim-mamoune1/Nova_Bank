import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LogInState {
 IsLoggedIn:boolean|null;
 Type:string|null;
}

interface infos{
logininfos:LogInState|null,
Token:string|null

}
const initialState: infos= {
logininfos:null,
Token:null
};

const counterSlice = createSlice({
  name: 'MainSlice',
  initialState,
  reducers: {
    
   setLogInState:(state,action: PayloadAction<LogInState>)=>{
    state.logininfos=action.payload;
   
   },

    setToken:(state,action: PayloadAction<string>)=>{
    state.Token=action.payload;
   
   }
  },
});

export const { setLogInState,setToken } = counterSlice.actions;
export default counterSlice.reducer;
