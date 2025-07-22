import { createSlice,  PayloadAction } from '@reduxjs/toolkit';

interface NavTopSettings{

  Left_Nav_State:string;

}

const initialState: NavTopSettings = {
  Left_Nav_State:"open"

};


const usersSlice = createSlice({
  name: 'TopNav',
  initialState,
  reducers: {
    setLeftNav: (state, action: PayloadAction<string>) => {
      state.Left_Nav_State = action.payload;
    },
  },
  
});

export const { setLeftNav} = usersSlice.actions;
export default usersSlice.reducer;
