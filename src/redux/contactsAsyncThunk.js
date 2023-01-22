import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getContactsApi,
  postContactsApi,
  removeContactsApi,
} from 'services/contactsAPI';

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getContactsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const data = await postContactsApi(contact);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (contact, thunkAPI) => {
      const state = thunkAPI.getState();
      const { contacts } = state;
      const isContactExist = contacts.contacts.find(
        person =>
          person.name === contact.name || person.number === contact.number
      );
      if (isContactExist) {
        alert(`${contact.name} already in you contacts`);
        return false;
      }
    },
  }
);

export const removeContactThunk = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const data = await removeContactsApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
