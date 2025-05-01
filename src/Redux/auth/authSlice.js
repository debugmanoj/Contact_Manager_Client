import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    userName:null,
    email:null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setCredentials: (state, action) => {
        const {userName,email,userId}=action.payload
        state.userId = userId;
        state.userName = userName;
        state.email = email;
      },
      logout: (state) => {
        state.userId = null;
        state.userName = null;
        state.email = null;
      },
    },
  });
  
  export const { setCredentials, logout } = authSlice.actions;
  
  export default authSlice.reducer;