import { createSlice } from '@reduxjs/toolkit';
import { createContactApi,getUserContactsApi,deleteContactApi,editContactApi} from './contactService';
const initialState = {
    userCreatedContacts: [],
    selectedContact: null,  // Add the selected contact state
    loading:"idle",
    currentRequestId:undefined,
    error:null

  };

  const contactSlice = createSlice({
    name: 'contact',

    initialState,
    reducers: {
      setUserCreatedContact: (state, action) => {

      },
        // Action to set selected contact
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    clearSelectedContact:(state,action)=>{
state.selectedContact=null
    }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createContactApi.pending, (state, action) => {
          if (state.loading === 'idle') {
            state.loading = 'pending';
            state.currentRequestId = action.meta.requestId;
          }
        })
        .addCase(createContactApi.fulfilled, (state, action) => {
          const { requestId } = action.meta;
          if (state.loading === 'pending' && state.currentRequestId === requestId) {
            state.loading = 'idle';
          }
          // Add the created contact to the list of user-created contacts
          state.userCreatedContacts.push(action.payload); // action.payload is the created contact
        })
        .addCase(createContactApi.rejected, (state, action) => {
          const { requestId } = action.meta;
          if (state.loading === 'pending' && state.currentRequestId === requestId) {
            state.loading = 'idle';
          }
          // Handle error in case of failure
          state.error = action.payload; // action.payload contains the error message
        })
        .addCase(getUserContactsApi.pending, (state, action) => {
          state.loading = 'pending';
        })
        .addCase(getUserContactsApi.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.userCreatedContacts = action.payload; // Overwrite with fresh list
        })
        .addCase(getUserContactsApi.rejected, (state, action) => {
          state.loading = 'idle';
          state.error = action.payload;
        })
        .addCase(deleteContactApi.pending, (state) => {
          state.loading = 'pending';
        })
        .addCase(deleteContactApi.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.userCreatedContacts = state.userCreatedContacts.filter(
            (contact) => contact._id !== action.payload.contactId
          );
        })
        .addCase(deleteContactApi.rejected, (state, action) => {
          state.loading = 'idle';
          state.error = action.payload;
        })
        .addCase(editContactApi.pending, (state, action) => {
          state.loading = 'pending';
        })
        .addCase(editContactApi.fulfilled, (state, action) => {
          const updatedContact = action.payload;
          state.loading = 'idle';
          // Update the contact in the state
          const index = state.userCreatedContacts.findIndex(contact => contact?._id === updatedContact?._id);

          if (index !== -1) {
            state.userCreatedContacts[index] = updatedContact; // Replace the old contact with the updated one
          }
        })
        .addCase(editContactApi.rejected, (state, action) => {
          state.loading = 'idle';
          state.error = action.payload;
        });
        
    },
  });
  
  export const { setSelectedContact,clearSelectedContact} = contactSlice.actions;
  
  export default contactSlice.reducer;