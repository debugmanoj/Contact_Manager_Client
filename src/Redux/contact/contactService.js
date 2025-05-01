import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import contactsRepository from "../../API-Repository/Contacts/contactsRepositoryApi"
import { showLoader,hideLoader } from "../Loader/loaderSlice";

export const createContactApi = createAsyncThunk(
    "contacts/create",
    async ({ data, userId }, { dispatch,rejectWithValue }) => { // Destructure here
      try {
        dispatch(showLoader())
        const response = await contactsRepository.addContactDataApi(data, userId);
        return response.data; // Return the actual data to update the state
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }finally{
        dispatch(hideLoader())
      }
    }
  );

  export const getUserContactsApi = createAsyncThunk(
    "contacts/getUserContacts",
    async (userId, { dispatch,rejectWithValue }) => {
      try {
        dispatch(showLoader());
        const response = await contactsRepository.getContactCreatedApi(userId);
        return response?.data; // Return only contacts array
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
      finally {
        dispatch(hideLoader());
      }
    }
  );

  export const deleteContactApi = createAsyncThunk(
  "contacts/delete",
  async ({ contactId, userId }, {dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
       await contactsRepository.deleteContactDataApi(contactId, userId);
      return { contactId }; // Return contactId to remove from state
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
    finally {
      dispatch(hideLoader());
    }
  }
);
  

export const editContactApi = createAsyncThunk(
  "contacts/edit",
  async ({ contactId, data, userId }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      const response = await contactsRepository.editContactDataApi(contactId, data, userId);
      return response.data; // Return the updated contact data
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(hideLoader());
    }
  }
);

  