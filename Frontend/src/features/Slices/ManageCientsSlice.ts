import { createSlice} from '@reduxjs/toolkit';

interface CounterState {
  show_Add_Person_Form:boolean;
}

const initialState: CounterState = {
    show_Add_Person_Form:false
};

const counterSlice = createSlice({
  name: 'ManageClients',
  initialState,
  reducers: {
    
   setAddPerson_FormState:(state)=>{
    state.show_Add_Person_Form=!state.show_Add_Person_Form
   }
  },
});

export const {  setAddPerson_FormState } = counterSlice.actions;
export default counterSlice.reducer;
